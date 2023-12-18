import {FC, useEffect, useState} from 'react';
import styled from "styled-components/native";
import ButtonCircle from "./ButtonCircle";
import PlusSVG from '../assets/svg/plus.svg'
import MinusSVG from '../assets/svg/minus.svg'
import {useTheme} from "@react-navigation/native";

type Props = {
    initialValue: number
    onChange: (value: number) => void
    maxValue?: number
}

const CounterContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    max-width: 120px;
`

const CounterValue = styled.Text``

const Counter: FC<Props> = ({initialValue, onChange, maxValue = 10}) => {
    const {colors} = useTheme()
    const [value, setValue] = useState(initialValue)

    const increaseValue = () => {
        setValue(prevState => prevState >= maxValue ? maxValue : prevState + 1)
    }

    const decreaseValue = () => {
        setValue(prevState => prevState <= 1 ? 1 : prevState - 1)
    }

    useEffect(() => {
        onChange(value)
    }, [value])

    return (
        <CounterContainer>
            <ButtonCircle disabled={value === 1} onPress={decreaseValue}><MinusSVG
                fill={value === 1 ? '#9B9B9B' : colors.primary}/></ButtonCircle>
            <CounterValue>{value}</CounterValue>
            <ButtonCircle disabled={value === maxValue} onPress={increaseValue}><PlusSVG
                fill={value === maxValue ? '#9B9B9B' : colors.primary}/></ButtonCircle>
        </CounterContainer>
    );
};

export default Counter;
