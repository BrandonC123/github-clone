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
    useEffect(() => {
        auth.onAuthStateChanged((tempUser) => {
            if (tempUser) {
                setUser(tempUser);
            }
        });
    });

    return (
        <Router>
            <UserContext.Provider value={user}>
                <Routes>
                    <Route path="/*" element={<AuthenticateRoutes />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signin" element={<Signin />} />
                </Routes>
            </UserContext.Provider>
        </Router>
    );
}

export default App;
