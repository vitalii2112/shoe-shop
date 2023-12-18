import {FC} from 'react';
import StyledButton from "./StyledButton";
import styled from "styled-components/native";
import {useNavigation, useTheme} from "@react-navigation/native";
import {StackNavigation} from "./Navigation";
import {ImageSourcePropType} from "react-native";

type Props = {
    image: ImageSourcePropType
    title?: string
    subTitle?: string
    buttonText: string
    buttonArrow?: boolean
}

const CartEmptyBlock = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`

const CartImage = styled.Image`
    width: 120px;
    height: 120px;
`

const CartTitle = styled.Text`
    font-size: 24px;
    font-weight: 600;
`

const CartSubTitle = styled.Text`
    opacity: 0.6;
    margin: 16px 0;
    line-height: 20px;
    text-align: center;
`

const CartEmpty: FC<Props> = ({image, buttonArrow, buttonText, title, subTitle}) => {
    const {colors} = useTheme()
    const navigation = useNavigation<StackNavigation>()
    return (
        <CartEmptyBlock>
            <CartImage source={image}/>
            {title && <CartTitle style={{color: colors.text}}>{title}</CartTitle>}
            {subTitle && <CartSubTitle style={{color: colors.text}}>{subTitle}</CartSubTitle>}
            <StyledButton text={buttonText} withArrow={buttonArrow ? 'left' : undefined}
                          onPress={() => navigation.navigate('Home')}/>
        </CartEmptyBlock>
    );
};

export default CartEmpty;
