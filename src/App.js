import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import "./App.css";
import Signin from "./components/Signin";
import AuthenticateRoutes from "./components/AuthenticatedRoutes";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { UserContext } from "./components/UserContext";

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
                    <Route
                        path="/signup"
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
