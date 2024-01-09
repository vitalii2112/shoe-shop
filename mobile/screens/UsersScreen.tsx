import {FC, memo, useCallback, useState} from 'react';
import {FlatList, Text, View} from "react-native";
import {IUser} from "../models/IUser";
import {UserService} from "../services/user.service";
import Toast from "react-native-toast-message";
import useUnauthorizedError from "../hooks/useUnauthorizedError";
import styled from "styled-components/native";
import {useFocusEffect, useTheme} from "@react-navigation/native";
import MailSVG from '../assets/svg/mail.svg'
import ButtonCircle from "../components/ButtonCircle";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../components/Navigation";
import Loading from "../components/Loading";

interface Props extends NativeStackScreenProps<RootStackParamList, 'Users'> {
}

const UserBlock = styled.View`
    margin: 5px 15px;
    padding: 15px;
    border-width: 1px;
    width: 95%;
`

const UsersScreen: FC<Props> = ({navigation}) => {
    const {colors} = useTheme()
    const [users, setUsers] = useState<IUser[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const onAuthError = useUnauthorizedError()

    const loadUsers = useCallback(() => {
        setIsLoading(true)
        UserService.getAll()
            .then(data => setUsers(data.sort((a, b) => a.id - b.id)))
            .catch((err) => {
                const isExpired = onAuthError(err)
                if (!isExpired)
                    Toast.show({
                        type: 'error',
                        text1: 'Ошибка',
                        text2: 'Не удалось загрузить заказы'
                    })
            })
            .finally(() => setIsLoading(false))
    }, [])

    useFocusEffect(loadUsers);

    const renderItem = useCallback(({item: user}: {item: IUser}) => <UserItem user={user} navigation={navigation} colors={colors}/>, [])

    if (isLoading)
        return <Loading/>
    return (
        <View>
            <FlatList data={users} removeClippedSubviews testID="users-screen"
                      refreshing={isLoading} onRefresh={loadUsers}
                      renderItem={renderItem}/>
        </View>
    );
};

type UserItemProps = {
    user: IUser
    colors: { text: string }
}

const UserItem: FC<Omit<Props, 'route'> & UserItemProps> = memo(({navigation, user, colors}) => (
    <ButtonCircle onPress={() => navigation.navigate('User', {userId: user.id})}>
        <UserBlock testID="user-block">
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{color: colors.text}}>{user.id}. {user.first_name} {user.last_name}</Text>
                <Text
                    style={{color: user.role === 'user' ? 'green' : 'red'}}>{user.role.toUpperCase()}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <MailSVG/>
                <Text style={{color: colors.text, marginLeft: 5}}>{user.email}</Text>
            </View>
        </UserBlock>
    </ButtonCircle>
))

export default UsersScreen;
