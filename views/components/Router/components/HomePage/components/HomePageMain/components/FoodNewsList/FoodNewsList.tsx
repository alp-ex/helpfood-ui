import { getFoodNews, useFoodNews } from '~/client/providers/FoodNews'
import React, { ReactElement, useEffect } from 'react'
import { Group } from '~/ui-components/atoms'
import { NewsItemCard } from '~/ui-components/organismes'

export default function FoodNewsList(): ReactElement {
    const {
        state: { foodNews },
        dispatch: foodNewsDispatch,
    } = useFoodNews()

    useEffect(() => {
        getFoodNews({ dispatch: foodNewsDispatch })
    }, [])

    return (
        <Group>
            {foodNews.map(({ title, link, description, author, pubDate }) => (
                <NewsItemCard
                    key={link}
                    news={{ title, description, author, pubDate, link }}
                />
            ))}
        </Group>
    )
}
