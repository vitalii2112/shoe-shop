import {FC} from 'react';
import styled from "styled-components/native";
import {useTheme} from "@react-navigation/native";

type Props = {
    text: string
}

const TitleText = styled.Text`
  font-size: 26px;
  font-weight: 700;
  padding: 0 15px;
  text-align: center;
  margin: 10px 0;
`

const Title: FC<Props> = ({text}) => {
    const {colors} = useTheme()
    return (
        <TitleText style={{color: colors.text}}>{text}</TitleText>
    );
};

export default Title;
