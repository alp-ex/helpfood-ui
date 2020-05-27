import React, { ReactNode, CSSProperties } from 'react'
// performance issue with this lib https://github.com/FormidableLabs/react-swipeable/issues/167
import { useSwipeable } from 'react-swipeable'

type Direction = 'right' | 'left' | 'up' | 'down'

interface DishesItemProps {
    children: ReactNode
    styles: { root: CSSProperties }
    onSwipedLeft?: () => void
    onSwipedRight?: () => void
    onSwiping?: ({ dir: Direction }) => void
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
    styles: { root: customRootStyle },
}: DishesItemProps) => {
    const handlers = useSwipeable({
        onSwipedLeft,
        onSwipedRight,
        onSwiping: onSwiping
            ? ({ dir, ...rest }) =>
                  onSwiping({ dir: dir.toLowerCase(), ...rest })
            : null,
        trackMouse: true,
        delta: 20,
    })
    return (
        <div style={{ ...customRootStyle }} {...handlers}>
            {children}
        </div>
    )
}

DishesList.SwipeableItem = DishesSwipeableItem

export default DishesList
