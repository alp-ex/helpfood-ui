const dishesURI = 'https://www.helpfood-api.com/dishes'

export const Path = Object.freeze({
    ADD_DISH: 'add-dish',
    EDIT_DISH: 'edit-dish',
    GET_DISHES: 'get-dishes',
    GET_CATEGORIES: 'get-categories',
    GET_INGREDIENTS: 'get-ingredients',
})

export async function fetchDishes({
    method = 'GET',
    data,
    action,
    contentType = 'application/json',
}) {
    return fetch(`${dishesURI}/${action}`, {
        method,
        headers: {
            'Content-Type': contentType,
        },
        body: JSON.stringify(data),
    })
}
