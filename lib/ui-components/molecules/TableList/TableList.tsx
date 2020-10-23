import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@material-ui/core'
import React, { ReactElement } from 'react'

type Row = { [key: string]: string }

interface Props {
    headers: ReadonlyArray<string>
    rows: ReadonlyArray<Row>
    onItemClick: (item: Row) => void
}

export default function TableList({
    headers,
    rows,
    onItemClick,
}: Props): ReactElement {
    return (
        <Table stickyHeader>
            <TableHead>
                <TableRow>
                    {headers.map((label) => (
                        <TableCell key={label} variant="head">
                            <span>{label}</span>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>

            <TableBody>
                {rows.map((row) => (
                    <TableRow onClick={() => onItemClick(row)}>
                        {Object.values(row).map((value) => (
                            <TableCell variant="body">{value}</TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
