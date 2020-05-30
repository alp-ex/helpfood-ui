import { BrowserRouter, Link } from 'react-router-dom'
import React, { useState, useCallback } from 'react'
import Router from './Router'
import ToolBar from 'lib/components/ui/ToolBar'
import SelectListView from 'lib/components/ui/SelectListView'
import { getWeekDaysFromNow } from 'lib/utils/Dates'
import Button from 'lib/components/ui/Button'
import { createPortal } from 'react-dom'
import FullScreenDialog from 'lib/components/ui/FullScreenDialog'

const msg = new Map([
    ['settings', 'Settings'],
    ['edit plan', 'Edit plan'],
    ['edit recipes', 'Edit recipes'],
    ['type a dish name', 'Type a dish name'],
    ['save', 'Save'],
    ["don't save", "Don't save"],
])

const App = () => {
    // we might want to add internationalisation this way :
    // const { t } = useContext(useI18nContext)
    // msg.forEach((msgToFormat) => msg.set(msgToFormat, t(msgToFormat)))

    const weekDays = getWeekDaysFromNow()
    const [currentDay, setCurrentDay] = useState(weekDays[0])
    const debounced = React.useRef(true)
    const previousTouchMovePageY = React.useRef(null)
    const [renderDialog, setDialogToDisplay] = useState(null)

    const renderSelectListView = useCallback(
        () => (
            <SelectListView
                style={{
                    option: {
                        flex: '1 1 0%',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    },
                }}
                selectedIndex={currentDay}
                onOptionClick={(_, { optionId }) => setCurrentDay(optionId)}
                options={weekDays.map((weekDay) => ({
                    render: () => <span>{weekDay}</span>,
                    id: weekDay,
                }))}
                onOptionMouseOver={(_, { optionId }) => {
                    setCurrentDay(optionId)
                }}
                onMouseUp={() => setDialogToDisplay(null)}
            />
        ),
        [currentDay]
    )

    const renderCurrentDayButton = () => (
        <Button
            noBorders
            onMouseDown={() => displaySelectListView(true)}
            onTouchStart={() => displaySelectListView(true)}
            onTouchEnd={() => displaySelectListView(false)}
            onTouchMove={(event) => {
                const inch = event.targetTouches[0]

                if (debounced.current) {
                    setTimeout(() => {
                        if (
                            previousTouchMovePageY.current &&
                            previousTouchMovePageY.current > inch.pageY
                        ) {
                            setCurrentDay((prevState) => {
                                const prevDayIndex = weekDays.findIndex(
                                    (weekDay) => weekDay === prevState
                                )
                                return prevDayIndex < weekDays.length - 1
                                    ? weekDays[prevDayIndex + 1]
                                    : prevState
                            })
                        }
                        if (
                            previousTouchMovePageY.current &&
                            previousTouchMovePageY.current < inch.pageY
                        ) {
                            setCurrentDay((prevState) => {
                                const prevDayIndex = weekDays.findIndex(
                                    (weekDay) => weekDay === prevState
                                )

                                return prevDayIndex > 0
                                    ? weekDays[prevDayIndex - 1]
                                    : prevState
                            })
                        }

                        debounced.current = true
                        previousTouchMovePageY.current = inch.pageY
                    }, 300)
                }
                debounced.current = false
            }}
        >
            {currentDay}
        </Button>
    )

    return (
        <BrowserRouter>
            <ToolBar
                style={{
                    root: {
                        top: 0,
                        position: 'fixed',
                        width: '100%',
                        boxSizing: 'border-box',
                    },
                }}
            >
                {renderCurrentDayButton()}

                <Button noBorders>{msg.get('settings')}</Button>
            </ToolBar>

            <Router />

            <ToolBar
                style={{
                    root: {
                        bottom: 0,
                        position: 'fixed',
                        width: '100%',
                        boxSizing: 'border-box',
                    },
                }}
            >
                <Button
                    noBorders
                    onClick={() => {
                        setDialogToDisplay(() => (
                            <>
                                <ToolBar>
                                    {renderCurrentDayButton()}

                                    {msg.get('edit plan')}
                                </ToolBar>

                                <Form>
                                    <SearchInput
                                        placeholder={msg.get(
                                            'type a dish name'
                                        )}
                                        value={dishSearchTerm}
                                        onChange={(event) => {
                                            setDishSearchTerm(
                                                event.target.value
                                            )
                                        }}
                                    />

                                    {dishesFromSearchResult.length > 0 ? (
                                        <MenuList>
                                            {dishesFromSearchResult.map(
                                                ({ name }) => (
                                                    <MenuList.Item
                                                        onClick={() =>
                                                            addDishToPlan({
                                                                id,
                                                            })
                                                        }
                                                    >
                                                        {name}
                                                    </MenuList.Item>
                                                )
                                            )}
                                        </MenuList>
                                    ) : null}

                                    {dishes.map(({ name }) => (
                                        <Chips
                                            onClose={() =>
                                                removeDishFromPlan({
                                                    id,
                                                })
                                            }
                                        >
                                            {name}
                                        </Chips>
                                    ))}

                                    <ToolBar>
                                        <Button
                                            onClick={() => {
                                                setDialogToDisplay(null)
                                            }}
                                        >
                                            {msg.get("don't save")}
                                        </Button>

                                        <Button
                                            onClick={() => {
                                                setDialogToDisplay(null)
                                            }}
                                        >
                                            {msg.get('save')}
                                        </Button>
                                    </ToolBar>
                                </Form>
                            </>
                        ))
                    }}
                >
                    {msg.get('edit plan')}
                </Button>
                <Button
                    noBorders
                    onClick={() => {
                        setDialogToDisplay(() => <AddRecipeForm />)
                    }}
                >
                    {msg.get('edit recipes')}
                </Button>
            </ToolBar>

            {renderDialog
                ? createPortal(
                      () => (
                          <FullScreenDialog>{renderDialog()}</FullScreenDialog>
                      ),
                      document.body
                  )
                : null}
        </BrowserRouter>
    )
}

export default App
