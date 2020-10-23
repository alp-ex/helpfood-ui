import React, { ReactElement, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Container, Button, Typography } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { theme } from '@ui-components/themes/main'
import { MdClose as CloseIcon } from 'react-icons/md'
import {
    ChipsList,
    FilterableSearchBar,
    TableList,
} from '@ui-components/molecules'

type OptionValue = { [key: string]: string }

interface Props {
    title: string
    options: {
        labels: ReadonlyArray<string>
        values: ReadonlyArray<OptionValue>
    }
    selectedOptions: ReadonlyArray<{
        label: string
        value: OptionValue
    }>
    onGetOptions: ({ q, filter }: { q: string; filter: string }) => void
    onUnSelectOption: (option: OptionValue) => void
    onSelectOption: (option: OptionValue) => void
    onSubmit: () => void
    onClose: () => void
    filters: ReadonlyArray<string>
    defaultFilter?: string
}

const useStyles = makeStyles(() =>
    createStyles({
        title: {
            color: theme.palette.primary.main,
            fontSize: '1em',
        },
        root: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            height: '100%',
            alignItems: 'center',
            position: 'fixed',
            top: '0',
            left: '0',
            background: theme.palette.primary.light,
        },
        rootCloseButton: {
            fontSize: '1em',
            position: 'absolute',
            top: '15px',
            right: '10px',
        },
        rootValidationButton: {
            textTransform: 'capitalize',
        },
    })
)

export default function MultiplesSelectionForm({
    title,
    options,
    selectedOptions,
    filters,
    defaultFilter = '',
    onClose,
    onUnSelectOption,
    onGetOptions,
    onSelectOption,
    onSubmit,
}: Props): ReactElement {
    const classes = useStyles()
    const [searchText, setSearchText] = useState('')
    const [selectedFilter, setSelectedFilter] = useState(defaultFilter)

    useEffect(() => {
        onGetOptions({ q: searchText, filter: selectedFilter })
    }, [searchText, selectedFilter])

    return createPortal(
        <Container classes={{ root: classes.root }}>
            <Typography
                classes={{ root: classes.title }}
                gutterBottom
                variant="h3"
            >
                {title}
            </Typography>

            <ChipsList onClose={onUnSelectOption} items={selectedOptions} />

            <FilterableSearchBar
                searchText={searchText}
                selectedFilter={selectedFilter}
                onType={(event) => {
                    setSearchText(event.target.value)
                }}
                onSelect={(filter) => {
                    setSelectedFilter(filter)
                }}
                filters={filters}
            />

            <TableList
                headers={options.labels}
                rows={options.values}
                onItemClick={onSelectOption}
            />

            <Button
                classes={{ root: classes.rootValidationButton }}
                onClick={() => {
                    onSubmit()
                    onClose()
                }}
            >
                {'Validate'}
            </Button>

            <Button
                classes={{ root: classes.rootCloseButton }}
                onClick={onClose}
            >
                <CloseIcon />
            </Button>
        </Container>,
        document.body
    )
}
