import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="legal-page dark-bg">
      <h1>Privacy Policy</h1>
      <div className="legal-content">
        <p><b>Health Tracker</b><br/>Effective Date: <span style={{color:'#ffd700'}}>[Insert Date]</span><br/>Location: Vijayawada, Andhra Pradesh, India</p>
        <h2>1. Introduction</h2>
        <p>Welcome to Health Tracker (“we”, “our”, “us”).<br/>This website is a college academic project developed for educational purposes and may be hosted publicly for academic evaluation.</p>
        <p>This Privacy Policy explains how we collect, use, store, and protect user information in accordance with applicable Indian laws, including:</p>
        <ul>
          <li>The Information Technology Act, 2000</li>
          <li>The Digital Personal Data Protection Act, 2023 (India)</li>
        </ul>
        <h2>2. Information We Collect</h2>
        <b>A. Information Provided by Users</b>
        <ul>
          <li>Username</li>
          <li>Email Address</li>
          <li>Password (stored in encrypted format)</li>
          <li>Steps data</li>
          <li>Calories data (if provided manually)</li>
        </ul>
        <b>B. Data from Google Fit</b>
        <ul>
          <li>Step count data may be accessed through Google Fit APIs</li>
          <li>We only access step-related information necessary for tracking</li>
          <li>We do not collect unnecessary health or personal information.</li>
        </ul>
        <h2>3. How We Use Your Information</h2>
        <ul>
          <li>Create and manage your account</li>
          <li>Display step tracking data</li>
          <li>Sync steps from Google Fit</li>
          <li>Store and maintain activity records</li>
          <li>Improve project functionality</li>
        </ul>
        <p style={{color:'#ffd700'}}>We do not sell, rent, or trade your personal data.</p>
        <h2>4. Data Storage & Security</h2>
        <ul>
          <li>Data is stored in MongoDB database</li>
          <li>Passwords are encrypted using secure hashing methods</li>
          <li>Access to the database is restricted</li>
          <li>Basic security measures are implemented</li>
        </ul>
        <p>However, as this is an academic project, absolute security cannot be guaranteed.</p>
        <h2>5. Data Sharing</h2>
        <ul>
          <li>We do not share personal data with third parties.</li>
          <li>Data may only be disclosed:<ul><li>If required by Indian law</li><li>If necessary for academic review</li><li>If required for resolving technical issues</li></ul></li>
        </ul>
        <h2>6. Account Deletion</h2>
        <ul>
          <li>Users may delete their account at any time</li>
          <li>Request deletion of stored data</li>
          <li>Upon deletion, user data will be removed from the database within a reasonable time.</li>
        </ul>
        <h2>7. Cookies & Tracking</h2>
        <p>Health Tracker does not use cookies or advertising trackers.<br/>Basic technical session handling may be used for login functionality.</p>
        <h2>8. Children’s Data</h2>
        <p>This project does not impose age restrictions.<br/>However, minors are encouraged to use the platform under parental guidance.</p>
        <h2>9. Educational Purpose Notice</h2>
        <p>This website is created strictly for college academic submission.<br/>It is not intended for commercial use.</p>
        <h2>10. Changes to This Policy</h2>
        <p>We may update this Privacy Policy if required for academic or technical reasons. Updates will be posted on this page.</p>
        <h2>11. Contact Information</h2>
        <p>For any privacy-related concerns:</p>
        <ul>
          <li>📧 Email: <a href="mailto:vijaya15082005@gmail.com" style={{color:'#ffd700'}}>vijaya15082005@gmail.com</a></li>
          <li>📍 Location: Vijayawada, Andhra Pradesh, India</li>
        </ul>
      </div>
    </div>
  );
}
