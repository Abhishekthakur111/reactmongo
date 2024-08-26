import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Change() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const reset = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    const token = localStorage.getItem('token');
    console.log(token,'//////')
    if (!token) {
      toast.error("No token found. Please log in again.");
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8000/change_password',
        { password, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        localStorage.setItem('token', response.data.body.token); 
        toast.success("Your password was reset successfully");
        navigate("/dashboard");
      } else {
        toast.error(response.data.message || "Password reset failed");
      }
    } catch (error) {
      toast.error("An error occurred while resetting the password: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div id="app">
      <div className="main-wrapper">
        <div className="navbar-bg" />
        <div className="main-content">
          <section className="section">
            <div className="section-header">
              <h1>Change Password</h1>
            </div>
            <div className="card card-primary">
              <div className="card-header">
                <h4>Reset Password</h4>
              </div>
              <div className="card-body">
                <form onSubmit={reset}>
                  <div className="form-group">
                    <label htmlFor="password">Old Password</label>
                    <input
                      id="password"
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                      id="newPassword"
                      type="password"
                      className="form-control"
                      value={newPassword}
                      onChange={handleNewPasswordChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      id="confirmPassword"
                      type="password"
                      className="form-control"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      required
                    />
                  </div>
                  <div className="d-flex justify-content-start">
                    <button type="submit" className="btn btn-primary">
                      Reset Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Change;
