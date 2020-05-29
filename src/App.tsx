import { BrowserRouter } from 'react-router-dom'
import React, { useState } from 'react'
import Router from './Router'
import ToolBar from 'lib/components/ui/ToolBar'
import SelectListView from 'lib/components/ui/SelectListView'
import { getWeekDaysFromNow } from 'lib/utils/Dates'
import Button from 'lib/components/ui/Button'

const msg = new Map([['settings', 'Settings']])

const App = () => {
    // how we might want to add internationalisation :
    // const { t } = useContext(useI18nContext)
    // msg.forEach((msgToFormat) => msg.set(msgToFormat, t(msgToFormat)))

    const weekDays = getWeekDaysFromNow()
    const [currentDay, setCurrentDay] = useState(weekDays[0])
    const [selectListViewIsDisplayed, displaySelectListView] = React.useState(
        false
    )
    const debounced = React.useRef(true)
    const previousTouchMovePageY = React.useRef(null)

    return (
        <BrowserRouter>
            <ToolBar component="nav">
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
                                        return prevDayIndex <
                                            weekDays.length - 1
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

                {selectListViewIsDisplayed ? (
                    <SelectListView
                        style={{
                            root: {
                                position: 'fixed',
                                top: '0px',
                                left: '0px',
                                height: '100vh',
                                width: '100vw',
                                margin: 0,
                                background: 'white',
                                zIndex: 1000,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                padding: '0',
                            },
                            option: {
                                flex: '1 1 0%',
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            },
                        }}
                        selectedIndex={currentDay}
                        onOptionClick={(_, { optionId }) =>
                            setCurrentDay(optionId)
                        }
                        options={weekDays.map((weekDay) => ({
                            render: () => <span>{weekDay}</span>,
                            id: weekDay,
                        }))}
                        onOptionMouseOver={(_, { optionId }) => {
                            setCurrentDay(optionId)
                        }}
                        onMouseUp={() => displaySelectListView(false)}
                    />
                ) : null}

                <Button noBorders>{msg.get('settings')}</Button>
            </ToolBar>
            <Router />
        </BrowserRouter>
    )
}

export default App
