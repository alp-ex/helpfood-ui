import React, { ReactNode } from 'react'
import { useSwipeable } from 'react-swipeable'

type Direction = 'right' | 'left' | 'up' | 'down'

interface DishesItemProps {
    children: ReactNode
    onSwipedLeft: () => void
    onSwipedRight: () => void
    onSwiping: ({ dir: Direction }) => void
}

interface DishesListProps {
    children: ReactNode
}

const DishesList = ({ children }: DishesListProps) => {
    return (
        <ul
            style={{
                display: 'flex',
                flexFlow: 'column wrap',
                width: '100%',
                alignItems: 'center',
                textAlign: 'center',
                padding: '1em',
            }}
        >
            {children}
        </ul>
    )
}

const DishesSwipeableItem = ({
    children,
    onSwipedLeft,
    onSwipedRight,
    onSwiping,
}: DishesItemProps) => {
    const handlers = useSwipeable({
        onSwipedLeft,
        onSwipedRight,
        onSwiping: ({ dir }) => onSwiping({ dir: dir.toLowerCase() }),
        trackMouse: true,
    })
    return <li {...handlers}>{children}</li>
}

DishesList.SwipeableItem = DishesSwipeableItem

export default DishesList
