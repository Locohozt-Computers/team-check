import React, { CSSProperties, FC } from 'react'
import Switch, { ReactSwitchProps } from 'react-switch'
import styled from 'styled-components'

const CustomSwitch: FC<ReactSwitchProps & {style?: CSSProperties, label?: string}> = ({
    onChange,
    checked,
    style,
    label
}) => {
    return (
        <Container style={style}>
            <label htmlFor="">{label}</label>
            <Switch onChange={onChange} checked={checked} />
        </Container>
    )
}

const Container = styled.div`
    label {
        display: block;
        font-size: 13px;
        margin-bottom: 5px;
    }
`;

export default CustomSwitch
