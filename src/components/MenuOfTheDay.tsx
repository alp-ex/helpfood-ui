import React from 'react'

export interface Props {
    // FIXME : we might want a more specific type
    currentDay: string
}
const MenuCard = () => (
    <div>
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
const MenuOfTheDay = ({ currentDay }: Props) => {
    return (
        <article
            style={
                {
                    // height: '100%'
                }
            }
        >
            <div
                style={{
                    height: '50%',
                }}
            >
                <MenuCard />
            </div>
            <div
                style={{
                    height: '50%',
                }}
            >
                <MenuCard />
            </div>
        </article>
    )
}

export default MenuOfTheDay
