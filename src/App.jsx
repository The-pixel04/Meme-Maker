import { BrowserRouter as Router, Routes, Route } from "react-router";
import MemeGenerator from "./components/memeGenerate/MemeGenerator.jsx";
import NavigationMenu from "./components/navigation/Header.jsx";
import MemeDetail from "./components/memeDetails/MemeDetails.jsx";
import HomePage from "./components/homePage/HomePage.jsx";
import MemeEdit from "./components/memeEdit/MemeEdit.jsx";
import Catalog from "./components/catalog/Catalog.jsx";
import Footer from "./components/footer/Footer.jsx";
import { UserContext } from "../contexts/UserContext.js";
import { useState } from "react";
import Register from "./components/register/register.jsx";
import Login from "./components/login/Login.jsx";
import usePersistedState from "./hooks/usePersistedSate.js";
import Logout from "./components/logout/Logout.jsx";
import GuestGuard from "../guards/GuestGard";
import AuthGuard from "../guards/AuthGard";

export default function App() {
    const [authData, setAuthData] = usePersistedState('auth', {});

    const userLoginHandler = (resultData) => {
        console.log(resultData)
        setAuthData(resultData);
    };

    const userLogoutHandler = () => {
        setAuthData({});
    }
    return (
        <UserContext.Provider value={{ ...authData, userLoginHandler, userLogoutHandler }}>
            <Router>
                <NavigationMenu />
                <main>
                    <Routes>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/catalog' element={<Catalog />} />
                        <Route path='/memes/:memeId/details' element={<MemeDetail />} />
                        <Route element={<AuthGuard />}>
                            <Route path='/create' element={<MemeGenerator />} />
                            <Route path='/memes/:memeId/edit' element={<MemeEdit />} />
                            <Route path='/logout' element={<Logout />} />
                        </Route>
                        <Route element={<GuestGuard />}>
                            <Route path='/register' element={<Register />} />
                            <Route path='/login' element={<Login />} />
                        </Route>
                    </Routes>
                </main>
                <Footer />
            </Router>
        </UserContext.Provider>
    );
}