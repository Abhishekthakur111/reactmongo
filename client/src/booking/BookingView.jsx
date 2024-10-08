import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';


const BASE_URL = "http://localhost:8000";

const BookingView = () => {
  const { _id } = useParams(); 
  const [booking, setBooking] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooking = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/booking/${_id}`);
        if (response.data.success) {
          setBooking(response.data.body);
        } else {
          setError("Failed to fetch booking data.");
        }
      } catch (err) {
        setError("Error fetching booking data.");
        console.error("Error fetching booking:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [_id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      
      <div id="app">
        <div className="main-content">
          <section className="section">
            <div className="section-header">
              <h1> Details</h1>
            </div>
            <div className="section-body">
              <div className="row">
                <div className="col-12 col-md-12 col-lg-12">
                  <div className="card">
                    <div className="card-body">
                    <div className="form-group">
                        <label>Customer Name</label>
                        <input
                          type="text"
                          id="userName"
                          className="form-control"
                          value={booking.user_id?.name || "Unknown"}
                          readOnly
                        />
                      </div>
                      <div className="form-group">
                        <label>Service Name</label>
                        <input
                          type="text"
                          id="serviceName"
                          className="form-control"
                          value={booking.service_id?.name || "Unknown"}
                          readOnly
                        />
                      </div>
                      <div className="form-group">
                        <label>Car Name</label>
                        <input
                          type="text"
                          id="carName"
                          className="form-control"
                          value={booking.car_id?.carname || "Unknown"}
                          readOnly
                        />
                      </div>
                      <div className="form-group">
                        <label>Model</label>
                        <input
                          type="text"
                          id="model"
                          className="form-control"
                          value={booking.car_id?.model || "Unknown"}
                          readOnly
                        />
                      </div>
                      <div className="form-group">
                        <label>Booking Code</label>
                        <input
                          type="text"
                          className="form-control"
                          id="bookingCode"
                          value={booking.booking_code || "N/A"}
                          readOnly
                        />
                      </div>
                      <div className="form-group">
                        <label>No of Booking</label>
                        <input
                          type="text"
                          id="noOfBooking"
                          className="form-control"
                          value={booking.no_of_booking || "N/A"}
                          readOnly
                        />
                      </div>
                      <div className="form-group">
                        <label>Date</label>
                        <input
                          type="text"
                          id="date"
                          className="form-control"
                          value={new Date(booking.date).toLocaleDateString() || "N/A"}
                          readOnly
                        />
                      </div>
                      <div className="form-group">
                        <label>Location</label>
                        <input
                          type="text"
                          id="location"
                          className="form-control"
                          value={booking.location || "N/A"}
                          readOnly
                        />
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                        <textarea
                          id="description"
                          className="form-control"
                          rows="3"
                          value={booking.description || "N/A"}
                          readOnly
                        />
                      </div>
                      <div className="form-group">
                        <label>Amount</label>
                        <input
                          type="text"
                          id="amount"
                          className="form-control"
                          value={`$${booking.amount || "N/A"}`}
                          readOnly
                        />
                      </div>
                     

                     
                    </div>
                    <div className="card-footer text-right">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => navigate(-1)}
                      >
                        Back
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default BookingView;
