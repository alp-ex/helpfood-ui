import React, { ReactElement } from 'react'

interface Props {}

export default function MealPlan({}: Props): ReactElement {
    return (
        <MealPlanProvider>
            {dishesWeekPlan[currentDay.toLowerCase()].map(
                ({ category, dishes, id }) => (
                    <LabelledList
                        key={id}
                        renderLabel={() => <Label>{category}</Label>}
                        items={dishes.map(
                            ({ id: dishId, ingredients, name }) => ({
                                id: dishId,
                                render: () => (
                                    <LabelledList
                                        renderLabel={() => (
                                            <Label>{name}</Label>
                                        )}
                                        items={ingredients.map(
                                            ({
                                                name: ingredientName,
                                                id: ingredientId,
                                            }) => ({
                                                id: ingredientId,
                                                render: () => (
                                                    <Label>
                                                        {ingredientName}
                                                    </Label>
                                                ),
                                            })
                                        )}
                                    />
                                ),
                            })
                        )}
                    />
                )
            )}
        </MealPlanProvider>
    )
}
