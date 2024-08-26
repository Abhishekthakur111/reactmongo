import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = "http://localhost:8000";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [statusOptions] = useState([
    { value: "0", label: "Pending" },
    { value: "1", label: "Ongoing" },
    { value: "2", label: "Complete" }
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/booking`);
      if (response.data.success) {
        setBookings(response.data.body);
      } else {
        Swal.fire("Error", response.data.message || "Failed to load bookings", "error");
      }
    } catch (error) {
      console.error("Error fetching booking list", error);
      Swal.fire("Error", error.response?.data?.message || "An error occurred while fetching the booking list", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBookings = bookings.filter(booking =>
    booking.booking_code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewBooking = (id) => {
    navigate(`/booking/${id}`);
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const response = await axios.post(`${BASE_URL}/bookingstatus`, { id: bookingId, status: newStatus });
      if (response.data.success) {
        toast.success("Booking status updated successfully");
        fetchData(); 
      } else {
        Swal.fire("Error", response.data.message || "Failed to update status", "error");
      }
    } catch (error) {
      console.error("Error updating booking status", error);
      Swal.fire("Error", error.response?.data?.message || "An error occurred while updating the status", "error");
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
      <div id="app">
        <div className="main-content">
          <section className="section">
            <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h1>Bookings List</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by Booking Code"
                  value={searchTerm}
                  onChange={handleSearch}
                  style={{ flex: 1 }}
                />
              </div>
            </div>
            <div className="section-body">
              <div className="card">
                <div className="card-body">
                  {loading ? (
                    <p>Loading...</p> 
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-bordered table-md">
                        <thead>
                          <tr>
                            <th>Sr_No.</th>
                            <th>Customer Name</th>
                            <th>Service Name</th>
                            <th>Car Name</th>
                            <th>Model</th>
                            <th>Booking Code</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredBookings.length ? (
                            filteredBookings.map((booking, index) => (
                              <tr key={booking._id}>
                                <td>{index + 1}</td>
                                <td>{booking.user_id?.name || "name"}</td>
                                <td>{booking.service_id?.name || "unknown"}</td>
                                <td>{booking.car_id?.carname}</td>
                                <td>{booking.car_id?.model}</td>
                                <td>{booking.booking_code}</td>                       
                                <td>${booking.amount}</td>
                                <td>
                                  <select
                                    value={booking.status}
                                    onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                                    className="form-select"
                                  >
                                    {statusOptions.map(option => (
                                      <option key={option.value} value={option.value}>
                                        {option.label}
                                      </option>
                                    ))}
                                  </select>
                                </td>
                                <td>
                                  <button
                                    onClick={() => handleViewBooking(booking._id)}
                                    className="has-icon btn btn-success m-1"
                                  >
                                    <i className="me-100 fas fa-eye" />
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="11">No bookings found</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
                <div className="card-footer text-right">
                  <nav className="d-inline-block">
                    <ul className="pagination mb-0">
                      <li className="page-item disabled">
                        <a className="page-link" href="#" tabIndex={-1}>
                          <i className="fas fa-chevron-left" />
                        </a>
                      </li>
                      <li className="page-item active">
                        <a className="page-link" href="#">
                          1 <span className="sr-only">(current)</span>
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          2
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          3
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          <i className="fas fa-chevron-right" />
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default BookingList;
