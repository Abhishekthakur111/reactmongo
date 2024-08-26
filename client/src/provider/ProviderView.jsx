import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:8000";

function ProviderView() {
  const { _id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${BASE_URL}/view/${_id}`);
        if (response.data.success) {
          setData(response.data.body);
        } else {
          setError("Failed to fetch provider data.");
        }
      } catch (err) {
        setError("Error fetching provider data.");
        console.error("Error fetching provider:", err);
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
              <h1>Provider Details</h1>
            </div>
            <div className="section-body">
              <div className="row">
                <div className="col-12 col-md-12 col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="form-group mx-auto">
                        {data.image ? (
                          <div className="image-container">
                            <img
                              src={`${BASE_URL}${data.image}`}
                              alt="Provider"
                              style={{
                                marginLeft: "500px",
                                width: "200px",
                                height: "200px",
                                objectFit: "cover",
                                borderRadius: "50%",
                              }}
                            />
                          </div>
                        ) : (
                          <p>No image available</p>
                        )}
                      </div>
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
                        <label>Address</label>
                        <input
                          type="text"
                          id="address"
                          className="form-control"
                          value={data.address || ""}
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

export default ProviderView;
