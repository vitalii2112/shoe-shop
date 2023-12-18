import {Route, Routes} from "react-router-dom";
import {lazy, Suspense, useEffect} from "react";
import Header from "@/components/Header";
import Cart from "@/components/Cart";
import {useActions} from "@/hooks/useActions";
import {CartService} from "@/services/cart.service";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AuthRequire from "@/components/AuthRequire";
import AdminRequire from "@/components/AdminRequire";
import Loading from "@/components/Loading";
import {getToken} from "@/services/auth.helper";

const Home = lazy(() => import('@/pages/Home'));
const Orders = lazy(() => import('@/pages/Orders'));
const Products = lazy(() => import('@/pages/Products'));
const Users = lazy(() => import('@/pages/Users'));
const UserPage = lazy(() => import('@/pages/Users/pages/UserPage'));
const Profile = lazy(() => import('@/pages/Profile'));

function App() {
    const {setCart, checkAuth} = useActions()
    useEffect(() => {
        if (getToken())
            checkAuth()
        setCart(CartService.get())
    }, [checkAuth, setCart]);
    return (
        <div className="wrapper">
            <Cart/>
            <Header/>
            <Routes>
                <Route index element={<Suspense fallback={<Loading/>} children={<Home/>}/>}/>
                <Route element={<AuthRequire/>}>
                    <Route path="/orders" element={<Suspense fallback={<Loading/>} children={<Orders/>}/>}/>
                    <Route path="/profile" element={<Suspense fallback={<Loading/>} children={<Profile/>}/>}/>
                    <Route element={<AdminRequire/>}>
                        <Route path="/items" element={<Suspense fallback={<Loading/>} children={<Products/>}/>}/>
                        <Route path="/users">
                            <Route index element={<Suspense fallback={<Loading/>} children={<Users/>}/>}/>
                            <Route path=":id" element={<Suspense fallback={<Loading/>} children={<UserPage/>}/>}/>
                        </Route>
                    </Route>
                </Route>
            </Routes>
            <ToastContainer position="bottom-left" limit={5} newestOnTop/>
        </div>
    );
}

export default App;
