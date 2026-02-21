import React from 'react';
import './LegalPages.css';

const PrivacyPolicy = () => {
    return (
        <div className="legal-page">
            <h1>Privacy Policy</h1>
            <div className="legal-content">
                <p>
                    <b>Health Tracker</b>
                    <br />
                    Effective Date: <span style={{ color: '#ffd700' }}>February 21, 2026</span>
                    <br />
                    Location: Vijayawada, Andhra Pradesh, India
                </p>

                <h2>1. Introduction</h2>
                <p>
                    Welcome to Health Tracker (“we”, “our”, “us”).
                    <br />
                    This website is a college academic project developed for educational purposes and may be hosted publicly for academic evaluation.
                </p>
                <p>This Privacy Policy explains how we collect, use, store, and protect user information in accordance with applicable Indian laws, including:</p>
                <ul>
                    <li>The Information Technology Act, 2000</li>
                    <li>The Digital Personal Data Protection Act, 2023 (India)</li>
                </ul>

                <h2>2. Information We Collect</h2>
                <ul>
                    <li><b>Step count</b> and <b>calories burnt</b> (from Google Fit, only after you grant permission)</li>
                    <li>Username, email address, password (encrypted)</li>
                </ul>
                <p style={{ color: '#ffd700' }}>
                    <b>Google Fit data is accessed only after you grant explicit consent via Google OAuth.</b>
                </p>
                <ul>
                    <li>No other Google APIs are used.</li>
                    <li>No other health or personal data is collected.</li>
                </ul>

                <h2>3. How We Use Your Information</h2>
                <ul>
                    <li>Display your daily step count and calories burnt</li>
                    <li>Sync step data from Google Fit (with your consent)</li>
                    <li>Show activity stats within the app</li>
                </ul>
                <p style={{ color: '#ffd700' }}>We do not sell, rent, share, or trade your personal data with anyone.</p>

                <h2>4. Data Storage & Security</h2>
                <ul>
                    <li>Data is stored securely on a server with encryption</li>
                    <li>Passwords are encrypted using secure hashing methods</li>
                    <li>Access to the database is restricted</li>
                    <li>Basic security measures are implemented</li>
                </ul>
                <p>As this is an academic project, absolute security cannot be guaranteed.</p>

                <h2>5. Data Sharing</h2>
                <ul>
                    <li>We do <b>not</b> share any collected data with third parties, other apps, or services.</li>
                    <li>Data may only be disclosed if required by Indian law or for academic review.</li>
                </ul>

                <h2>6. Account Deletion</h2>
                <ul>
                    <li>Users may delete their account at any time</li>
                    <li>Request deletion of stored data</li>
                    <li>Upon deletion, user data will be removed from the database within a reasonable time.</li>
                    <li>You can revoke Google Fit access at any time from your Google Account settings (<a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer" style={{ color: '#ffd700' }}>Google Account Permissions</a>).</li>
                </ul>

                <h2>7. Cookies & Tracking</h2>
                <p>
                    Health Tracker does not use cookies or advertising trackers.
                    <br />
                    Basic technical session handling may be used for login functionality.
                </p>

                <h2>8. Children’s Data</h2>
                <p>
                    This project does not impose age restrictions.
                    <br />
                    However, minors are encouraged to use the platform under parental guidance.
                </p>

                <h2>9. Educational Purpose Notice</h2>
                <p>
                    This website is created strictly for college academic submission.
                    <br />
                    It is not intended for commercial use.
                    <br />
                    The service will be active for approximately <b>6 months</b> for evaluation and then may be discontinued.
                </p>

                <h2>10. Changes to This Policy</h2>
                <p>We may update this Privacy Policy if required for academic or technical reasons. Updates will be posted on this page.</p>
                <h2>12. Data Retention</h2>
                <p>All collected data is retained only for the duration of the academic project (approx. 6 months). After this period, the project and all associated data may be discontinued and deleted.</p>

                <h2>11. Contact Information</h2>
                <p>For any privacy-related concerns:</p>
                <ul>
                    <li>
                        📧 Email:{' '}
                        <a href="mailto:vijaya15082005@gmail.com" style={{ color: '#ffd700' }}>
                            vijaya15082005@gmail.com
                        </a>
                    </li>
                    <li>📍 Location: Vijayawada, Andhra Pradesh, India</li>
                </ul>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
