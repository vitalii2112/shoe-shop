import {FC, memo} from 'react';
import styled from 'styled-components/native';
import {Text, useWindowDimensions} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {API_URL} from '@env';
import {ICartItem} from '../store/cart/types';
import StyledButton from './StyledButton';

type Props = {
    id?: number;
    name: string;
    img: string;
    price: number;
    quantity?: number;
    description: string;
    buttonText?: string;
    isLastChild?: boolean;
    isLastRow?: boolean;
    cartHandler?: (item: ICartItem) => void;
    disabledText?: string;
};

const CardView = styled.View`
    border-width: 1px;
    border-left-width: 0;
    padding: 10px;
    min-height: 420px;
`;

const CardImage = styled.Image`
    object-fit: contain;
    border-radius: 15px;
`;

const CardTitle = styled.Text`
    font-weight: 600;
    text-align: center;
`;

const CardDescription = styled.Text`
    flex: 1;
`;

const CardPriceTitle = styled.Text`
    margin-top: 10px;
    text-transform: uppercase;
    font-size: 12px;
`;

const CardPrice = styled.Text`
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 10px;
`;

const Card: FC<Props> = ({
                             name,
                             description,
                             img,
                             quantity,
                             id,
                             price,
                             isLastChild,
                             disabledText,
                             isLastRow,
                             cartHandler,
                             buttonText,
                         }) => {
    const dimensions = useWindowDimensions();
    const {colors} = useTheme();
    // console.log(id, name, isLastRow)
    return (
        <CardView testID="card"
            style={{
                maxWidth: dimensions.width / 2,
                borderRightWidth: isLastChild ? 0 : 1,
                borderBottomWidth: isLastRow ? 0 : 1,
            }}>
            <CardImage testID="card-image"
                source={{
                    uri: `${API_URL}${img}`,
                    width: dimensions.width / 2 - 20,
                    height: 250,
                }}
            />
            <CardTitle style={{color: colors.text}} selectable testID="card-title">
                {name.toUpperCase()}
            </CardTitle>
            <CardDescription style={{color: colors.text}} selectable testID="card-desc">
                {description}
            </CardDescription>
            <CardPriceTitle style={{color: colors.text}}>цена:</CardPriceTitle>
            <CardPrice style={{color: colors.text}} testID="card-price">{price} грн.</CardPrice>
            {(cartHandler && id && !quantity && buttonText) ? (
                <StyledButton
                    text={buttonText}
                    isFull
                    isSmall
                    disabled={!!disabledText}
                    disabledText={disabledText ? disabledText : ''}
                    onPress={() =>
                        cartHandler({id, name, description, img, price, quantity: 1})
                    }
                />
            ) : (
                <Text testID="card-quantity">{quantity} шт.</Text>
            )}
        </CardView>
    );
};

export default memo(Card);
