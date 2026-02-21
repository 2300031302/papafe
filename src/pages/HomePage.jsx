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
            </footer>
        </div>
    );
}
