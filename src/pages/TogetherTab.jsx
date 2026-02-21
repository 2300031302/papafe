import { useState, useEffect } from 'react';
import { Search, UserPlus, X, Footprints, Flame, Trophy } from 'lucide-react';
import MOCK_USERS from '../data/mockUsers';
import './TogetherTab.css';

const COMP_KEY = 'ht_competitors';

function readCompetitors() {
    try {
        const raw = localStorage.getItem(COMP_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch { return []; }
}

function CompareBar({ label, you, them, max, color }) {
    const youPct = Math.min((you / max) * 100, 100);
    const themPct = Math.min((them / max) * 100, 100);
    return (
        <div className="compare-metric">
            <span className="compare-label">{label}</span>
            <div className="compare-bars">
                <div className="bar-row">
                    <span className="bar-who you-tag">You</span>
                    <div className="bar-track">
                        <div className="bar-fill you" style={{ width: `${youPct}%`, background: color }} />
                    </div>
                    <span className="bar-val">{you.toLocaleString()}</span>
                </div>
                <div className="bar-row">
                    <span className="bar-who">Them</span>
                    <div className="bar-track">
                        <div className="bar-fill them" style={{ width: `${themPct}%` }} />
                    </div>
                    <span className="bar-val">{them.toLocaleString()}</span>
                </div>
            </div>
        </div>
    );
}

export default function TogetherTab({ myData }) {
    const [query, setQuery] = useState('');
    const [competitors, setCompetitors] = useState(readCompetitors);
    const [results, setResults] = useState([]);
    const [inviting, setInviting] = useState(null); // ID of user being invited

    useEffect(() => {
        localStorage.setItem(COMP_KEY, JSON.stringify(competitors));
    }, [competitors]);

    useEffect(() => {
        if (!query.trim()) { setResults([]); return; }
        const q = query.toLowerCase();
        setResults(MOCK_USERS.filter(u =>
            u.name.toLowerCase().includes(q) && !competitors.includes(u.id)
        ));
    }, [query, competitors]);

    const handleInvite = (id) => {
        setInviting(id);
        // Simulate a network delay for the "Invitation"
        setTimeout(() => {
            setCompetitors(prev => [...prev, id]);
            setInviting(null);
            setQuery('');
        }, 800);
    };

    const removeCompetitor = (id) => {
        setCompetitors(prev => prev.filter(c => c !== id));
    };

    const compUsers = MOCK_USERS.filter(u => competitors.includes(u.id));
    const mySteps = myData?.steps?.current ?? 0;
    const myCals = myData?.calories?.burned ?? 0;
    const mySleep = (myData?.sleep?.hours ?? 0) * 60 + (myData?.sleep?.minutes ?? 0);

    const maxSteps = Math.max(mySteps, ...compUsers.map(u => u.steps), 1);
    const maxCals = Math.max(myCals, ...compUsers.map(u => u.calories), 1);
    const maxSleep = Math.max(mySleep, ...compUsers.map(u => (u.sleep?.hours ?? 0) * 60 + (u.sleep?.minutes ?? 0)), 1);

    return (
        <div className="together-tab">
            <div className="tab-header-block">
                <Trophy size={28} className="tab-header-icon" />
                <h2>Compete & Collaborate</h2>
                <p>Find friends to challenge and track your progress together</p>
            </div>

            {/* Search */}
            <div className="together-search">
                <input
                    placeholder="Search friends by name…"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />
                <Search size={20} className="search-icon" />
                {query && (
                    <button className="clear-btn" onClick={() => setQuery('')}>
                        <X size={16} />
                    </button>
                )}
            </div>

            {/* Search results */}
            {results.length > 0 && (
                <div className="search-results">
                    {results.map(u => (
                        <div className="user-result" key={u.id}>
                            <div className="user-avatar">{u.avatar}</div>
                            <div className="user-info">
                                <span className="user-name">{u.name}</span>
                                <span className="user-email">{u.email}</span>
                            </div>
                            <button
                                className={`compete-btn ${inviting === u.id ? 'inviting' : ''}`}
                                onClick={() => handleInvite(u.id)}
                                disabled={inviting === u.id}
                            >
                                {inviting === u.id ? 'Inviting...' : (
                                    <>
                                        <UserPlus size={14} /> Invite
                                    </>
                                )}
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {query && results.length === 0 && (
                <div className="no-results-card">
                    <Search size={32} />
                    <p>No users found matching "{query}"</p>
                </div>
            )}

            {/* Active competitions */}
            {compUsers.length > 0 ? (
                <div className="competitions">
                    <div className="section-header">
                        <h3 className="section-label">Leaderboard / Competition</h3>
                        <span className="comp-count">{compUsers.length} Active</span>
                    </div>
                    {compUsers.map(u => {
                        const themSleep = (u.sleep?.hours ?? 0) * 60 + (u.sleep?.minutes ?? 0);
                        return (
                            <div className="comp-card" key={u.id}>
                                <div className="comp-header">
                                    <div className="user-avatar small">{u.avatar}</div>
                                    <div className="comp-user-meta">
                                        <span className="comp-name">{u.name}</span>
                                        <span className="comp-status">Online</span>
                                    </div>
                                    <button className="remove-comp" onClick={() => removeCompetitor(u.id)}>
                                        <X size={14} />
                                    </button>
                                </div>
                                <div className="comp-metrics-grid">
                                    <CompareBar label="Steps" you={mySteps} them={u.steps} max={maxSteps} color="#00e676" />
                                    <CompareBar label="Calories" you={myCals} them={u.calories} max={maxCals} color="#ff9800" />
                                    <CompareBar label="Sleep (Min)" you={mySleep} them={themSleep} max={maxSleep} color="#2196f3" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                !query && (
                    <div className="empty-state">
                        <div className="empty-icon-ring">
                            <Trophy size={40} />
                        </div>
                        <p>Start Your First Competition</p>
                        <span>Search for friends above to begin competing and stay motivated!</span>
                    </div>
                )
            )}
        </div>
    );
}
