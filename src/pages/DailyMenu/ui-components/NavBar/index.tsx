import React, { ReactElement } from 'react'

interface Props {}

export default function NavBar({}: Props): ReactElement {
    return (
        <ToolBar
            style={{
                root: {
                    top: 0,
                    width: '100%',
                    boxSizing: 'border-box',
                },
            }}
        >
            <WeekDayPicker
                weekDays={weekDays}
                pickDay={(day) =>
                    setCurrentDay({
                        dispatch: calendarDispatch,
                        day,
                    })
                }
                pickedDay={currentDay}
            />

            <Link to={Routes.ACTIONS}>
                <Button noBorders>{msg.get('actions')}</Button>
            </Link>
        </ToolBar>
    )
}
