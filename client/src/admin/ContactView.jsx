import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:8000";

const ContactView = () => {
  const { _id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${BASE_URL}/viewcontact/${_id}`);
        if (response.data.success) {
          setData(response.data.body);
        } else {
          setError("Failed to fetch  data.");
        }
      } catch (error) {
        setError("Error fetching  data.");
        console.error("Error fetching ", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [_id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div id="app">
      <div className="main-wrapper">
        <div className="navbar-bg" />
        <div className="main-content">
          <section className="section">
            <div className="section-header">
              <h1>Details</h1>
            </div>
            <div className="section-body">
              <div className="row">
                <div className="col-12 col-md-12 col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="form-group">
                        <label>Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          value={data.name || ""}
                          readOnly
                        />
                      </div>
                     
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          type="email"
                          id="email"
                          className="form-control"
                          value={data.email || ""}
                          readOnly
                        />
                      </div>
                     
                      <div className="form-group">
                        <label>Phone Number</label>
                        <input
                          type="text"
                          id="phone_no"
                          className="form-control"
                          value={data.phone_no || ""}
                          readOnly
                        />
                      </div>
                      <div className="form-group">
                        <label>Message</label>
                        <input
                          type="text"
                          id="address"
                          className="form-control"
                          value={data.message || ""}
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
    </div>
  );
}

export default ContactView;
