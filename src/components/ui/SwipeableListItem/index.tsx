import React from 'react'
import {
    SwipeableListItem as ReactSwipeableListItem,
    SwipeableList as ReactSwipeableList,
} from '@sandstreamdev/react-swipeable-list'
import '@sandstreamdev/react-swipeable-list/dist/styles.css'

const SwipeableList = ({ children }) => {
    return (
        // no inline style interface from this lib https://github.com/sandstreamdev/react-swipeable-list/blob/master/src/SwipeableList.js
        <ReactSwipeableList style={{ background: 'red' }}>
            {children}
        </ReactSwipeableList>
    )
}

const SwipeableListItem = ({ children, onSwipeRight, onSwipeLeft }) => {
    return (
        <ReactSwipeableListItem
            swipeLeft={{
                content: <div>je vais à gauche</div>,
                action: () => {
                    onSwipeLeft()
                },
            }}
            swipeRight={{
                content: <div>je vais à droite</div>,
                action: () => {
                    onSwipeRight()
                },
            }}
            onSwipeProgress={() => console.log('prout')}
        >
            {children}
        </ReactSwipeableListItem>
    )
}

SwipeableList.Item = SwipeableListItem

export default SwipeableList
