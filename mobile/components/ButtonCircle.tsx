import {FC, ReactNode} from 'react';
import styled from "styled-components/native";
import {Animated, Easing, GestureResponderEvent, Pressable} from "react-native";
import {useTheme} from "@react-navigation/native";
import Color from "../utils/color";

type Props = {
    children: ReactNode
    onPress?: (event?: GestureResponderEvent) => void
    disabled?: boolean
}

const Container = styled(Animated.View)`
    border-radius: 180px;
    align-items: center;
    justify-content: center;
    padding: 10px;
`

const ButtonCircle: FC<Props> = ({children, onPress, disabled}) => {
    const {colors} = useTheme()
    const animatedValue = new Animated.Value(0);

    const color = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [colors.background, Color.convertHexToRGBA(colors.card, 30)]
    });

    const onPressIn = () => {
        if (disabled)
            return
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 250,
            easing: Easing.linear,
            useNativeDriver: true
        }).start();
    }

    const onPressOut = () => {
        if (disabled)
            return
        Animated.timing(animatedValue, {
            toValue: 0,
            duration: 100,
            easing: Easing.linear,
            useNativeDriver: true
        }).start();
    };

    const animatedScaleStyle = {
        backgroundColor: color,
    };

    return (
        <Pressable onPress={onPress}
                   onPressIn={onPressIn}
                   onPressOut={onPressOut}>
            <Container style={animatedScaleStyle}>{children}</Container>
        </Pressable>
    );
};

export default ButtonCircle;
