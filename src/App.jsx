import { BrowserRouter as Router, Routes, Route } from "react-router";
import { lazy, useState } from "react";
import usePersistedState from "./hooks/usePersistedSate.js";
import { ErrorContext } from "./contexts/ErrorContext.js";
import { UserContext } from "./contexts/UserContext.js";
import AuthGuard from "./guards/AuthGard.jsx";
import GuestGuard from "./guards/GuestGard.jsx";
import ErrorPopup from "./components/errorPopup/ErrorPopup.jsx";
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import Logout from "./components/logout/Logout.jsx";
import AboutUs from "./components/abouUs/AboutUs.jsx";
const HomePage = lazy(() => import("./components/home/HomePage.jsx"));
const Catalog = lazy(() => import('./components/catalog/Catalog.jsx'));
const Register = lazy(() => import("./components/register/Register.jsx"));
const Login = lazy(() => import("./components/login/Login.jsx"));
const MemeGenerator = lazy(() => import("./components/memeGenerate/MemeGenerator.jsx"));
const MemeEdit = lazy(() => import("./components/memeEdit/MemeEdit.jsx"));
const Profile = lazy(() => import("./components/profile/Profile.jsx"));
const MemeDetail = lazy(() => import("./components/memeDetails/MemeDetails.jsx"));

export default function App() {
    const [authData, setAuthData] = usePersistedState("auth", {});
    const [error, setError] = useState("");
    const [showErrorPopup, setShowErrorPopup] = useState(false);

    const userLoginHandler = (resultData) => {
        setAuthData(resultData.sessionToken);
    };

    const userLogoutHandler = () => {
        setAuthData({});
    };

    const errorHandler = (err) => {
        setError(err);
        setShowErrorPopup(true);
    };

    const closeErrorPopup = () => {
        setShowErrorPopup(false);
    };

    return (
        < UserContext.Provider value={{ ...authData, userLoginHandler, userLogoutHandler }}>
            <ErrorContext.Provider value={{ message: error, errorHandler }}>
                {showErrorPopup && <ErrorPopup message={error} onClose={closeErrorPopup} />}
                <Router>
                    <Header />
                    <main>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/catalog" element={<Catalog />} />
                            <Route path="/memes/:memeId/details" element={<MemeDetail />} />
                            <Route path="aboutus" element={<AboutUs />} />
                            <Route element={<AuthGuard />}>
                                <Route path="/create" element={<MemeGenerator />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/memes/:memeId/edit" element={<MemeEdit />} />
                                <Route path="/logout" element={<Logout />} />
                            </Route>
                            <Route element={<GuestGuard />}>
                                <Route path="/register" element={<Register />} />
                                <Route path="/login" element={<Login />} />
                            </Route>
                        </Routes>
                    </main>
                    <Footer />
                </Router>
            </ErrorContext.Provider>
        </UserContext.Provider >
    );
}