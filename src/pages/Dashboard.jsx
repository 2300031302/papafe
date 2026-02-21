import { useRef, useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import useHealthData from '../data/useHealthData';
import { INTEREST_LABELS } from '../data/healthData';
import MOCK_USERS from '../data/mockUsers';
import TogetherTab from './TogetherTab';
import FitnessTab from './FitnessTab';
import ProfileTab from './ProfileTab';
import {
    Footprints, PersonStanding, Bike, Moon, Heart, Droplets,
    Activity, Star, MoreHorizontal, User, Users, LogOut, Clock, Flame, Zap,
    Plus, Minus, RotateCcw, Settings, X, Check, Search
} from 'lucide-react';
import './Dashboard.css';

/* ─── helpers ─── */
function CircularProgress({ value, max, size = 100, stroke = 8, color = '#00e676' }) {
    const r = (size - stroke) / 2;
    const circ = 2 * Math.PI * r;
    const pct = Math.min(value / max, 1);
    return (
        <svg width={size} height={size} className="ring-svg">
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
            <circle
                cx={size / 2} cy={size / 2} r={r}
                fill="none" stroke={color} strokeWidth={stroke}
                strokeDasharray={circ} strokeDashoffset={circ * (1 - pct)}
                strokeLinecap="round"
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
                style={{ transition: 'stroke-dashoffset 1s ease' }}
            />
        </svg>
    );
}

function ProgressBar({ value, max, color = '#00e676' }) {
    const pct = Math.min((value / max) * 100, 100);
    return (
        <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${pct}%`, background: color }} />
        </div>
    );
}

export default function Dashboard() {
    const { user, logout } = useAuth();
    const scrollRef = useRef(null);
    const [scrollY, setScrollY] = useState(0);
    const [showMenu, setShowMenu] = useState(false);
    const [activeTab, setActiveTab] = useState('home');

    /* Data layer */
    const {
        data, updateData,
        addWater, removeWater, resetWater, setWaterGoal,
        toggleInterest, isVisible,
    } = useHealthData();

    /* UI modals */
    const [showInterests, setShowInterests] = useState(false);
    const [editWaterGoal, setEditWaterGoal] = useState(false);
    const [waterGoalInput, setWaterGoalInput] = useState(String(data.water.goal));
    const [editSleep, setEditSleep] = useState(false);
    const [sleepForm, setSleepForm] = useState({ bedtime: data.sleep.bedtime, wakeup: data.sleep.wakeup });
    const [editBody, setEditBody] = useState(false);
    const [bodyForm, setBodyForm] = useState({ muscle: data.body.muscle, fat: data.body.fat, water: data.body.water });
    const [homeSearch, setHomeSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedReportUser, setSelectedReportUser] = useState(null);

    useEffect(() => {
        if (!homeSearch.trim()) { setSearchResults([]); return; }
        const q = homeSearch.toLowerCase();
        setSearchResults(MOCK_USERS.filter(u => u.name.toLowerCase().includes(q)));
    }, [homeSearch]);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        const handler = () => setScrollY(el.scrollTop);
        el.addEventListener('scroll', handler, { passive: true });
        return () => el.removeEventListener('scroll', handler);
    }, []);

    /* Header interpolation values */
    const heroH = 260;
    const collapsedH = 64;
    const progress = Math.min(scrollY / (heroH - collapsedH), 1);
    const headerHeight = heroH - progress * (heroH - collapsedH);
    const titleSize = 42 - progress * 22;
    const bgOpacity = progress * 0.95;

    /* Derived values */
    const stepPct = Math.round((data.steps.current / data.steps.goal) * 100);
    const waterPct = Math.min((data.water.current / data.water.goal) * 100, 100);

    /* Tab titles for header */
    const tabTitles = { home: 'Health Tracker', together: 'Together', fitness: 'Fitness', profile: '' };

    return (
        <div className="dashboard-root">
            {/* ─── HEADER ─── */}
            <header
                className="dash-header"
                style={{
                    height: headerHeight,
                    background: `rgba(17,17,19,${bgOpacity})`,
                    borderBottom: progress > 0.8 ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
                }}
            >
                <div className="header-content">
                    <h1
                        className="header-title"
                        style={{ fontSize: activeTab === 'home' ? titleSize : 20 }}
                    >
                        {tabTitles[activeTab]}
                    </h1>

                    <div className="header-actions" style={{ opacity: Math.min(progress * 3, 1) }}>
                        <button className="header-btn tips-btn">
                            <Star size={16} /> tips
                        </button>
                        <button className="header-btn" onClick={() => setShowMenu(!showMenu)}>
                            <User size={20} />
                        </button>
                        <button className="header-btn" onClick={() => setShowMenu(!showMenu)}>
                            <MoreHorizontal size={20} />
                        </button>
                    </div>
                </div>

                {/* tips button in hero mode */}
                <div className="hero-tips" style={{ opacity: 1 - Math.min(progress * 2, 1) }}>
                    <button className="tips-pill">
                        <Star size={18} fill="currentColor" /> tips
                    </button>
                </div>

                {showMenu && (
                    <div className="user-menu">
                        <div className="user-menu-header">
                            <User size={18} />
                            <span>{user?.name || 'User'}</span>
                        </div>
                        <button onClick={logout} className="logout-btn">
                            <LogOut size={16} /> Sign Out
                        </button>
                    </div>
                )}
            </header>

            {/* ─── SCROLLABLE CONTENT ─── */}
            <div className="dash-scroll" ref={scrollRef} style={{ paddingTop: activeTab === 'home' ? heroH : collapsedH }}>
                <div className="cards-container">

                    {/* ═══ TAB: TOGETHER ═══ */}
                    {activeTab === 'together' && <TogetherTab myData={data} />}

                    {/* ═══ TAB: FITNESS ═══ */}
                    {activeTab === 'fitness' && <FitnessTab />}

                    {/* ═══ TAB: PROFILE ═══ */}
                    {activeTab === 'profile' && <ProfileTab />}

                    {/* ═══ TAB: HOME ═══ */}
                    {activeTab === 'home' && (<>

                        {/* Search bar */}
                        <div className="home-search">
                            <Search size={18} className="home-search-icon" />
                            <input
                                placeholder="Search users…"
                                value={homeSearch}
                                onChange={e => setHomeSearch(e.target.value)}
                            />
                            {homeSearch && <button className="home-search-clear" onClick={() => setHomeSearch('')}><X size={16} /></button>}
                        </div>

                        {searchResults.length > 0 && (
                            <div className="home-search-results">
                                {searchResults.map(u => (
                                    <div className="search-user-card" key={u.id} onClick={() => setSelectedReportUser(u)}>
                                        <div className="su-avatar">{u.avatar}</div>
                                        <div className="su-info">
                                            <span className="su-name">{u.name}</span>
                                            <span className="su-email">{u.email}</span>
                                        </div>
                                        <div className="su-stats">
                                            <span><Footprints size={12} /> {u.steps.toLocaleString()}</span>
                                            <span><Flame size={12} /> {u.calories} kcal</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}


                        {/* Row 1 — Customize + Stats + Steps */}
                        <div className="card-row three-col">
                            <div className="dash-card customize-card">
                                <p className="card-hint">Customise Health Tracker with the insights that matter to you.</p>
                                <button className="card-action-btn" onClick={() => setShowInterests(true)}>
                                    <Settings size={14} /> Choose interests
                                </button>
                            </div>

                            {isVisible('stats') && (
                                <div className="dash-card stats-card">
                                    <div className="stats-left">
                                        <div className="stat-item"><span className="dot green" /> <strong>{data.steps.current.toLocaleString()}</strong> steps</div>
                                        <div className="stat-item"><span className="dot blue" /> <strong>{data.exercise.minutes}</strong> mins</div>
                                        <div className="stat-item"><span className="dot pink" /> <strong>{data.calories.burned}</strong> kcal</div>
                                    </div>
                                    <div className="stats-ring">
                                        <CircularProgress value={data.steps.current} max={data.steps.goal} size={72} stroke={6} color="#00e676" />
                                        <div className="ring-overlay">
                                            <CircularProgress value={data.exercise.minutes} max={data.exercise.goal} size={56} stroke={5} color="#00bcd4" />
                                            <div className="ring-overlay inner">
                                                <CircularProgress value={data.calories.burned} max={data.calories.goal} size={40} stroke={4} color="#e91e63" />
                                                <Heart size={14} className="ring-heart" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {isVisible('steps') && (
                                <div className="dash-card steps-card">
                                    <div className="steps-top">
                                        <span className="big-number">{data.steps.current.toLocaleString()}</span>
                                        <span className="badge green-badge">{stepPct}%</span>
                                    </div>
                                    <span className="steps-label">/{data.steps.goal.toLocaleString()} steps</span>
                                    <ProgressBar value={data.steps.current} max={data.steps.goal} color="#00e676" />
                                </div>
                            )}
                        </div>

                        {/* Row 2 — Activity + Workout + Sleep */}
                        <div className="card-row three-col">
                            {isVisible('activity') && (
                                <div className="dash-card activity-card">
                                    <div className="activity-icons">
                                        <div className="act-icon"><Footprints size={22} /><span>Walking</span></div>
                                        <div className="act-icon"><PersonStanding size={22} /><span>Running</span></div>
                                        <div className="act-icon"><Bike size={22} /><span>Bike</span></div>
                                        <div className="act-icon"><MoreHorizontal size={22} /><span>More</span></div>
                                    </div>
                                </div>
                            )}

                            {isVisible('workout') && (
                                <div className="dash-card workout-card">
                                    <div className="workout-time">{data.workout.totalTime}</div>
                                    <div className="workout-label">Workouts this week</div>
                                    <div className="workout-stats">
                                        <div className="ws"><Clock size={14} /> {data.workout.sessions} sessions</div>
                                        <div className="ws"><Flame size={14} /> {data.workout.kcal} kcal</div>
                                    </div>
                                </div>
                            )}

                            {isVisible('sleep') && (
                                <div className="dash-card sleep-card">
                                    <div className="sleep-top">
                                        <Moon size={18} />
                                        <span className="sleep-val">
                                            <strong>{data.sleep.hours}</strong><sup>h</sup>{' '}
                                            <strong>{data.sleep.minutes}</strong><sup>m</sup>
                                        </span>
                                    </div>
                                    <div className="sleep-schedule">
                                        <span className="schedule-tag">{data.sleep.bedtime} – {data.sleep.wakeup}</span>
                                    </div>
                                    {!editSleep ? (
                                        <button className="card-action-btn outline" onClick={() => setEditSleep(true)}>Record this time</button>
                                    ) : (
                                        <div className="inline-edit">
                                            <div className="edit-row">
                                                <label>Bed</label>
                                                <input value={sleepForm.bedtime} onChange={(e) => setSleepForm({ ...sleepForm, bedtime: e.target.value })} />
                                            </div>
                                            <div className="edit-row">
                                                <label>Wake</label>
                                                <input value={sleepForm.wakeup} onChange={(e) => setSleepForm({ ...sleepForm, wakeup: e.target.value })} />
                                            </div>
                                            <div className="edit-actions">
                                                <button className="edit-save" onClick={() => {
                                                    updateData({ sleep: { ...data.sleep, bedtime: sleepForm.bedtime, wakeup: sleepForm.wakeup } });
                                                    setEditSleep(false);
                                                }}><Check size={14} /> Save</button>
                                                <button className="edit-cancel" onClick={() => setEditSleep(false)}><X size={14} /></button>
                                            </div>
                                        </div>
                                    )}
                                    <ProgressBar value={data.sleep.quality} max={100} color="#7c4dff" />
                                </div>
                            )}
                        </div>

                        {/* Row 3 — Body + Water + Medications */}
                        <div className="card-row three-col">
                            {isVisible('body') && (
                                <div className="dash-card body-card">
                                    <div className="body-top">
                                        <Zap size={18} />
                                        <strong>Body composition</strong>
                                    </div>
                                    {!editBody ? (
                                        <button className="card-action-btn outline small" onClick={() => setEditBody(true)}>Enter</button>
                                    ) : (
                                        <div className="inline-edit">
                                            <div className="edit-row">
                                                <label>Muscle %</label>
                                                <input type="number" value={bodyForm.muscle} onChange={(e) => setBodyForm({ ...bodyForm, muscle: Number(e.target.value) })} />
                                            </div>
                                            <div className="edit-row">
                                                <label>Fat %</label>
                                                <input type="number" value={bodyForm.fat} onChange={(e) => setBodyForm({ ...bodyForm, fat: Number(e.target.value) })} />
                                            </div>
                                            <div className="edit-row">
                                                <label>Water %</label>
                                                <input type="number" value={bodyForm.water} onChange={(e) => setBodyForm({ ...bodyForm, water: Number(e.target.value) })} />
                                            </div>
                                            <div className="edit-actions">
                                                <button className="edit-save" onClick={() => {
                                                    updateData({ body: { muscle: bodyForm.muscle, fat: bodyForm.fat, water: bodyForm.water } });
                                                    setEditBody(false);
                                                }}><Check size={14} /> Save</button>
                                                <button className="edit-cancel" onClick={() => setEditBody(false)}><X size={14} /></button>
                                            </div>
                                        </div>
                                    )}
                                    <div className="body-bar">
                                        <div className="bar-segment green" style={{ width: `${data.body.muscle}%` }} />
                                        <div className="bar-segment orange" style={{ width: `${data.body.fat}%` }} />
                                        <div className="bar-segment red" style={{ width: `${data.body.water}%` }} />
                                    </div>
                                    <div className="body-legend">
                                        <span><span className="dot green" /> Muscle {data.body.muscle}%</span>
                                        <span><span className="dot orange" /> Fat {data.body.fat}%</span>
                                        <span><span className="dot red-dot" /> Water {data.body.water}%</span>
                                    </div>
                                </div>
                            )}

                            {isVisible('water') && (
                                <div className="dash-card water-card">
                                    <div className="water-top">
                                        <Droplets size={18} />
                                        <span><strong>{data.water.current.toLocaleString()}</strong> / {data.water.goal.toLocaleString()} ml</span>
                                    </div>
                                    <div className="water-controls">
                                        <button className="water-btn minus" onClick={() => removeWater()} disabled={data.water.current <= 0}>
                                            <Minus size={14} />
                                        </button>
                                        <button className="water-btn add" onClick={() => addWater()}>
                                            <Plus size={14} /> {data.water.increment} ml
                                        </button>
                                        <button className="water-btn reset" onClick={resetWater}>
                                            <RotateCcw size={14} />
                                        </button>
                                    </div>
                                    <div className="water-glass">
                                        <div className="glass-fill" style={{ height: `${waterPct}%` }} />
                                        <span className="glass-label">{Math.round(waterPct)}%</span>
                                    </div>
                                    {!editWaterGoal ? (
                                        <button className="water-goal-btn" onClick={() => { setWaterGoalInput(String(data.water.goal)); setEditWaterGoal(true); }}>
                                            <Settings size={12} /> Set goal
                                        </button>
                                    ) : (
                                        <div className="inline-edit compact">
                                            <div className="edit-row">
                                                <label>Goal (ml)</label>
                                                <input type="number" value={waterGoalInput} onChange={(e) => setWaterGoalInput(e.target.value)} />
                                            </div>
                                            <div className="edit-actions">
                                                <button className="edit-save" onClick={() => { setWaterGoal(Number(waterGoalInput)); setEditWaterGoal(false); }}><Check size={14} /></button>
                                                <button className="edit-cancel" onClick={() => setEditWaterGoal(false)}><X size={14} /></button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {isVisible('medications') && (
                                <div className="dash-card med-card">
                                    <span className="med-badge">Medications</span>
                                    <p className="med-desc">{data.medications.description}</p>
                                </div>
                            )}
                        </div>

                        {/* Row 4 — Vitals */}
                        {isVisible('vitals') && (
                            <div className="card-row three-col">
                                <div className="dash-card vitals-card">
                                    <div className="vital-header">
                                        <Heart size={18} className="red" />
                                        <strong>Heart rate</strong>
                                    </div>
                                    <div className="vital-value">{data.vitals.heartRate.value} <span>bpm</span></div>
                                    <ProgressBar value={data.vitals.heartRate.value} max={data.vitals.heartRate.max} color="#ef5350" />
                                </div>

                                <div className="dash-card vitals-card">
                                    <div className="vital-header">
                                        <Activity size={18} className="blue-icon" />
                                        <strong>Blood oxygen</strong>
                                    </div>
                                    <div className="vital-value">{data.vitals.bloodOxygen.value}<span>%</span></div>
                                    <ProgressBar value={data.vitals.bloodOxygen.value} max={data.vitals.bloodOxygen.max} color="#42a5f5" />
                                </div>

                                <div className="dash-card vitals-card">
                                    <div className="vital-header">
                                        <Activity size={18} className="purple-icon" />
                                        <strong>Blood pressure</strong>
                                    </div>
                                    <div className="vital-value">{data.vitals.bloodPressure.value}<span> mmHg</span></div>
                                    <ProgressBar value={data.vitals.bloodPressure.value} max={data.vitals.bloodPressure.max} color="#ab47bc" />
                                </div>
                            </div>
                        )}

                        {/* bottom spacer for scroll */}
                        <div style={{ height: 100 }} />

                    </>)}{/* end home tab */}
                </div>
            </div>

            {/* ─── INTEREST PICKER MODAL ─── */}
            {showInterests && (
                <div className="modal-overlay" onClick={() => setShowInterests(false)}>
                    <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Choose Your Interests</h2>
                            <button className="modal-close" onClick={() => setShowInterests(false)}><X size={20} /></button>
                        </div>
                        <p className="modal-subtitle">Toggle which health cards appear on your dashboard</p>
                        <div className="interest-list">
                            {Object.entries(INTEREST_LABELS).map(([id, label]) => (
                                <div className="interest-item" key={id}>
                                    <span className="interest-label">{label}</span>
                                    <button
                                        className={`toggle-switch ${isVisible(id) ? 'on' : ''}`}
                                        onClick={() => toggleInterest(id)}
                                    >
                                        <span className="toggle-knob" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* ─── USER REPORT MODAL ─── */}
            {selectedReportUser && (
                <div className="modal-overlay" onClick={() => setSelectedReportUser(null)}>
                    <div className="modal-panel report-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <div className="report-user-head">
                                <div className="su-avatar">{selectedReportUser.avatar}</div>
                                <div>
                                    <h2>{selectedReportUser.name}'s Report</h2>
                                    <p className="modal-subtitle">Weekly Health Performance</p>
                                </div>
                            </div>
                            <button className="modal-close" onClick={() => setSelectedReportUser(null)}><X size={20} /></button>
                        </div>

                        <div className="report-table-wrapper">
                            <table className="report-table">
                                <thead>
                                    <tr>
                                        <th>Day</th>
                                        <th>Steps</th>
                                        <th>Walking</th>
                                        <th>Running</th>
                                        <th>Cals</th>
                                        <th>Sleep</th>
                                        <th>Water</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedReportUser.weeklyHistory.map((day, idx) => (
                                        <tr key={idx}>
                                            <td className="day-cell">{day.day}</td>
                                            <td>{day.steps.toLocaleString()}</td>
                                            <td>{day.walkingTime}</td>
                                            <td>{day.runningTime}</td>
                                            <td>{day.calories}</td>
                                            <td>{day.sleepTime}</td>
                                            <td>{day.water}ml</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* ─── BOTTOM NAV ─── */}
            <nav className="bottom-nav">
                {[
                    { id: 'home', label: 'home', icon: <Activity size={20} /> },
                    { id: 'together', label: 'together', icon: <Users size={20} /> },
                    { id: 'fitness', label: 'fitness', icon: <Zap size={20} /> },
                    { id: 'profile', label: 'profile', icon: <User size={20} /> },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.icon}
                        <span>{tab.label}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
}
