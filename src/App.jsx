import { useState, useContext } from 'react';
import './App.css';
import { UserProvider, UserContext } from './components/UserContext';
import { Link } from 'react-router-dom';

function AuthForm({ onClose }) {
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
      if (onClose) onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form" style={{marginTop: 24}}>
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
      <button type="submit" style={{marginTop: 8, width: '100%'}}>{isLogin ? 'Login' : 'Sign Up'}</button>
      <div>
        <button type="button" onClick={() => setIsLogin(!isLogin)} style={{marginTop:8, width: '100%'}}>
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
      <a href="http://127.0.0.1:8000/link-google-fit" className="link-fit-btn" style={{marginTop: 24, display: 'inline-block', padding: '10px 24px', background: '#4285F4', color: '#fff', borderRadius: 6, textDecoration: 'none', fontWeight: 500}}>
        Link Google Fit
      </a>
    </div>
  );
}

function HomePage({ onShowAuth }) {
  return (
    <div className="home-page" style={{textAlign: 'center', marginTop: 48}}>
      <h1 style={{fontSize: '2.2rem', marginBottom: 12, color: '#000'}}>health tracker by Vijayaraju</h1>
      <p style={{fontSize: '1.15rem', color: '#555', maxWidth: 600, margin: '0 auto 24px'}}>
        Welcome to FitTrack, your trusted fitness tracking application hosted at <b>vijayaraju.in</b>.<br /><br />
        <b>App Functionality:</b> FitTrack helps you monitor your daily activity, track your progress, and stay motivated. You can connect your Google Fit account to sync your fitness data and view personalized insights.<br /><br />
        <b>Why We Request User Data:</b> To provide personalized fitness tracking and insights, FitTrack requests access to your Google Fit data. Your data is used solely to display your activity and progress within the app. We do not share your data with third parties.<br /><br />
        <b>Transparency:</b> Your privacy is important to us. Please review our <a href="https://vijayaraju.in/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> for full details on how your data is handled.<br /><br />
        For any questions, contact us at <a href="mailto:vijaya15082005@gmail.com">vijaya15082005@gmail.com</a>.<br /><br />
        <b>Note:</b> This homepage and privacy policy are hosted on our verified domain (<b>vijayaraju.in</b>) and are visible to all users without login.
      </p>
      <div style={{display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 24}}>
        <button onClick={() => onShowAuth('login')} style={{padding: '10px 28px', fontSize: '1rem', borderRadius: 6, background: '#4285F4', color: '#fff', border: 'none', fontWeight: 500, cursor: 'pointer'}}>Login</button>
        <button onClick={() => onShowAuth('signup')} style={{padding: '10px 28px', fontSize: '1rem', borderRadius: 6, background: '#34A853', color: '#fff', border: 'none', fontWeight: 500, cursor: 'pointer'}}>Sign Up</button>
      </div>
      <div style={{marginTop: 8}}>
        <a href="https://vijayaraju.in/privacy-policy" target="_blank" rel="noopener noreferrer" style={{color:'#007bff', textDecoration:'underline', fontSize:'1rem'}}>View Privacy Policy</a>
      </div>
    </div>
  );
}

function App() {
  const { user } = useContext(UserContext);
  const [showAuth, setShowAuth] = useState(null); // null | 'login' | 'signup'

  if (user) {
    return (
      <div className="container">
        <Dashboard />
      </div>
    );
  }

  return (
    <div className="container">
      {!showAuth && <HomePage onShowAuth={setShowAuth} />}
      {showAuth && <AuthForm onClose={() => setShowAuth(null)} />}
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
