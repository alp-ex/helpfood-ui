import React, { ReactNode, CSSProperties, MouseEvent } from 'react'
import Button from '../Button'
import { EditIcon, SVGIcon } from '@components/icons'

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
    style?: {
        root?: CSSProperties
        submitButton?: CSSProperties
        abortButton?: CSSProperties
        formValidationButtons?: CSSProperties
    }
    label?: {
        abortButton?: string
        submitButton?: string
    }
    children?: ReactNode
    onAbortButtonClick: (event: MouseEvent) => void
    onSubmitButtonClick: (event: MouseEvent) => void
}

interface TitleProps {
    label: string
}

const _Section = ({ children, style: customStyle }: PrivateSectionProps) => {
    return (
        <section style={{ display: 'flex', padding: '1em', ...customStyle }}>
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

            <SVGIcon>
                <EditIcon
                    onClick={(evt: MouseEvent) => {
                        onEditButtonClick(evt)
                    }}
                    style={{
                        width: '1em',
                        height: 'auto',
                        cursor: 'pointer',
                        alignSelf: 'baseline',
                        ...customEditButtonStyle,
                    }}
                />
            </SVGIcon>
        </_Section>
    )
}

const SectionForm = ({
    children,
    onAbortButtonClick,
    onSubmitButtonClick,
    style: {
        root: customRootStyle,
        abortButton: customAbortButtonStyle,
        submitButton: customSubmitButtonStyle,
        formValidationButtons: customFormValidationButtonsStyle,
    } = {},
    label: {
        abortButton: customAbortButtonLabel,
        submitButton: customSubmitButtonLabel,
    } = {},
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

            <div
                style={{ display: 'flex', ...customFormValidationButtonsStyle }}
            >
                <Button
                    style={{ cursor: 'pointer', ...customAbortButtonStyle }}
                    variant="secondary"
                    onClick={onAbortButtonClick}
                >
                    {customAbortButtonLabel || 'Abort'}
                </Button>

                <Button
                    style={{ cursor: 'pointer', ...customSubmitButtonStyle }}
                    variant="primary"
                    onClick={onSubmitButtonClick}
                >
                    {customSubmitButtonLabel || 'Submit'}
                </Button>
            </div>
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
