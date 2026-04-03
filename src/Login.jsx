import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../authProvider';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useAuth();

    // Check if the URL contains ?expired=true (set by the axios response interceptor)
    const params = new URLSearchParams(window.location.search);
    const isExpired = params.get('expired') === 'true';

    function handleSubmit(e) {
        e.preventDefault();
        setError(null);

        axiosInstance.post('/api/auth/login', { username, password })
            .then(res => {
                // Expects the backend to return { token: "..." }
                login(res.data.token);
                navigate('/');
            })
            .catch(() => setError('Invalid username or password.'));
    }

    return (
        <div style={{ maxWidth: '360px', margin: '4rem auto' }}>
            <h2>Login</h2>

            {/* Session expired banner — shown when redirected by the interceptor */}
            {isExpired && (
                <p style={{
                    backgroundColor: '#fff3cd',
                    border: '1px solid #ffc107',
                    padding: '0.75rem',
                    borderRadius: '4px',
                    color: '#856404',
                }}>
                    Your session has expired. Please log in again.
                </p>
            )}

            {error && (
                <p style={{ color: 'red' }}>{error}</p>
            )}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label><br />
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                        autoFocus
                    />
                </div>
                <div style={{ marginTop: '0.75rem' }}>
                    <label>Password:</label><br />
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
