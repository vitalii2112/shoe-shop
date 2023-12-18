import styled from 'styled-components/native';
import Navigation from "./components/Navigation";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import {Provider} from "react-redux";
import {store} from "./store/store";

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
    return (
        <QueryClientProvider client={queryClient}>
            <HomeView>
                <Provider store={store}>
                    <Navigation/>
                </Provider>
            </HomeView>
            <Toast topOffset={0}/>
        </QueryClientProvider>
    );
}


export default App;
