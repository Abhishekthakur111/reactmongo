import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";
import ApexChart from './ApexCharts';

const Dashboard = () => {
  const [users, setUsers] = useState('');
  const [provider, setProviders] =useState('');
  const [worker, setWorkers] = useState('');
  const [category, setCategories] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      toast.success(location.state.message);
    }
    dashboard();
  }, [location.state]);

  const dashboard = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Authentication token missing');
        navigate('/login'); 
        return;
      }
  
      const response = await axios.get('http://localhost:8000/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (response.data.success) {
        setUsers(response.data.body.userCount);
        setProviders(response.data.body.providerCount);
        setWorkers(response.data.body.workerCount);
        setCategories(response.data.body.category);
      } else {
        toast.error('Failed to fetch dashboard data');
      }
    } catch (error) {
      toast.error('An error occurred while fetching the dashboard data');
    }
  };
  

  const handleUserClick = () => {
    navigate('/userlist');
  };
  const handleProviderClick =() => {
    navigate('/provider');
   };
  const handleWorkerClick = () => {
    navigate('/worker');
  };
  const handlecategory = () => {
    navigate('/categeorylist');
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
      <div className="main-content">
        <section className="section">
          <div className="section-header">
            <h1>Dashboard</h1>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="card card-statistic-1" onClick={handleUserClick}>
                <div className="card-icon bg-primary">
                  <i className="far fa-user" />
                </div>
                <div className="card-wrap">
                  <div className="card-header">
                    <h4>Users</h4>
                  </div>
                  <div className="card-body">{users}</div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="card card-statistic-1" onClick={handleProviderClick}>
                <div className="card-icon bg-danger">
                  <i className="far fa-user-md" />
                </div>
                <div className="card-wrap">
                  <div className="card-header">
                    <h4>Providers</h4>
                  </div>
                  <div className="card-body">{provider}</div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="card card-statistic-1" onClick={handleWorkerClick}>
                <div className="card-icon bg-warning" >
                  <i className="far fa-users" />
                </div>
                <div className="card-wrap">
                  <div className="card-header">
                    <h4>Workers</h4>
                  </div>
                  <div className="card-body">{worker}</div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="card card-statistic-1" onClick={handlecategory}>
                <div className="card-icon bg-success">
                  <i className="fas fa-circle" />
                </div>
                <div className="card-wrap">
                  <div className="card-header">
                    <h4>Categories</h4>
                  </div>
                  <div className="card-body">{category}</div>
                </div>
              </div>
            </div>
          </div>
          <ApexChart />
        </section>
      </div>
    </>
  );
};

export default Dashboard;
