import {FC} from 'react';
import styled from "styled-components/native";
import {useTheme} from "@react-navigation/native";
import ArrowSVG from '../assets/svg/arrow.svg'
import {GestureResponderEvent, useWindowDimensions} from "react-native";

type Props = {
    text: string
    withArrow?: 'left' | 'right'
    onPress?: (event?: GestureResponderEvent) => void
    isFull?: boolean
    isHalf?: boolean
    isSmall?: boolean
    disabled?: boolean
    disabledText?: string
    marginBottom?: number
    isInvalid?: boolean
    type?: 'submit' | 'delete' | 'default'
}

const ButtonText = styled.Text`
    font-size: 16px;
    font-weight: 500;
`

const ButtonContainer = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 55px;
    background: #9dd558;
    border-width: 1px;
`

const ButtonArrowLeft = styled(ArrowSVG)`
    transform: rotate(-180deg);
    margin-right: 10px;
`

const ButtonArrowRight = styled(ArrowSVG)`
    margin-left: 10px;
`


const StyledButton: FC<Props> = ({
                                     text,
                                     marginBottom,
                                     type = 'submit',
                                     withArrow,
                                     disabledText,
                                     disabled,
                                     onPress,
                                     isSmall,
                                     isFull,
                                     isHalf,
                                     isInvalid
                                 }) => {
    const {colors} = useTheme()
    const dimensions = useWindowDimensions()
    return (
        <ButtonContainer activeOpacity={0.7} disabled={disabled} style={{
            backgroundColor: disabled ? colors.notification : type === 'submit' ? colors.primary : type === 'delete' ? '#ff3131' : 'transparent',
            height: isSmall ? 'auto' : 55,
            padding: isSmall ? 10 : 0,
            borderRadius: isSmall ? 5 : 15,
            width: isHalf ? dimensions.width / 2 - 20 : isFull ? '100%' : '90%',
            marginBottom: marginBottom,
            borderColor: isInvalid ? '#ff3131' : type === 'default' ? colors.primary : 'transparent'
        }} onPress={onPress}>
            {withArrow == 'left' && <ButtonArrowLeft/>}
            <ButtonText style={{
                color: isInvalid ? '#ff3131' : '#fff'
            }}>{disabled ? disabledText || text : text}</ButtonText>
            {withArrow == 'right' && <ButtonArrowRight/>}
        </ButtonContainer>
    );
};

export default StyledButton;
