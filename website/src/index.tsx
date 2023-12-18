import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@/assets/styles/index.scss';
import {Provider} from "react-redux";
import {store} from "@/store/store";
import {BrowserRouter} from "react-router-dom";
import Loading from "@/components/Loading";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
})

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Suspense fallback={<Loading/>}>
                        <App/>
                    </Suspense>
                </BrowserRouter>
            </QueryClientProvider>
        </Provider>
    </React.StrictMode>
);
