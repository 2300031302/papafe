import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const AuthContext = createContext(null);
const STORAGE_KEY = 'ht_user';
const PW_KEY = 'ht_password';

const TEST_CREDENTIALS = {
    email: 'test@fitness.com',
    password: 'password123',
    name: 'John Doe',
};

function readStoredUser() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

function getPassword() {
    return localStorage.getItem(PW_KEY) || TEST_CREDENTIALS.password;
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(readStoredUser);
    const [isLoading, setIsLoading] = useState(false);

    // Keep localStorage in sync whenever user changes
    useEffect(() => {
        if (user) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        } else {
            localStorage.removeItem(STORAGE_KEY);
        }
    }, [user]);

    const login = useCallback(async (email, password) => {
        setIsLoading(true);
        await new Promise((r) => setTimeout(r, 800));
        setIsLoading(false);

        const storedPw = getPassword();
        if (email === TEST_CREDENTIALS.email && password === storedPw) {
            const userData = { name: TEST_CREDENTIALS.name, email };
            setUser(userData);
            return { success: true };
        }
        return { success: false, error: 'Invalid email or password' };
    }, []);

    const signup = useCallback(async (name, email, password) => {
        setIsLoading(true);
        await new Promise((r) => setTimeout(r, 800));
        setIsLoading(false);

        if (email === TEST_CREDENTIALS.email) {
            return { success: false, error: 'Email already exists' };
        }
        const userData = { name, email };
        setUser(userData);
        localStorage.setItem(PW_KEY, password);
        return { success: true };
    }, []);

    const logout = useCallback(() => {
        setUser(null);
    }, []);

    const changePassword = useCallback((currentPw, newPw) => {
        const storedPw = getPassword();
        if (currentPw !== storedPw) {
            return { success: false, error: 'Current password is incorrect' };
        }
        localStorage.setItem(PW_KEY, newPw);
        return { success: true };
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, changePassword, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
}
