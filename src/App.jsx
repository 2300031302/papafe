import { useState, useContext } from 'react';
import './App.css';
import { UserProvider, UserContext } from './components/UserContext';
import { Link } from 'react-router-dom';

function AuthForm() {
  const { setUser } = useContext(UserContext);
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: '', username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      let res;
      if (isLogin) {
        // Login: JSON
        res = await fetch('http://127.0.0.1:8000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: form.username,
            password: form.password
          })
        });
      } else {
        // Signup: JSON
        res = await fetch('http://127.0.0.1:8000/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: form.email,
            username: form.username,
            password: form.password
          })
        });
      }
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || 'Error');
      }
      setUser({ username: form.username });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      {!isLogin && (
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
      )}
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      <div>
        <button type="button" onClick={() => setIsLogin(!isLogin)} style={{marginTop:8}}>
          {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
        </button>
      </div>
      {error && <div style={{color:'red'}}>{error}</div>}
    </form>
  );
}

function Dashboard() {
  const { user } = useContext(UserContext);
  return (
    <div className="dashboard">
      <h2>Welcome, {user.username}!</h2>
      <a href="http://127.0.0.1:8000/link-google-fit" className="link-fit-btn">
        Link Google Fit
      </a>
    </div>
  );
}

function App() {
  const { user } = useContext(UserContext);
  return (
    <div className="container">
      {user ? <Dashboard /> : <AuthForm />}
    </div>
  );
}

export default function RootApp() {
  return (
    <UserProvider>
      <App />
      <footer style={{marginTop: 32, textAlign: 'center', fontSize: '0.95rem', color: '#888'}}>
        <Link to="/privacy-policy" style={{marginRight: 16}}>Privacy Policy</Link>
        <Link to="/terms-of-service">Terms of Service</Link>
      </footer>
    </UserProvider>
  );
}
