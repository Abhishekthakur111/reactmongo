import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = "http://localhost:8000";

const Userlist = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(5); 
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page) => {
    try {
      const response = await axios.get(`${BASE_URL}/user_list`, {
        params: { page, size: pageSize }
      });

      if (response.data.success) {
        setUsers(response.data.body.data);
        setTotalPages(response.data.body.pagination.totalPages);
      } else {
        Swal.fire("Error", response.data.message || "Failed to load users", "error");
      }
    } catch (error) {
      console.error("Error fetching user list", error);
      Swal.fire("Error", "An error occurred while fetching the user list", "error");
    }
  };

  const deleteUser = async (_id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${BASE_URL}/user_delete/${_id}`);
        fetchData(currentPage);
        Swal.fire("Deleted!", "User has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error!", error.response?.data?.message || "Error deleting user", "error");
      }
    } else {
      Swal.fire("Cancelled", "User deletion has been cancelled", "info");
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "0" ? "1" : "0";

    try {
      const response = await axios.post(`${BASE_URL}/userstatus`, {
        id,
        status: newStatus,
      });

      if (response.data.success) {
        fetchData(currentPage);
        toast.success(`User status changed to ${newStatus === "0" ? "Active" : "Inactive"}`);
      } else {
        toast.error(response.data.message || "Failed to change status");
      }
    } catch (error) {
      toast.error("An error occurred while changing user status");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
            <div className="section-header">
              <h1>Users</h1>
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
                  <div className="table-responsive">
                    <table className="table table-bordered table-md">
                      <thead>
                        <tr>
                          <th>Sr_No.</th>
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
                        {filteredUsers.map((user, index) => (
                          <tr key={user._id}>
                            <td>{(currentPage - 1) * pageSize + index + 1}</td>
                            <td>
                            {user.image ? (
                              <img
                                src={`${BASE_URL}/${user.image}`}
                                alt={`${user.image}`}
                                style={{  width:"50px",
                                  height:"50px",
                                  borderRadius:'50%'
                                }}
                              />
                            ) : (
                              "No Image"
                            )}
                          </td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.address}</td>
                            <td>{user.phone_no}</td>
                            <td>
                              <button
                                className={`has-icon btn btn-success  ${
                                  user.status === "0" ? "btn-success" : "btn-danger"
                                }`}
                                onClick={() =>
                                  toggleStatus(user._id, user.status)
                                }
                              >
                                {user.status === "0" ? "Active" : "InActive"}
                              </button>
                            </td>
                            <td>
                              <button
                                onClick={() => navigate(`/viewuser/${user._id}`)}
                                className="has-icon btn btn-success m-1 text-danger"
                              >
                                <i className="me-100 fas fa-eye" />
                              </button>
                              <button
                                onClick={() => navigate(`/editUser/${user._id}`)}
                                className="has-icon btn btn-primary m-1"
                              >
                                <i className="me-100 fas fa-edit" />
                              </button>
                              <button
                                onClick={() => deleteUser(user._id)}
                                className="has-icon btn btn-danger m-1 text-dark"
                              >
                                <i className="me-100 fas fa-trash" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="card-footer text-right">
                  <nav className="d-inline-block">
                    <ul className="pagination mb-0">
                      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <a className="page-link" href="#" onClick={() => handlePageChange(currentPage - 1)}>
                          <i className="fas fa-chevron-left" />
                        </a>
                      </li>
                      {[...Array(totalPages).keys()].map(page => (
                        <li key={page} className={`page-item ${currentPage === page + 1 ? "active" : ""}`}>
                          <a className="page-link" href="#" onClick={() => handlePageChange(page + 1)}>
                            {page + 1}
                          </a>
                        </li>
                      ))}
                      <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                        <a className="page-link" href="#" onClick={() => handlePageChange(currentPage + 1)}>
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

export default Userlist;
