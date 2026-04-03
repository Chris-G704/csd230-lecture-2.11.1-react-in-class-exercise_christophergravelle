import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

// Safely decode the JWT payload using atob().
// Returns the parsed payload object, or null if decoding fails.
function decodeJwtPayload(token) {
    try {
        // A JWT is three Base64URL-encoded parts separated by dots.
        // We only need the middle part (index 1) — the payload.
        const base64Url = token.split('.')[1];
        if (!base64Url) return null;

        // Base64URL uses '-' and '_' instead of '+' and '/'.
        // Replace them so atob() can parse the string correctly.
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = atob(base64);
        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error('Failed to decode JWT payload:', e);
        return null;
    }
}

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem('token') || null);

    // Decode the payload every time the token changes.
    const payload = token ? decodeJwtPayload(token) : null;

    // Spring Security commonly stores roles as "ROLE_ADMIN".
    // Adjust the role string below if your backend uses a different value.
    const isAdmin = payload?.roles?.includes('ROLE_ADMIN') ?? false;
    const username = payload?.sub ?? null;

    function login(newToken) {
        localStorage.setItem('token', newToken);
        setToken(newToken);
    }

    function logout() {
        localStorage.removeItem('token');
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{ token, username, isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook — use this in any component: const { isAdmin } = useAuth();
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used inside an <AuthProvider>');
    }
    return context;
}
