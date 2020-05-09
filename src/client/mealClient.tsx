const BASE_URL = '' // add env config
const Endoints = Object.freeze({
    UPDATE_MEAL: '',
    GET_MEAL: '',
}) // add env config

const mealClient = function mealClient() {
    this.uri = BASE_URL
    this.create = async function create({ path, body }) {
        try {
            const meals = await fetch(`${this.uri}${path}`, {
                method: 'POST',
                body,
            })
            return meals
        } catch (e) {
            return new Error('meals creation failed')
        }
    }
    this.update = async function update({ path, body }) {
        try {
            const meals = await fetch(`${this.uri}${path}`, {
                method: 'PUT',
                body,
            })
            return meals
        } catch (e) {
            return new Error('meals update failed')
        }
    }
    this.read = async function read({ path }) {
        try {
            const meals = await fetch(`${this.uri}${path}`, {
                method: 'GET',
            })
            return meals
        } catch (e) {
            return new Error('meals read failed')
        }
    }
    this.remove = async function remove({ path, body }) {
        try {
            const meals = await fetch(`${this.uri}${path}`, {
                method: 'DELETE',
                body,
            })
            return meals
        } catch (e) {
            return new Error('meals deletion failed')
        }
    }
}

mealClient.prototype.updateMeals = function updateMeals({ meals }) {
    this.update({ path: Endoints.UPDATE_MEAL, body: meals })
}

mealClient.prototype.getMeals = function getMeals({ filters, sortings }) {
    // its an utils, create this in next commit plz. sic. this kind of comment...
    this.update({
        path: `${Endoints.GET_MEAL}?${Object.entries({
            ...filters,
            ...sortings,
        })
            .map((entry) => entry.join('='))
            .join('&')}`,
    })
}
