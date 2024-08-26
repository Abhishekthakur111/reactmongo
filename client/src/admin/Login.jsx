import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'animate.css';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleChange1 = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/login', { email, password });
      console.log(response);
      if (response.data.success) {
        localStorage.setItem('token', response.data.body.token);
        toast.success("Admin logged in successfully");
        navigate('/dashboard', { state: { message: 'Admin logged in successfully' } });
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      toast.error('An error occurred while logging in. Please try again');
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div id="app" className="d-flex justify-content-end align-items-center vh-100">
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-8 col-md-6 col-lg-6 col-xl-4">
              <div className="login-brand animate__animated animate__fadeInDown text-center mb-4">
                <img
                  src="/image.png"
                  alt="logo"
                  width={100}
                  className="shadow-light rounded-circle"
                />
              </div>
              <div className="card card-primary animate__animated animate__fadeInUp">
                <div className="card-header">
                  <h4>Login</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        id="email"
                        type="email"
                        className="form-control"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        required
                      />
                      <div className="invalid-feedback">
                        Please fill in your email
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        id="password"
                        type="password"
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={handleChange1}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <button type="submit" className="btn btn-primary btn-lg btn-block">
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
