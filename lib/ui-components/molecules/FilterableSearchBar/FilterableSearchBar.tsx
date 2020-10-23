import React, { ChangeEvent, ReactElement } from 'react'
import {
    FormControl,
    MenuItem,
    Input,
    Select,
    makeStyles,
    InputBase,
    createStyles,
    TextField,
} from '@material-ui/core'

interface Props {
    searchText: string
    selectedFilter: string
    filters: ReadonlyArray<string>
    onType: (event: ChangeEvent<HTMLInputElement>) => void
    onSelect: (filter: string) => void
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {},
    })
)

export default function FilterableSearchBar({
    filters,
    selectedFilter,
    searchText,
    onSelect,
    onType,
}: Props): ReactElement {
    const classes = useStyles()

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <FormControl>
                <TextField value={searchText} onChange={onType} />

                <Select value={selectedFilter} input={<InputBase />}>
                    {filters.map((filter) => (
                        <MenuItem
                            onClick={() => onSelect(filter)}
                            value={filter}
                        >
                            {filter}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </form>
    )
}
