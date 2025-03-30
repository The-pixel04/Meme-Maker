import { BrowserRouter as Router, Routes, Route } from "react-router";
import { useState } from "react";
import MemeGenerator from "./components/memeGenerate/MemeGenerator.jsx";
import NavigationMenu from "./components/navigation/Header.jsx";
import MemeDetail from "./components/memeDetails/MemeDetails.jsx";
import HomePage from "./components/homePage/HomePage.jsx";
import MemeEdit from "./components/memeEdit/MemeEdit.jsx";
import Catalog from "./components/catalog/Catalog.jsx";
import Footer from "./components/footer/Footer.jsx";
import Register from "./components/register/Register.jsx";
import Login from "./components/login/Login.jsx";
import Logout from "./components/logout/Logout.jsx";
import AuthGuard from "./guards/AuthGard.jsx";
import GuestGuard from "./guards/GuestGard.jsx";
import Profile from "./components/profile/Profile.jsx";
import { ErrorContext } from "./contexts/ErrorContext.js";
import { UserContext } from "./contexts/UserContext.js";
import ErrorPopup from "./components/errorPoput/ErrorPopup.jsx";
import usePersistedState from "./hooks/usePersistedSate.js";

export default function App() {
    const [authData, setAuthData] = usePersistedState("auth", {});
    const [error, setError] = useState("");
    const [showErrorPopup, setShowErrorPopup] = useState(false);

    const userLoginHandler = (resultData) => {
        setAuthData(resultData);
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
                    <NavigationMenu />
                    <main>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/catalog" element={<Catalog />} />
                            <Route path="/memes/:memeId/details" element={<MemeDetail />} />
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