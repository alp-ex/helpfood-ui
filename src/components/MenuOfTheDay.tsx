import React from 'react'

export interface Props {
    // FIXME : we might want a more specific type (sunday | monday | etc)
    currentDay: string
    height: string
}

export interface MenuCardProps {
    height: string
}


const MenuCard = ({ height }: MenuCardProps) => (
    <div style={{
        height: height
    }}>
        <select name="zazou" id="zazou">
            <option value="tarte au poireau" />
            <option value="tartiflette" />
            <option value="poulet au curry" />
        </select>
        <section>
            <h4>clafouti</h4>
            <p>description of the clafouti in few words</p>
        </section>
    </div>
)

const MenuOfTheDay = ({ currentDay, height }: Props) => {
    return (
        <article style={{
            height: height
        }}>
            <MenuCard height="50%"/>
            <MenuCard height="50%"/>
        </article>
    )
}

export default MenuOfTheDay
