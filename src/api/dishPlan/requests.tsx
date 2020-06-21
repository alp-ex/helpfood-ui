const dishPlanURI = 'https://www.helpfood-api.com/dish-plan'

export const Path = Object.freeze({
    ADD_DISH: 'add-dish-to-plan',
    REMOVE_DISH: 'remove-dish-from-plan',
})

export async function fetchDishPlan({
    method = 'GET',
    data,
    action,
    contentType = 'application/json',
}) {
    return fetch(`${dishPlanURI}/${action}`, {
        method,
        headers: {
            'Content-Type': contentType,
        },
        body: JSON.stringify(data),
    })
}
