import React, { ChangeEvent, FocusEvent, Fragment } from 'react'
import Form from './node_modules/@ui-components/atoms/Form'
import SearchInput from './node_modules/@ui-components/atoms/SearchInput'
import MenuList from './node_modules/@ui-components/molecules/MenuList'
import Chips from './node_modules/@ui-components/atoms/Chips'
import ToolBar from './node_modules/@ui-components/atoms/ToolBar'
import Button from './node_modules/@ui-components/atoms/Button'
import Label from './node_modules/@ui-components/atoms/Label'

type Dish = {
    id: string
    name: string
    ingredients: Ingredient
    category: Category
}

type Category = {
    id: string
    name: string
}

type Ingredient = {
    id: string
    name: string
}

interface Props {
    labels: {
        onSubmit: string
    }
    onDishSearchTermChange: (event: ChangeEvent<HTMLInputElement>) => void
    shouldDisplaySearchDishMenuList: boolean
    searchDishMenuListOptions: ReadonlyArray<Dish>
    onSearchDishOptionClick: ({
        id: string,
        category: Category,
        ingredients: Ingredient,
    }) => void
    onCloseDishChips: ({ id: string }) => void
    onSearchInputBlur: (event: FocusEvent) => void
    onSearchInputFocus: (event: FocusEvent) => void
    onSubmit: () => void
    plan: ReadonlyArray<{
        dishes: ReadonlyArray<Dish>
        category: Category
        id: string
    }>
}

const EditDishPlanForm = ({
    labels: { onSubmit: onSubmitLabel },
    onDishSearchTermChange,
    shouldDisplaySearchDishMenuList,
    searchDishMenuListOptions,
    onSearchDishOptionClick,
    onCloseDishChips,
    onSubmit,
    plan,
    onSearchInputBlur,
    onSearchInputFocus,
}: Props) => {
    return (
        <Form>
            <SearchInput
                onChange={onDishSearchTermChange}
                onFocus={onSearchInputFocus}
                onBlur={onSearchInputBlur}
            />

            {shouldDisplaySearchDishMenuList ? (
                <MenuList
                    style={{
                        root: {
                            width: 'fit-content',
                            marginTop: '0.7em',
                            zIndex: 700,
                        },
                    }}
                >
                    {searchDishMenuListOptions.map(
                        ({ id, name, ingredients, category }) => (
                            <MenuList.Item
                                key={id}
                                onMouseDown={() => {
                                    onSearchDishOptionClick({
                                        id,
                                        ingredients,
                                        category,
                                    })
                                }}
                            >
                                {name}
                            </MenuList.Item>
                        )
                    )}
                </MenuList>
            ) : null}

            {plan.map(({ dishes, category, id }) => (
                <Fragment key={id}>
                    <Label>{category}</Label>

                    <Chips.List>
                        {dishes.map(({ id, name }) => (
                            <li key={id}>
                                <Chips onClose={() => onCloseDishChips({ id })}>
                                    {name}
                                </Chips>
                            </li>
                        ))}
                    </Chips.List>
                </Fragment>
            ))}

            <ToolBar
                style={{
                    root: {
                        position: 'fixed',
                        bottom: '1em',
                        justifyContent: 'space-around',
                        width: '100%',
                    },
                }}
            >
                <Button
                    style={{
                        root: { position: 'fixed', bottom: '1em' },
                    }}
                    onClick={onSubmit}
                >
                    {onSubmitLabel}
                </Button>
            </ToolBar>
        </Form>
    )
}

export default EditDishPlanForm
