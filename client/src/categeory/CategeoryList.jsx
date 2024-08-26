import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = "http://localhost:8000";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/catergeorylist`);
      if (response.data.success) {
        setCategories(response.data.body);
      } else {
        Swal.fire("Error", response.data.message || "Failed to load categories", "error");
      }
    } catch (error) {
      console.error("Error fetching category list", error);
      Swal.fire("Error", "An error occurred while fetching the category list", "error");
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
        await axios.delete(`${BASE_URL}/delete_categeory/${_id}`);
        fetchData();
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
      const response = await axios.post(`${BASE_URL}/categorystatus`, {
        id,
        status: newStatus,
      });

      if (response.data.success) {
        fetchData();
        toast.success(`Category status changed to ${newStatus === "0" ? "Active" : "Inactive"}`);
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

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCategory = () => {
    navigate('/createcategory'); 
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
              <h1>Category List</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button
                  onClick={handleAddCategory}
                  className="btn btn-primary"
                >
                  Add
                </button>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by Name"
                  value={searchTerm}
                  onChange={handleSearch}
                  style={{ flex: 1 }}
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
                          <th>Name</th>
                          <th>Image</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCategories.map((category, index) => (
                          <tr key={category._id}>
                            <td>{index + 1}</td>
                            <td>{category.name}</td>
                            <td>
                              {category.image ? (
                                <img
                                  src={`${BASE_URL}/${category.image}`}
                                  alt={category.name}
                                  style={{ width: "50px", height: "50px", borderRadius: '50%' }}
                                />
                              ) : (
                                "No Image"
                              )}
                            </td>
                            <td>
                              <button
                                className={`has-icon btn btn-success  ${
                                  category.status === "0" ? "btn-success" : "btn-danger"
                                }`}
                                onClick={() =>
                                  toggleStatus(category._id, category.status)
                                }
                              >
                                {category.status === "0" ? "Active" : "InActive"}
                              </button>
                            </td>
                            <td>
                              <button
                                onClick={() => navigate(`/viewcategeory/${category._id}`)}
                                className="has-icon btn btn-success m-1"
                              >
                                <i className="me-100 fas fa-eye" />
                              </button>

                              <button
                                onClick={() => deleteUser(category._id)}
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

export default CategoryList;
