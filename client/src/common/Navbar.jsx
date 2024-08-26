import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import axios from "axios";
import Swal from 'sweetalert2';

const Navbar = () => {
  const [image, setImage] = useState('../assets/img/avatar/avatar-1.png');
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchImage = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found in localStorage");
        return;
      };

      try {
        const response = await axios.get('http://localhost:8000/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data && response.data.body && response.data.body.image) {
          setImage(`http://localhost:8000/${response.data.body.image}`);
        }
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };

    fetchImage();
  }, []);

  const logout = async () => {
    
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out of your account.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!',
    });

    if (result.isConfirmed) {
      try {
        await axios.post('http://localhost:8000/logout');
        localStorage.removeItem('token');
        navigate('/');
      } catch (error) {
        console.error('Error logging out:', error);
      }
    }
  };
  
  return (
    <div id="app">
      <div className="main-wrapper">
        <div className="navbar-bg" />
        <nav className="navbar navbar-expand-lg main-navbar">
          <form className="form-inline mr-auto">
            <ul className="navbar-nav mr-3">
              <li>
                <Link to="#" data-toggle="sidebar" className="nav-link nav-link-lg">
                  <i className="fas fa-bars" />
                </Link>
              </li>
            </ul>
          </form>
          <ul className="navbar-nav navbar-right">
            <li className="dropdown">
              <Link
                to="#"
                data-toggle="dropdown"
                className="nav-link dropdown-toggle nav-link-lg nav-link-user"
              >
                <img
                  alt="avatar"
                  src={image}
                  className="rounded-circle mr-1"
                />
                <div className="d-sm-none d-lg-inline-block"></div>
              </Link>
              <div className="dropdown-menu dropdown-menu-right">
                <Link to="/Profile" className="dropdown-item has-icon text-success">
                  <i className="far fa-user" /> Profile
                </Link>
                <Link to="/ChangePassword" className="dropdown-item has-icon text-info">
                  <i className="fas fa-lock" /> Change Password
                </Link>
                <Link to="#" onClick={logout} className="dropdown-item has-icon text-danger">
                  <i className="fas fa-sign-out-alt" /> Logout
                </Link>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
