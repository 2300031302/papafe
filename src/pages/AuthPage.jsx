import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Activity, Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import './AuthPage.css';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const { login, signup, isLoading } = useAuth();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        let result;
        if (isLogin) {
            result = await login(form.email, form.password);
        } else {
            if (!form.name.trim()) {
                setError('Name is required');
                return;
            }
            result = await signup(form.name, form.email, form.password);
        }

        if (!result.success) {
            setError(result.error);
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setError('');
        setForm({ name: '', email: '', password: '' });
    };

    return (
        <div className="auth-page">
            <div className="auth-bg-shapes">
                <div className="shape shape-1" />
                <div className="shape shape-2" />
                <div className="shape shape-3" />
            </div>

            <div className="auth-container">
                <div className="auth-brand">
                    <div className="auth-logo">
                        <Activity size={32} />
                    </div>
                    <h1>Health Tracker</h1>
                    <p className="auth-tagline">Your personal fitness companion</p>
                </div>

                <div className="auth-card">
                    <div className="auth-tabs">
                        <button
                            className={`auth-tab ${isLogin ? 'active' : ''}`}
                            onClick={() => { setIsLogin(true); setError(''); }}
                        >
                            Sign In
                        </button>
                        <button
                            className={`auth-tab ${!isLogin ? 'active' : ''}`}
                            onClick={() => { setIsLogin(false); setError(''); }}
                        >
                            Sign Up
                        </button>
                        <div className={`tab-indicator ${isLogin ? 'left' : 'right'}`} />
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        {!isLogin && (
                            <div className="input-group animate-in">
                                <User size={18} className="input-icon" />
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    value={form.name}
                                    onChange={handleChange}
                                    autoComplete="name"
                                />
                            </div>
                        )}

                        <div className="input-group">
                            <Mail size={18} className="input-icon" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={form.email}
                                onChange={handleChange}
                                required
                                autoComplete="email"
                            />
                        </div>

                        <div className="input-group">
                            <Lock size={18} className="input-icon" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Password"
                                value={form.password}
                                onChange={handleChange}
                                required
                                minLength={6}
                                autoComplete={isLogin ? 'current-password' : 'new-password'}
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                tabIndex={-1}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        {error && <div className="auth-error">{error}</div>}

                        <button type="submit" className="auth-submit" disabled={isLoading}>
                            {isLoading ? (
                                <span className="spinner" />
                            ) : isLogin ? (
                                'Sign In'
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    <p className="auth-switch">
                        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                        <button type="button" onClick={toggleMode}>
                            {isLogin ? 'Sign Up' : 'Sign In'}
                        </button>
                    </p>

                    <div className="test-credentials">
                        <p className="test-label">Test Credentials</p>
                        <p>test@fitness.com / password123</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
