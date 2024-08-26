import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = "http://localhost:8000";

const Workers = () => {
  const [loading, setLoading] = useState(true); 
  const [searchTerm, setSearchTerm] = useState("");
  const [workers, setWorkers] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/worker`); 
      if (response.data.success) {
        setWorkers(response.data.body); 
      } else {
        toast.error("Failed to fetch workers");
      }
    } catch (error) {
      console.error("Error fetching worker data:", error);
      toast.error("An error occurred while fetching workers");
    } finally {
      setLoading(false);
    }
  };

  const deleteWorker = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be reverted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${BASE_URL}/user_delete/${id}`); 
        fetchData();
        Swal.fire("Deleted!", "The worker has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting worker:", error);
        Swal.fire(
          "Error!",
          error.response?.data?.message || "Error deleting worker",
          "error"
        );
      }
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "1" ? "0" : "1";

    try {
      const response = await axios.post(`${BASE_URL}/userstatus`, { 
        id,
        status: newStatus,
      });

      if (response.data.success) {
        fetchData();
        toast.success(
          `Worker status changed to ${newStatus === "1" ? "Active" : "Inactive"}`
        );
      } else {
        toast.error(response.data.message || "Failed to change status");
      }
    } catch (error) {
      console.error("Error changing worker status:", error);
      toast.error("An error occurred while changing worker status");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredWorkers = workers.filter(worker =>
    worker.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} />
      <div id="app">
        <div className="main-content">
          <section className="section">
            <div className="section-header">
              <h1>Worker List</h1>
              <div className="ml-auto">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by Name"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
            <div className="section-body">
              <div className="card">
                <div className="card-body">
                  {loading ? (
                    <div className="text-center">Loading...</div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-bordered table-md">
                        <thead>
                          <tr>
                            <th>Sr. No.</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Phone No</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredWorkers.length > 0 ? (
                            filteredWorkers.map((worker, index) => (
                              <tr key={worker._id}>
                                <td>{index + 1}</td>
                                <td>
                                  {worker.image ? (
                                    <img
                                      src={`${BASE_URL}/${worker.image}`}
                                      alt={worker.image}
                                      style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                                    />
                                  ) : (
                                    "No Image"
                                  )}
                                </td>
                                <td>{worker.name}</td>
                                <td>{worker.email}</td>
                                <td>{worker.address}</td>
                                <td>{worker.phone_no}</td>
                                <td>
                                  <button
                                    className={`btn ${
                                      worker.status === "1"
                                        ? "btn-success"
                                        : "btn-danger"
                                    }`}
                                    onClick={() =>
                                      toggleStatus(worker._id, worker.status)
                                    }
                                  >
                                    {worker.status === "1"
                                      ? "Active"
                                      : "Inactive"}
                                  </button>
                                </td>
                                <td>
                                  <button
                                    onClick={() =>
                                      navigate(`/workerview/${worker._id}`)
                                    }
                                    className="btn btn-success m-1"
                                  >
                                    <i className="fas fa-eye" />
                                  </button>

                                  <button
                                    onClick={() => deleteWorker(worker._id)}
                                    className="btn btn-danger m-1"
                                  >
                                    <i className="fas fa-trash" />
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="8" className="text-center">
                                No workers found.
                              </td>
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

export default Workers;
