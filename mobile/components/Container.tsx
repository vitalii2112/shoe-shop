import {FC, ReactNode} from 'react';
import styled from "styled-components/native";

type Props = {
    children: ReactNode
}

const ContainerView = styled.View`
    //margin-bottom: 74px;
    flex: 1;
`

const Container: FC<Props> = ({children}) => {
    return (
        <ContainerView>
            {children}
        </ContainerView>
    );
};

export default Container;
