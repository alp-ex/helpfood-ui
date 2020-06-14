import { fetchDishPlan, Actions } from './client'

export function addDishToPlan({ id, day }) {
    return fetchDishPlan({
        method: 'POST',
        action: Actions.ADD_DISH,
        data: { id, day },
    })
}

export function removeDishToPlan({ id, day }) {
    return fetchDishPlan({
        method: 'DELETE',
        action: 'remove-dish-from-plan',
        data: { id, day },
    })
}
