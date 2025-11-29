import { createContext, useContext, useState, useEffect } from 'react';
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    signOut
} from "firebase/auth";
import app from '../components/firebase/firebase.config';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const auth = getAuth(app);

    // Sign up new user using email & password
    const signupWithEmail = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Login existing user using email & password
    const loginWithEmail = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Google login
    const googleLogin = () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    };

    // logout functionalite
const logout = () => {
    return signOut(auth)
}


    // Track auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return unsubscribe;
    }, [auth]);

    const value = {
        user,
        signupWithEmail,
        loginWithEmail,
         googleLogin, 
         logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
