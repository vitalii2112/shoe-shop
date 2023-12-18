import {FC} from 'react';
import styled from "styled-components/native";
import {useTheme} from "@react-navigation/native";
import PickerSelect, {Item} from "react-native-picker-select";
import {Text} from "react-native";

type Props = {
    autoComplete?: 'current-password' | 'email' | 'name' | 'name-family' | 'new-password' | 'tel'
    label: string
    placeholder: string
    type: 'text' | 'numeric' | 'search' | 'email' | 'select'
    value: string
    setValue: (str: string) => void
    errorMessage?: string
    options?: Item[]
    required?: boolean
}

const FormBlockContainer = styled.View`
    width: 100%;
    margin-bottom: 20px;

`

const FormLabel = styled.View`
    margin-bottom: 5px;
    flex-direction: row;
`

const FormInput = styled.TextInput`
    border-width: 1px;
    border-radius: 4px;
    padding: 13px 16px;
`

const FormErrorMessage = styled.Text`
    color: #FF3434;
    margin-top: 5px;
`

const FormRequiredText = styled.Text`
    margin-left: 2px;
    color: #FF3434;
`

const FormBlock: FC<Props> = ({value, setValue, placeholder, options, errorMessage, label, autoComplete, type}) => {
    const {colors} = useTheme()
    return (
        <FormBlockContainer>
            <FormLabel>
                <Text style={{color: colors.text}}>{label}</Text>
                <FormRequiredText>*</FormRequiredText>
            </FormLabel>
            {type === 'select'
            ? <PickerSelect style={{
                    viewContainer: {
                        borderWidth: 1,
                        borderRadius: 4,
                        borderColor: errorMessage ? '#FF3434' : '#ACACAC'
                    },
                    placeholder: {
                        color: colors.text
                    }
                }} placeholder={options?.[0] || {label: placeholder}} value={value} items={options?.slice(1) || []} onValueChange={setValue}/>
            : <FormInput autoComplete={autoComplete} style={{color: colors.text, borderColor: errorMessage ? '#FF3434' : '#ACACAC'}}
                         secureTextEntry={autoComplete === 'current-password' || autoComplete === 'new-password'}
                         inputMode={type} placeholder={placeholder} value={value} onChangeText={setValue} defaultValue=""/>}
            {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
        </FormBlockContainer>
    );
};

export default FormBlock;
