import Button from '@ui-components/atoms/Button'
import React, {
    useState,
    useRef,
    useEffect,
    Dispatch,
    useCallback,
} from 'react'
import { createPortal } from 'react-dom'
import FullScreenDialog from '../FullScreenDialog'
import SelectListView from '../SelectListView'

interface Props {
    pickDay: (pickedDay: string | Dispatch<any>) => void
    pickedDay: string
    weekDays: ReadonlyArray<string>
}

export default function WeekDayPicker({ pickDay, weekDays, pickedDay }: Props) {
    const [dialogToRender, setDialogToDisplay] = useState(null)
    const previousTouchMovePageY = useRef(null)
    const renderWeekDaysSelectListView = useCallback(() => {
        console.log(pickedDay, 'rerender here')

        return (
            <SelectListView
                style={{
                    root: {
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                    },
                    option: {
                        flex: '1 1 0%',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    },
                }}
                selectedId={pickedDay}
                onOptionClick={(_, { optionId }) => pickDay(optionId)}
                options={weekDays.map((weekDay) => ({
                    render: () => <span>{weekDay}</span>,
                    id: weekDay,
                }))}
                onOptionMouseOver={(_, { optionId }) => {
                    pickDay(optionId)
                }}
                onMouseUp={() => setDialogToDisplay(null)}
            />
        )
    }, [pickedDay])

    return (
        <>
            <Button
                noBorders
                onMouseDown={() => {
                    setDialogToDisplay(renderWeekDaysSelectListView)
                }}
                onTouchStart={() => {
                    setDialogToDisplay(() => renderWeekDaysSelectListView)
                }}
                onTouchEnd={() => setDialogToDisplay(null)}
                onTouchMove={(event) => {
                    const inch = event.targetTouches[0]

                    if (
                        previousTouchMovePageY.current &&
                        previousTouchMovePageY.current > inch.pageY
                    ) {
                        pickDay((prevState) => {
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
                        pickDay((prevState) => {
                            const prevDayIndex = weekDays.findIndex(
                                (weekDay) => weekDay === prevState
                            )

                            return prevDayIndex > 0
                                ? weekDays[prevDayIndex - 1]
                                : prevState
                        })
                    }

                    previousTouchMovePageY.current = inch.pageY
                }}
            >
                {pickedDay}
            </Button>

            {dialogToRender
                ? createPortal(
                      <FullScreenDialog>{dialogToRender}</FullScreenDialog>,
                      document.body
                  )
                : null}
        </>
    )
}
