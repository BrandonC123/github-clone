import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import "./App.css";
import Signin from "./components/Signin";
import AuthenticateRoutes from "./components/AuthenticatedRoutes";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/*" element={<AuthenticateRoutes />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
            </Routes>
        </Router>
    );
}

export default App;
