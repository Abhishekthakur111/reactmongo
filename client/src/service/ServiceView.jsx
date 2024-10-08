import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:8000";

const ServiceView = () => {
  const { _id } = useParams();
  const [service, setService] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchService() {
      try {
        const response = await axios.get(`${BASE_URL}/service/${_id}`);
        
        if (response.data.success) {
          setService(response.data.body);
        } else {
          setError("Failed to fetch service data.");
        }
      } catch (err) {
        setError("Error fetching service data.");
        console.error("Error fetching service:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchService();
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
                      <div className="form-group mx-auto">
                        {service.image ? (
                          <div className="image-container">
                            <img
                              src={`${BASE_URL}/${service.image}`}
                              alt={service.name}
                              style={{
                                marginLeft: "auto",
                                marginRight: "auto",
                                width: "200px",
                                height: "200px",
                                objectFit: "cover",
                                borderRadius: "50%",
                                display: "block",
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
                          value={service.name || ""}
                          readOnly
                        />
                      </div>
                      <div className="form-group">
                        <label>Category</label>
                        <input
                          type="text"
                          id="category"
                          className="form-control"
                          value={service.cat_id?.name || "Unknown"}
                          readOnly
                        />
                      </div>
                      <div className="form-group">
                        <label>Price</label>
                        <input
                          type="text"
                          id="price"
                          className="form-control"
                          value={`$${service.price || "N/A"}`}
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
};

export default ServiceView;
