
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import apiRequest from '../../utils/apiRequest';
import './ConfirmEmail.scss';

const ConfirmEmail = () => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { username } = location.state || {};

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username) {
            setError('Username is missing. Please try again.');
            return;
        }
        try {
            const response = await apiRequest.post("/auth/confirm-account", { username, code });
            if (response.data !=null) {
                navigate("/login");
            } else {
                setError('Invalid confirmation code');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="confirm-email-container">
            <div className="form-wrapper">
                <h2>Confirm Your Email</h2>
                <h3>Please check your email for the confirmation code</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        className="code-input"
                        type="text"
                        placeholder="Enter confirmation code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                    />
                    <button className="confirm-button" type="submit">Confirm</button>
                </form>
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
};

export default ConfirmEmail;
