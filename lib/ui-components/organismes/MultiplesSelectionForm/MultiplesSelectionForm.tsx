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
import { AngularBackground, FixedActionBar } from '@ui-components/atoms'

type OptionValue = { label: string; value: string }

interface Props {
    title: string
    options: {
        labels: ReadonlyArray<string>
        values: ReadonlyArray<{
            labels: { [key: string]: string }
            values: { [key: string]: string }
        }>
    }
    selectedOptions: ReadonlyArray<{
        label: string
        value: string
    }>
    onGetOptions: ({ q, filter }: { q: string; filter: string }) => void
    onUnSelectOption: (option: OptionValue) => void
    onSelectOption: (option: { [key: string]: string }) => void
    onSubmit: () => void
    onClose: () => void
    filters: ReadonlyArray<string>
    defaultFilter?: string
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            position: 'fixed',
            top: '0',
            left: '0',
            background: theme.palette.primary.light,
            overflow: 'auto',
        },
        title: {
            fontSize: '1em',
            textTransform: 'capitalize',
        },
        rootCloseButton: {
            fontSize: '1em',
            color: theme.palette.primary.main,
        },
        rootValidationButton: {
            fontSize: '1em',
            textTransform: 'capitalize',
            color: theme.palette.primary.main,
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
            <AngularBackground bgcolorOption="light">
                <Typography classes={{ root: classes.title }} variant="h3">
                    {title}
                </Typography>

                <Button
                    classes={{ root: classes.rootCloseButton }}
                    onClick={onClose}
                >
                    <CloseIcon />
                </Button>
            </AngularBackground>

            <ChipsList onClose={onUnSelectOption} items={selectedOptions} />

            <FilterableSearchBar
                searchText={searchText}
                selectedFilter={selectedFilter}
                onType={(event) => {
                    setSearchText(event.target.value)
                }}
                onClearSearchText={() => {
                    setSearchText('')
                }}
                onSelect={(filter) => {
                    setSelectedFilter(filter)
                }}
                filters={filters}
                onSearch={() =>
                    onGetOptions({ q: searchText, filter: selectedFilter })
                }
            />

            <TableList
                headers={options.labels}
                rows={options.values}
                onItemClick={onSelectOption}
            />

            <FixedActionBar
                location="bottom"
                bgcolorOption="light"
                label={'done'}
                action={() => {
                    onSubmit()
                    onClose()
                }}
            />
        </Container>,
        document.body
    )
}
