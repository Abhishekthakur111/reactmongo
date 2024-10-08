import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:8000";

const CarView = () => {
  const { _id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${BASE_URL}/carview/${_id}`);
        if (response.data.success) {
          setData(response.data.body);
        } else {
          setError("Failed to fetch car data.");
        }
      } catch (err) {
        setError("Error fetching car data.");
        console.error("Error fetching car:", err);
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
                      <div className="form-group mx-auto">
                        {data.image ? (
                          <div className="image-container">
                            <img
                              src={`${BASE_URL}${data.image}`}
                              alt="Car"
                              style={{
                                marginLeft: "500px",
                                width: "200px",
                                height: "200px",
                                // objectFit: "cover",
                                borderRadius: "50%",
                              }}
                            />
                          </div>
                        ) : (
                          <p>No image available</p>
                        )}
                      </div>
                      <div className="form-group">
                        <label>Car Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          value={data.carname || ""}
                          readOnly
                        />
                      </div>
                      <div className="form-group">
                        <label>Model</label>
                        <input
                          type="text"
                          id="model"
                          className="form-control"
                          value={data.model || ""}
                          readOnly
                        />
                      </div>
                      <div className="form-group">
                        <label>Color</label>
                        <input
                          type="text"
                          id="color"
                          className="form-control"
                          value={data.color || ""}
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

export default CarView;
