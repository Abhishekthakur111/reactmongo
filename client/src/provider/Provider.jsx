import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = "http://localhost:8000";

const Provider = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [providers, setProviders] = useState([]);
  const [pagination, setPagination] = useState({
    totalCount: 0,
    totalPages: 0,
    currentPage: 1,
    pageSize: 5
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [pagination.currentPage]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/provider`, {
        params: {
          page: pagination.currentPage,
          size: pagination.pageSize
        }
      });

      if (response.data.success) {
        setProviders(response.data.body.data);
        setPagination({
          ...pagination,
          totalCount: response.data.body.pagination.totalCount,
          totalPages: response.data.body.pagination.totalPages
        });
      } else {
        toast.error("Failed to fetch providers");
      }
    } catch (error) {
      console.error("Error fetching provider data:", error);
      toast.error("An error occurred while fetching providers");
    } finally {
      setLoading(false);
    }
  };

  const deleteProvider = async (id) => {
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
        Swal.fire("Deleted!", "The provider has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting provider:", error);
        Swal.fire(
          "Error!",
          error.response?.data?.message || "Error deleting provider",
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
          `Provider status changed to ${newStatus === "1" ? "Active" : "InActive"}`
        );
      } else {
        toast.error(response.data.message || "Failed to change status");
      }
    } catch (error) {
      console.error("Error changing provider status:", error);
      toast.error("An error occurred while changing provider status");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  const filteredProviders = providers.filter(provider =>
    provider.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} />
      <div id="app">
        <div className="main-content">
          <section className="section">
            <div className="section-header">
              <h1>Providers</h1>
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
                          {filteredProviders.length > 0 ? (
                            filteredProviders.map((provider, index) => (
                              <tr key={provider._id}>
                                <td>{(pagination.currentPage - 1) * pagination.pageSize + index + 1}</td>
                                <td>
                                  {provider.image ? (
                                    <img
                                      src={`${BASE_URL}/${provider.image}`}
                                      alt={`${provider.image}`}
                                      style={{
                                        width: "50px",
                                        height: "50px",
                                        borderRadius: "50%"
                                      }}
                                    />
                                  ) : (
                                    "No Image"
                                  )}
                                </td>
                                <td>{provider.name}</td>
                                <td>{provider.email}</td>
                                <td>{provider.address}</td>
                                <td>{provider.phone_no}</td>
                                <td>
                                  <button
                                    className={`btn ${
                                      provider.status === "1"
                                        ? "btn-success"
                                        : "btn-danger"
                                    }`}
                                    onClick={() =>
                                      toggleStatus(provider._id, provider.status)
                                    }
                                  >
                                    {provider.status === "1"
                                      ? "Active"
                                      : "Inactive"}
                                  </button>
                                </td>
                                <td>
                                  <button
                                    onClick={() =>
                                      navigate(`/providerview/${provider._id}`)
                                    }
                                    className="btn btn-success m-1"
                                  >
                                    <i className="fas fa-eye" />
                                  </button>

                                  <button
                                    onClick={() => deleteProvider(provider._id)}
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
                                No providers found.
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
                      <li className={`page-item ${pagination.currentPage === 1 ? 'disabled' : ''}`}>
                        <a
                          className="page-link"
                          href="#"
                          onClick={() => handlePageChange(pagination.currentPage - 1)}
                        >
                          <i className="fas fa-chevron-left" />
                        </a>
                      </li>
                      {Array.from({ length: pagination.totalPages }, (_, i) => (
                        <li
                          key={i + 1}
                          className={`page-item ${pagination.currentPage === i + 1 ? 'active' : ''}`}
                        >
                          <a
                            className="page-link"
                            href="#"
                            onClick={() => handlePageChange(i + 1)}
                          >
                            {i + 1}
                          </a>
                        </li>
                      ))}
                      <li className={`page-item ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}`}>
                        <a
                          className="page-link"
                          href="#"
                          onClick={() => handlePageChange(pagination.currentPage + 1)}
                        >
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

export default Provider;
