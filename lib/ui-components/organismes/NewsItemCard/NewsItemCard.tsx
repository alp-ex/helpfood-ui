import {
    Link,
    Card,
    CardContent,
    Typography,
    makeStyles,
    createStyles,
} from '@material-ui/core'
import React, { ReactElement } from 'react'
import { Group } from 'ui-components/atoms'
import { theme } from 'ui-components/themes/main'

interface Props {
    news: {
        title: string
        description: string
        author: string
        pubDate: string
        link: string
    }
}

const useStyles = makeStyles(() =>
    createStyles({
        root: { margin: '1em 0' },
        title: { color: theme.palette.primary.main, fontSize: '1em' },
        description: { color: theme.palette.primary.main, fontSize: '0.65em' },
        author: { color: theme.palette.primary.main, fontSize: '0.5em' },
        pubDate: { color: theme.palette.primary.main, fontSize: '0.5em' },
    })
)

export default function NewsItemCard({
    news: { title, description, author, pubDate, link },
}: Props): ReactElement {
    const classes = useStyles()

    return (
        <Link classes={{ root: classes.root }} underline="none" href={link}>
            <Card>
                <CardContent>
                    <Typography
                        classes={{ root: classes.title }}
                        gutterBottom
                        variant="h5"
                        component="h2"
                    >
                        {title}
                    </Typography>
                    <Typography
                        classes={{ root: classes.description }}
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        dangerouslySetInnerHTML={{ __html: description }}
                    />
                </CardContent>

                <Group justify="space-between" direction="row">
                    <Typography classes={{ root: classes.pubDate }}>
                        {/* externalize this behavior */}
                        {new Date(pubDate).toLocaleDateString()}
                    </Typography>

                    <Typography classes={{ root: classes.author }}>
                        {author}
                    </Typography>
                </Group>
            </Card>
        </Link>
    )
}
