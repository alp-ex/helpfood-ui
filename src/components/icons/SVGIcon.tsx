import React, { ReactNode, MouseEvent, CSSProperties } from 'react'

interface Props {
    children: ReactNode
    onClick?: (evt: MouseEvent) => void
    style?: CSSProperties
}

const SVGIcon = ({ onClick, children, style }: Props) => {
    return (
        <div onClick={onClick} style={style}>
            {children}
        </div>
    )
}

export default SVGIcon
