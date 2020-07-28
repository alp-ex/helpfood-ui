export type Dish = {
    id: string
    name: string
    ingredients: Ingredient
    category: Category
}

export type Category = {
    id: string
    name: string
}

export type Ingredient = {
    id: string
    name: string
}
