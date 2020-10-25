import {
    AngularBackground,
    IconWrapper,
    ButtonIcon,
} from '@ui-components/atoms'
import {
    FullScreenButtonList,
    FullScreenListSelect,
} from '@ui-components/molecules'
import { setCurrentDay, useCalendar } from 'api/providers/Calendar'
import React, { ReactElement, useReducer } from 'react'
import { createPortal } from 'react-dom'
import { MdMenu as MenuIcon } from 'react-icons/md'
import { AddMealForm, RemoveMealForm } from './components'

type State = {
    isFullScreenButtonVisible: boolean
    isAddMealFormVisible: boolean
    isRemoveMealFormVisible: boolean
}

type Action = {
    type: string
}

interface Props {
    labels?: {
        editPlanButton?: string
    }
}

const {
    OPEN_ADD_FORM,
    OPEN_REMOVE_FORM,
    OPEN_BUTTON_LIST,
    CLOSE_BUTTON_LIST,
    CLOSE_ADD_FORM,
    CLOSE_REMOVE_FORM,
} = Object.freeze({
    OPEN_ADD_FORM: 'open add meal form',
    OPEN_REMOVE_FORM: 'open remove meal form',
    OPEN_BUTTON_LIST: 'open button list',
    CLOSE_BUTTON_LIST: 'close button list',
    CLOSE_ADD_FORM: 'close add form',
    CLOSE_REMOVE_FORM: 'close remove form',
})

export default function MealPlanHeader({
    labels: {} = {},
}: Props): ReactElement {
    const {
        state: { weekDays, selectedDay },
        dispatch: calendarDispatch,
    } = useCalendar()
    const [
        {
            isFullScreenButtonVisible,
            isAddMealFormVisible,
            isRemoveMealFormVisible,
        },
        dispatch,
    ] = useReducer(
        (prevState: State, { type }: Action): State => {
            switch (type) {
                case OPEN_ADD_FORM: {
                    return {
                        ...prevState,
                        isFullScreenButtonVisible: false,
                        isAddMealFormVisible: true,
                    }
                }
                case CLOSE_ADD_FORM: {
                    return {
                        ...prevState,
                        isAddMealFormVisible: false,
                    }
                }
                case OPEN_REMOVE_FORM: {
                    return {
                        ...prevState,
                        isFullScreenButtonVisible: false,
                        isRemoveMealFormVisible: true,
                    }
                }
                case CLOSE_REMOVE_FORM: {
                    return {
                        ...prevState,
                        isRemoveMealFormVisible: false,
                    }
                }
                case OPEN_BUTTON_LIST: {
                    return {
                        ...prevState,
                        isFullScreenButtonVisible: true,
                    }
                }
                case CLOSE_BUTTON_LIST: {
                    return {
                        ...prevState,
                        isFullScreenButtonVisible: false,
                    }
                }
                default: {
                    throw new Error(
                        `Unhandled action type: ${type} under MealPlanHeader reducer`
                    )
                }
            }
        },
        {
            isFullScreenButtonVisible: false,
            isAddMealFormVisible: false,
            isRemoveMealFormVisible: false,
        }
    )

    return (
        <>
            <AngularBackground bgcolorOption="light">
                <FullScreenListSelect
                    items={weekDays.map((dayName) => ({
                        label: dayName,
                        value: dayName,
                    }))}
                    onSelect={(day) => {
                        setCurrentDay({
                            dispatch: calendarDispatch,
                            day,
                        })
                    }}
                    selected={{ label: selectedDay, value: selectedDay }}
                />

                <ButtonIcon
                    onClick={() => {
                        dispatch({ type: OPEN_BUTTON_LIST })
                    }}
                >
                    <IconWrapper colorOption="main">
                        <MenuIcon />
                    </IconWrapper>
                </ButtonIcon>

                {isFullScreenButtonVisible ? (
                    <FullScreenButtonList
                        buttons={[
                            {
                                label: 'add',
                                onClick: () => {
                                    dispatch({ type: OPEN_ADD_FORM })
                                },
                            },
                            {
                                label: 'remove',
                                onClick: () => {
                                    dispatch({ type: OPEN_REMOVE_FORM })
                                },
                            },
                            {
                                label: 'clear',
                                onClick: () => {
                                    dispatch({ type: CLOSE_BUTTON_LIST })
                                },
                            },
                        ]}
                        onClose={() => {
                            dispatch({ type: CLOSE_BUTTON_LIST })
                        }}
                    />
                ) : null}
            </AngularBackground>

            {isAddMealFormVisible
                ? createPortal(
                      <AddMealForm
                          onClose={() => {
                              dispatch({ type: CLOSE_ADD_FORM })
                          }}
                      />,
                      document.body
                  )
                : null}

            {/* {isRemoveMealFormVisible
                ? createPortal(
                      <RemoveMealForm
                          onClose={() => {
                              dispatch({ type: CLOSE_REMOVE_FORM })
                          }}
                      />,
                      document.body
                  )
                : null} */}
        </>
    )
}
