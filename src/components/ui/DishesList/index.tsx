import React, { ReactNode } from 'react'

interface DishesItemProps {
    children: ReactNode
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

const DishesItem = ({ children }: DishesItemProps) => {
    return <li>{children}</li>
}

DishesList.Item = DishesItem

export default DishesList
