import React, { ReactNode } from 'react'

interface SectionProps {
    style?: {
        gridArea?: string
        border?: string
        margin?: number | string
        marginLeft?: number | string
        marginTop?: number | string
    }
    children?: ReactNode
    onClick?: () => void
}

interface TitleProps {
    label: string
}

const Section = ({ children, onClick, style: customStyle }: SectionProps) => {
    return (
        <section style={{ display: 'flex', padding: '2%', ...customStyle }}>
            {children}
        </section>
    )
}

const Title = ({ label }: TitleProps) => {
    return (
        <h3
            style={{
                color: 'rgb(255, 255, 255)',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                writingMode: 'vertical-lr',
                transform: 'rotate(180deg)',
                marginLeft: '0px',
                alignSelf: 'baseline',
                fontSize: '2em',
                WebkitTextStroke: '0.01px red',
            }}
        >
            {label}
        </h3>
    )
}

const Dishes = ({ children }) => {
    return (
        <ul
            style={{
                display: 'flex',
                flexFlow: 'column wrap',
                width: '100%',
                alignItems: 'center',
                textAlign: 'center',
            }}
        >
            {children}
        </ul>
    )
}

Section.Title = Title
Section.Dishes = Dishes

export default Section
