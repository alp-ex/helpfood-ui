import React, { ChangeEvent, FocusEvent } from 'react'
import Form from '@ui-components/atoms/Form'
import SearchInput from '@ui-components/atoms/SearchInput'
import MenuList from '@ui-components/molecules/MenuList'
import Chips from '@ui-components/atoms/Chips'
import ToolBar from '@ui-components/atoms/ToolBar'
import Button from '@ui-components/atoms/Button'

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
        searchDishPlaceHolder: string
        onSubmit: string
    }
    onDishSearchTermChange: (event: ChangeEvent) => void
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
    dishes: ReadonlyArray<Dish>
}

const EditDishesForm = ({
    labels: {
        searchDishPlaceHolder: customSearchDishPlaceHolder,
        onSubmit: onSubmitLabel,
    },
    onDishSearchTermChange,
    shouldDisplaySearchDishMenuList,
    searchDishMenuListOptions,
    onSearchDishOptionClick,
    onCloseDishChips,
    onSubmit,
    dishes,
    onSearchInputBlur,
    onSearchInputFocus,
}: Props) => {
    return (
        <Form>
            <SearchInput
                placeholder={customSearchDishPlaceHolder}
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
                                onClick={() =>
                                    onSearchDishOptionClick({
                                        id,
                                        ingredients,
                                        category,
                                    })
                                }
                            >
                                {name}
                            </MenuList.Item>
                        )
                    )}
                </MenuList>
            ) : null}

            <Chips.List>
                {dishes.map(({ id, name }) => (
                    <li key={id}>
                        <Chips onClose={() => onCloseDishChips({ id })}>
                            {name}
                        </Chips>
                    </li>
                ))}
            </Chips.List>

            <ToolBar>
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

export default EditDishesForm
