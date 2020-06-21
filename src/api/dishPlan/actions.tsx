import { fetchDishPlan, Path } from './requests'

export function addDishToPlan({ id, day }) {
    return fetchDishPlan({
        method: 'POST',
        action: Path.ADD_DISH,
        data: { id, day },
    })
}

export function removeDishToPlan({ id, day }) {
    return fetchDishPlan({
        method: 'DELETE',
        action: Path.REMOVE_DISH,
        data: { id, day },
    })
}
