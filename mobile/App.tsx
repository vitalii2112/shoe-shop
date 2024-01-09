import styled from 'styled-components/native';
import Navigation from "./components/Navigation";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import {Provider} from "react-redux";
import {store} from "./store/store";
import {NavigationContainer, Theme} from "@react-navigation/native";
import {StatusBar, useColorScheme} from "react-native";
import {Colors} from "react-native/Libraries/NewAppScreen";
import React from "react";

const HomeView = styled.SafeAreaView`
    flex: 1;
`

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
})

function App(): JSX.Element {
    const colorScheme = useColorScheme();
    const theme: Theme = {
        dark: colorScheme === 'dark',
        colors: {
            primary: '#9dd558',
            background: colorScheme === "dark" ? Colors.dark : Colors.light,
            border: colorScheme === "dark" ? Colors.white : Colors.black,
            card: colorScheme === "dark" ? Colors.darker : Colors.lighter,
            text: colorScheme === "dark" ? Colors.white : Colors.black,
            notification: colorScheme === "dark" ? Colors.darker : Colors.lighter
        }
    }
    return (
        <QueryClientProvider client={queryClient}>
            <HomeView>
                <Provider store={store}>
                    <NavigationContainer theme={theme}>
                        <Navigation/>
                        <StatusBar backgroundColor={theme.colors.background}
                                   barStyle={theme.dark ? 'light-content' : 'dark-content'}/>
                    </NavigationContainer>
                </Provider>
            </HomeView>
            <Toast topOffset={0}/>
        </QueryClientProvider>
    );
}


export default App;
