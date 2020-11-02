import { ChangeEvent, ReactElement } from 'react'
import {
    FormControl,
    MenuItem,
    Select,
    makeStyles,
    InputBase,
    createStyles,
    TextField,
} from '@material-ui/core'
import { theme } from 'ui-components/themes/main'
import { ButtonIcon, IconWrapper } from 'ui-components/atoms'
import { MdSearch as SearchIcon } from 'react-icons/md'
import { MdClose as CloseIcon } from 'react-icons/md'

interface Props {
    searchText: string
    selectedFilter: string
    filters: ReadonlyArray<string>
    onType: (event: ChangeEvent<HTMLInputElement>) => void
    onSelect: (filter: string) => void
    onSearch: () => void
    onClearSearchText: () => void
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {},
        formControl: {
            padding: '2%',
            fontSize: '1.5em',
            flexDirection: 'row',
            borderColor: theme.palette.primary.main,
            borderWidth: '1px',
            borderStyle: 'solid',
            borderRadius: '9px',
            alignItems: 'center',
        },
        input: {
            color: theme.palette.primary.main,
        },
        textField: {
            borderRightColor: theme.palette.primary.main,
            borderRightWidth: '1px',
            borderRightStyle: 'solid',
        },
        select: {
            color: theme.palette.primary.main,
            marginLeft: '10px',
            '&:focus': {
                background: 'transparent',
            },
        },
        menuItem: {
            '&:focus': {
                background: theme.palette.primary.main,
                color: theme.palette.primary.light,
            },
            color: theme.palette.primary.main,
        },
    })
)

export default function FilterableSearchBar({
    filters,
    selectedFilter,
    searchText,
    onSelect,
    onType,
    onSearch,
    onClearSearchText,
}: Props): ReactElement {
    const classes = useStyles()

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <FormControl classes={{ root: classes.formControl }}>
                <TextField
                    classes={{ root: classes.textField }}
                    InputProps={{
                        disableUnderline: true,
                        className: classes.input,
                        startAdornment: (
                            <ButtonIcon onClick={onSearch}>
                                <IconWrapper colorOption="main">
                                    <SearchIcon />
                                </IconWrapper>
                            </ButtonIcon>
                        ),
                        endAdornment:
                            searchText.length > 0 ? (
                                <ButtonIcon onClick={onClearSearchText}>
                                    <IconWrapper colorOption="main">
                                        <CloseIcon />
                                    </IconWrapper>
                                </ButtonIcon>
                            ) : null,
                    }}
                    value={searchText}
                    onChange={onType}
                />

                <Select
                    classes={{ root: classes.select }}
                    value={selectedFilter}
                    input={<InputBase />}
                    IconComponent={() => null}
                >
                    {filters.map((filter) => (
                        <MenuItem
                            classes={{ root: classes.menuItem }}
                            onClick={() => onSelect(filter)}
                            value={filter}
                            key={filter}
                        >
                            {filter}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </form>
    )
}
