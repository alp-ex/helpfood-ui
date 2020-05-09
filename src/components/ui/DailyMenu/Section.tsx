import React, { ReactNode, CSSProperties, MouseEvent, useState } from 'react'
import EditIcon from '@assets/editIcon.svg'

interface PrivateSectionProps {
    style?: CSSProperties
    children?: ReactNode
}

interface SectionProps {
    rootStyle?: CSSProperties
    editButtonStyle?: CSSProperties
    children?: ReactNode
    onEditButtonClick: (event: MouseEvent) => void
}

interface SectionFormProps {
    rootStyle?: CSSProperties
    submitButtonStyle?: CSSProperties
    abortButtonStyle?: CSSProperties
    children?: ReactNode
    onAbortButtonClick: (event: MouseEvent) => void
    onSubmitButtonClick: ({ event: MouseEvent, formState: {} }) => void
}

interface TitleProps {
    label: string
}

const _Section = ({ children, style: customStyle }: PrivateSectionProps) => {
    return (
        <section
            style={{ display: 'flex', padding: '1em 0.5em', ...customStyle }}
        >
            {children}
        </section>
    )
}

const Section = ({
    children,
    onEditButtonClick,
    rootStyle: customRootStyle,
    editButtonStyle: customEditButtonStyle,
}: SectionProps) => {
    return (
        <_Section style={customRootStyle}>
            {children}

            <img
                onClick={(evt: MouseEvent) => {
                    onEditButtonClick(evt)
                }}
                src={EditIcon}
                style={{
                    margin: '0.4em',
                    width: '0.7em',
                    cursor: 'pointer',
                    alignSelf: 'baseline',
                    ...customEditButtonStyle,
                }}
            />
        </_Section>
    )
}

const SectionForm = ({
    children,
    rootStyle: customRootStyle,
    onAbortButtonClick,
    onSubmitButtonClick,
    abortButtonStyle: customAbortButtonStyle,
    submitButtonStyle: customSubmitButtonStyle,
}: SectionFormProps) => {
    return (
        <_Section
            style={{
                width: '100%',
                boxSizing: 'border-box',
                position: 'fixed',
                background: '#fff5b2',
                zIndex: 300,
                height: '100vh',
                bottom: '0',
                left: '0',
                ...customRootStyle,
            }}
        >
            {children}
            {/* <FormBoutonsGroup>
                <AbortButton onClick={onAbortButtonClick} />
                <SubmitButton onClick={onSubmitButtonClick} />
            </FormBoutonsGroup> */}
        </_Section>
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
Section.EditForm = SectionForm

export default Section
