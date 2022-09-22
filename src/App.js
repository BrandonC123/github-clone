import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import "./App.css";
import Signin from "./components/Signin";
import AuthenticateRoutes from "./components/AuthenticatedRoutes";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { UserContext } from "./components/UserContext";
import UnAuthenticatedHome from "./components/UnAuthenticatedHome";

function App() {
    const auth = getAuth();
    const [user, setUser] = useState(null);
    const [signedIn, setSignedIn] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        auth.onAuthStateChanged((tempUser) => {
            if (tempUser) {
                setUser(tempUser);
            } else {
                // Set user to null if signout is detected
                setUser(null);
                setSignedIn(false);
            }
            // Allow header to display either signin/signup or user once status
            // is loaded
            setLoading(false);
        });
    });

    return (
        <Router>
            <UserContext.Provider value={user}>
                <Routes>
                    <Route
                        path="/*"
                        element={<AuthenticateRoutes loading={loading} />}
                    />
                    {/* Only load unauthenticated home route when no user is
                    detected and data has finished fetching */}
                    {!user && !loading && (
                        <Route path="/" element={<UnAuthenticatedHome />} />
                    )}
                    <Route
                        path="/signup"
                        element={<Signup signedIn={signedIn} />}
                    />
                    <Route
                        path="/signup/:inputEmail"
                        element={<Signup signedIn={signedIn} />}
                    />
                    <Route
                        path="/signin"
                        element={<Signin signedIn={signedIn} />}
                    />
                </Routes>
            </UserContext.Provider>
        </Router>
    );
}

export default App;
