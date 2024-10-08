import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:8000";

const CategeoryView = () => {
  const { _id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/viewcategeory/${_id}`);
        if (response.data.success) {
          setData(response.data.body);
        } else {
          setError("Failed to fetch category data.");
        }
      } catch (error) {
        setError("Error fetching category data.");
        console.error("Error fetching category:", error);
      } finally {
        setLoading(false);
      }
    };

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
              <h1> Details</h1>
            </div>
            <div className="section-body">
              <div className="row">
                <div className="col-12 col-md-12 col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="form-group mx-auto">
                        {data.image && (
                          <div className="image-container">
                            <img
                              src={`${BASE_URL}${data.image}`}
                              alt="Category"
                              style={{
                                marginLeft: "500px",
                                width: "200px",
                                height: "200px",
                                objectFit: "cover",
                                borderRadius: "50%",
                              }}
                            />
                          </div>
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
                      {/* <div className="form-group">
                        <label>Description</label>
                        <input
                          type="text"
                          id="description"
                          className="form-control"
                          value={data.description || ""}
                          readOnly
                        />
                      </div> */}
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

export default CategeoryView;
