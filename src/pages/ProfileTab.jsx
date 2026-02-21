import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
    User, Lock, Eye, EyeOff, Check, Trophy, Footprints,
    Moon, Flame, Droplets, LogOut, Shield
} from 'lucide-react';
import './ProfileTab.css';

const RECORDS_KEY = 'ht_records';

const DEFAULT_RECORDS = {
    maxSteps: 12450,
    highestSleep: '9h 15m',
    mostCalories: 523,
    bestHydration: 3000,
};

function readRecords() {
    try {
        const raw = localStorage.getItem(RECORDS_KEY);
        return raw ? { ...DEFAULT_RECORDS, ...JSON.parse(raw) } : { ...DEFAULT_RECORDS };
    } catch { return { ...DEFAULT_RECORDS }; }
}

export default function ProfileTab() {
    const { user, logout, changePassword } = useAuth();
    const [records] = useState(readRecords);

    /* Password form */
    const [showPwForm, setShowPwForm] = useState(false);
    const [pwForm, setPwForm] = useState({ current: '', newPw: '', confirm: '' });
    const [showPw, setShowPw] = useState(false);
    const [pwMsg, setPwMsg] = useState({ text: '', type: '' });

    const handlePwChange = async () => {
        setPwMsg({ text: '', type: '' });
        if (!pwForm.current || !pwForm.newPw || !pwForm.confirm) {
            setPwMsg({ text: 'All fields are required', type: 'error' });
            return;
        }
        if (pwForm.newPw.length < 6) {
            setPwMsg({ text: 'New password must be at least 6 characters', type: 'error' });
            return;
        }
        if (pwForm.newPw !== pwForm.confirm) {
            setPwMsg({ text: 'Passwords do not match', type: 'error' });
            return;
        }
        const result = changePassword(pwForm.current, pwForm.newPw);
        if (result.success) {
            setPwMsg({ text: 'Password changed successfully!', type: 'success' });
            setPwForm({ current: '', newPw: '', confirm: '' });
            setTimeout(() => setShowPwForm(false), 1500);
        } else {
            setPwMsg({ text: result.error, type: 'error' });
        }
    };

    const RECORD_ITEMS = [
        { icon: <Footprints size={20} />, label: 'Maximum Steps', value: records.maxSteps.toLocaleString(), color: '#00e676', unit: 'steps' },
        { icon: <Moon size={20} />, label: 'Best Sleep', value: records.highestSleep, color: '#7c4dff', unit: '' },
        { icon: <Flame size={20} />, label: 'Most Calories Burned', value: records.mostCalories.toLocaleString(), color: '#ff9800', unit: 'kcal' },
        { icon: <Droplets size={20} />, label: 'Best Hydration Day', value: records.bestHydration.toLocaleString(), color: '#42a5f5', unit: 'ml' },
    ];

    return (
        <div className="profile-tab">
            {/* User info */}
            <div className="profile-header">
                <div className="profile-avatar">
                    {user?.name?.split(' ').map(w => w[0]).join('') || 'U'}
                </div>
                <h2 className="profile-name">{user?.name || 'User'}</h2>
                <p className="profile-email">{user?.email || ''}</p>
            </div>

            {/* Lifetime Records */}
            <div className="profile-section">
                <div className="section-head">
                    <Trophy size={18} className="section-icon" />
                    <h3>Lifetime Records</h3>
                </div>
                <p className="section-sub">Your personal bests — keep pushing!</p>
                <div className="records-grid">
                    {RECORD_ITEMS.map(r => (
                        <div className="record-card" key={r.label}>
                            <div className="record-icon" style={{ background: `${r.color}18`, color: r.color }}>
                                {r.icon}
                            </div>
                            <div className="record-info">
                                <span className="record-value">{r.value} <small>{r.unit}</small></span>
                                <span className="record-label">{r.label}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Change Password */}
            <div className="profile-section">
                <div className="section-head">
                    <Shield size={18} className="section-icon" />
                    <h3>Security</h3>
                </div>
                {!showPwForm ? (
                    <button className="pw-toggle-btn" onClick={() => setShowPwForm(true)}>
                        <Lock size={14} /> Change Password
                    </button>
                ) : (
                    <div className="pw-form">
                        <div className="pw-input-group">
                            <Lock size={16} className="pw-icon" />
                            <input
                                type={showPw ? 'text' : 'password'}
                                placeholder="Current password"
                                value={pwForm.current}
                                onChange={e => setPwForm({ ...pwForm, current: e.target.value })}
                            />
                            <button className="pw-eye" onClick={() => setShowPw(!showPw)}>
                                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                        <div className="pw-input-group">
                            <Lock size={16} className="pw-icon" />
                            <input
                                type={showPw ? 'text' : 'password'}
                                placeholder="New password"
                                value={pwForm.newPw}
                                onChange={e => setPwForm({ ...pwForm, newPw: e.target.value })}
                            />
                        </div>
                        <div className="pw-input-group">
                            <Lock size={16} className="pw-icon" />
                            <input
                                type={showPw ? 'text' : 'password'}
                                placeholder="Confirm new password"
                                value={pwForm.confirm}
                                onChange={e => setPwForm({ ...pwForm, confirm: e.target.value })}
                            />
                        </div>

                        {pwMsg.text && (
                            <div className={`pw-msg ${pwMsg.type}`}>{pwMsg.text}</div>
                        )}

                        <div className="pw-actions">
                            <button className="pw-save" onClick={handlePwChange}>
                                <Check size={14} /> Update Password
                            </button>
                            <button className="pw-cancel" onClick={() => { setShowPwForm(false); setPwMsg({ text: '', type: '' }); }}>
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Logout */}
            <button className="profile-logout" onClick={logout}>
                <LogOut size={16} /> Sign Out
            </button>
        </div>
    );
}
