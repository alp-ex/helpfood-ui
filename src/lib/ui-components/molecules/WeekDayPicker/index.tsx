import Button from '@ui-components/atoms/Button'
import React, { useState, useRef, Dispatch } from 'react'
import { createPortal } from 'react-dom'
import FullScreenDialog from '../FullScreenDialog'
import SelectListView from '../SelectListView'

interface Props {
    pickDay: (pickedDay: string | Dispatch<any>) => void
    pickedDay: string
    weekDays: ReadonlyArray<string>
}

export default function WeekDayPicker({ pickDay, weekDays, pickedDay }: Props) {
    const [shouldRenderDialog, setShouldRenderDialog] = useState(false)
    const previousTouchMovePageY = useRef(null)

    return (
        <>
            <Button
                noBorders
                onMouseDown={() => {
                    setShouldRenderDialog(true)
                }}
                onTouchStart={() => {
                    setShouldRenderDialog(true)
                }}
                onTouchEnd={() => {
                    setShouldRenderDialog(false)
                }}
                onTouchMove={(event) => {
                    const touch = event.targetTouches[0]

                    if (
                        previousTouchMovePageY.current &&
                        previousTouchMovePageY.current > touch.pageY
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
                        previousTouchMovePageY.current < touch.pageY
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

                    previousTouchMovePageY.current = touch.pageY
                }}
            >
                {pickedDay}
            </Button>

            {shouldRenderDialog
                ? createPortal(
                      <FullScreenDialog>
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
                              onOptionClick={(_, { optionId }) => {
                                  pickDay(optionId)
                              }}
                              options={weekDays.map((weekDay) => ({
                                  render: () => <span>{weekDay}</span>,
                                  id: weekDay,
                              }))}
                              onOptionMouseOver={(_, { optionId }) => {
                                  pickDay(optionId)
                              }}
                              onMouseUp={() => setShouldRenderDialog(false)}
                          />
                      </FullScreenDialog>,
                      document.body
                  )
                : null}
        </>
    )
}
