import { getAuth } from "firebase/auth";

function AuthenticateUser() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
        return user;
    } else {
        return false;
    }
}

export { AuthenticateUser };
