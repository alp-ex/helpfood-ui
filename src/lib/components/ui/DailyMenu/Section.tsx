import React, { ReactNode, CSSProperties } from 'react'

interface SectionProps {
    rootStyle?: CSSProperties
    children?: ReactNode
}

interface TitleProps {
    label: string
}

const Section = ({ children, rootStyle: customRootStyle }: SectionProps) => {
    return (
        <section
            style={{ display: 'flex', padding: '1em', ...customRootStyle }}
        >
            {children}
        </section>
    )
}

const Title = ({ label }: TitleProps) => {
    return (
        <div
            style={{
                writingMode: 'vertical-lr',
                whiteSpace: 'nowrap',
                alignSelf: 'baseline',
                fontSize: '2em',
                display: 'flex',
            }}
        >
            <h3
                style={{
                    transform: 'rotate(180deg)',
                    marginLeft: '0px',
                    color: 'rgb(255, 255, 255)',
                    textTransform: 'uppercase',
                    WebkitTextStroke: '0.01px red',
                }}
            >
                {label}
            </h3>
        </div>
    )
}

Section.Title = Title

export default Section
