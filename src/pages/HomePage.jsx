import { useNavigate } from 'react-router-dom';
import {
    Activity, Footprints, Zap, Moon, Droplets, Heart,
    ArrowRight, ChevronDown
} from 'lucide-react';
import './HomePage.css';

const FEATURES = [
    {
        icon: <Footprints size={28} />,
        title: 'Step Tracking',
        desc: 'Count every step with real-time progress rings and daily goals that keep you moving.',
        color: '#00e676',
    },
    {
        icon: <Zap size={28} />,
        title: 'Workout Logging',
        desc: 'Log walking, running, cycling & more. Track duration, calories, and weekly streaks.',
        color: '#ff9800',
    },
    {
        icon: <Moon size={28} />,
        title: 'Sleep Analysis',
        desc: 'Monitor your sleep schedule, duration, and quality for better rest every night.',
        color: '#7c4dff',
    },
    {
        icon: <Activity size={28} />,
        title: 'Body Composition',
        desc: 'Visualise muscle, fat, and water ratios with intuitive segmented charts.',
        color: '#00bcd4',
    },
    {
        icon: <Droplets size={28} />,
        title: 'Water Intake',
        desc: 'Stay hydrated with a visual glass tracker and quick-add buttons throughout the day.',
        color: '#42a5f5',
    },
    {
        icon: <Heart size={28} />,
        title: 'Vitals Monitoring',
        desc: 'Keep an eye on heart rate, blood oxygen, and blood pressure — all in one place.',
        color: '#ef5350',
    },
];

export default function HomePage() {
    const navigate = useNavigate();

    const scrollToFeatures = () => {
        document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
    };


    return (
        <div className="home-page">
            {/* Animated background */}
            <div className="home-bg-shapes">
                <div className="hshape hshape-1" />
                <div className="hshape hshape-2" />
                <div className="hshape hshape-3" />
                <div className="hshape hshape-4" />
            </div>

            {/* ─── HERO ─── */}
            <section className="hero-section">
                <div className="hero-logo">
                    <Activity size={40} />
                </div>
                <h1 className="hero-title">
                    Health<span className="hero-accent">Tracker</span>
                </h1>


                <p className="hero-subtitle">
                    Your all-in-one personal fitness companion.
                    <br />
                    Track steps, workouts, sleep, vitals & more — beautifully.
                </p>

                <div className="hero-actions">
                    <button className="hero-btn primary" onClick={() => navigate('/auth')}>
                        Get Started <ArrowRight size={18} />
                    </button>
                    <button className="hero-btn secondary" onClick={scrollToFeatures}>
                        Learn More <ChevronDown size={18} />
                    </button>
                </div>

                <div className="hero-badge">
                    <span className="badge-dot" />
                    Free &middot; No credit card required
                </div>
                {/* ─── ABOUT THIS PROJECT ─── */}
                <section className="about-section" style={{ marginBottom: '2rem', background: '#222', padding: '1.5rem', borderRadius: '1rem', maxWidth: 700, margin: '2rem auto 0 auto', boxShadow: '0 2px 12px #0002' }}>
                    <h2 style={{ color: '#00e676', marginBottom: '0.5rem' }}>About This Project</h2>
                    <p style={{ fontSize: '1.1rem', color: '#fff', lineHeight: 1.7 }}>
                        <b>Health Tracker</b> is a step-tracking fitness web application developed for college academic purposes. It helps you monitor your daily steps and calories burnt, using data from your mobile device via the <b>Google Fit API</b>.<br /><br />
                        <b>Google Fit data is accessed only after you grant explicit permission through Google OAuth.</b> Your step count and calories burnt are used solely to display your activity stats within the app.<br /><br />
                        This project is strictly non-commercial and will be active for approximately <b>6 months</b> for academic evaluation. No data is sold or shared with third parties.<br /><br />
                        For more details, please review our <a href="/privacy-policy" style={{ color: '#ffd700', textDecoration: 'underline' }}>Privacy Policy</a> and <a href="/terms-of-service" style={{ color: '#ffd700', textDecoration: 'underline' }}>Terms of Service</a>.
                    </p>
                </section>
            </section>

            

            {/* ─── FEATURES ─── */}
            <section id="features" className="features-section">
                <h2 className="section-title">Everything You Need</h2>
                <p className="section-subtitle">
                    Powerful health insights packed into a stunning dark interface
                </p>

                <div className="features-grid">
                    {FEATURES.map((f, i) => (
                        <div
                            className="feature-card"
                            key={f.title}
                            style={{ '--accent': f.color, animationDelay: `${i * 0.08}s` }}
                        >
                            <div className="feature-icon">{f.icon}</div>
                            <h3>{f.title}</h3>
                            <p>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── CTA ─── */}
            <section className="cta-section">
                <h2>Ready to take control of your health?</h2>
                <button className="hero-btn primary" onClick={() => navigate('/auth')}>
                    Create Free Account <ArrowRight size={18} />
                </button>
            </section>

            {/* ─── FOOTER ─── */}
            <footer className="home-footer">
                <span>&copy; {new Date().getFullYear()} Health Tracker</span>
                <span style={{ marginLeft: 16 }}>
                    <a href="/privacy-policy" style={{ color: '#ffd700', textDecoration: 'underline', marginRight: 12 }}>Privacy Policy</a>
                    <a href="/terms-of-service" style={{ color: '#ffd700', textDecoration: 'underline' }}>Terms of Service</a>
                </span>
            </footer>
        </div>
    );
}
