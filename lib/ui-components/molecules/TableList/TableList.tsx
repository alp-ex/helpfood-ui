import {
    createStyles,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@material-ui/core'
import { theme } from '@ui-components/themes/main'
import React, { ReactElement } from 'react'

type Row = {
    labels: { [key: string]: string }
    values: { [key: string]: string }
}

interface Props {
    headers: ReadonlyArray<string>
    rows: ReadonlyArray<Row>
    onItemClick: (values: { [key: string]: string }) => void
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            margin: '5% 0 20% 0',
        },
        body: {},
        header: {
            background: theme.palette.primary.light,
        },
        headerCells: {
            '&:first-child': {
                borderTopLeftRadius: '13px',
                borderBottomLeftRadius: '13px',
            },
            '&:last-child': {
                borderTopRightRadius: '13px',
                borderBottomRightRadius: '13px',
            },
            color: theme.palette.primary.light,
            background: theme.palette.primary.main,
        },
        bodyCells: {
            borderBottomWidth: '1px',
            borderBottomStyle: 'solid',
            borderBottomColor: theme.palette.primary.main,
            background: theme.palette.primary.light,
            color: theme.palette.primary.main,
        },
    })
)

export default function TableList({
    headers,
    rows,
    onItemClick,
}: Props): ReactElement {
    const classes = useStyles()

    return (
        <Table stickyHeader classes={{ root: classes.root }}>
            <TableHead classes={{ root: classes.header }}>
                <TableRow>
                    {headers.map((label) => (
                        <TableCell
                            classes={{
                                root: classes.headerCells,
                            }}
                            key={label}
                            variant="head"
                        >
                            <span>{label}</span>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>

            <TableBody classes={{ root: classes.body }}>
                {rows.map(({ labels, values }) => (
                    <TableRow
                        onClick={() => onItemClick(values)}
                        key={JSON.stringify(labels)}
                    >
                        {Object.values(labels).map((value) => (
                            <TableCell
                                classes={{ root: classes.bodyCells }}
                                variant="body"
                                key={value}
                            >
                                {value}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
