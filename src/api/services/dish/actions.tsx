import { fetchDishes, Path } from './requests'

export function searchDishesAPI({ q }) {
    return fetchDishes({
        action: Path.SEARCH_DISHES,
        data: { q },
    })
}

export function searchCategoriesAPI({ q }) {
    return fetchDishes({
        action: Path.SEARCH_CATEGORIES,
        data: { q },
    })
}

export function searchIngredientsAPI({ q }) {
    return fetchDishes({
        action: Path.SEARCH_INGREDIENTS,
        data: { q },
    })
}

export function addDishAPI({ name, ingredients, category }) {
    return fetchDishes({
        method: 'POST',
        action: Path.ADD_DISH,
        data: { name, ingredients, category },
    })
}

export function editDishAPI({ id, name, ingredients, category }) {
    return fetchDishes({
        method: 'PUT',
        action: Path.EDIT_DISH,
        data: { id, name, ingredients, category },
    })
}
