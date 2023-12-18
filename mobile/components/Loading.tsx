import {FC} from 'react';
import {ActivityIndicator} from "react-native";
import styled from "styled-components/native";

type Props = {
    overlay?: boolean
    text?: string
}

const LoadingView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    z-index: 1;
`

const LoadingText = styled.Text`
    font-size: 18px;
`

const Loading: FC<Props> = ({overlay, text}) => {
    return (
        <LoadingView style={{
            backgroundColor: overlay ? 'rgba(0, 0, 0, 0.5)' : 'none',
            position: overlay ? 'absolute' : 'relative',
            width: overlay ? '100%' : 'auto',
            height: overlay ? '100%' : 'auto',
            top: overlay ? 0 : 'auto',
        }}>
            <ActivityIndicator color="#9dd558" size="large"/>
            <LoadingText>{text ? text : 'Загрузка...'}</LoadingText>
        </LoadingView>
    );
};

export default Loading;
