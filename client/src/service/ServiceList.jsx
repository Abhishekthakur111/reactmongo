import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = "http://localhost:8000";

const ServiceList = () => {
    const [services, setServices] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/services`, {
                params: { page: currentPage, size: pageSize },
            });

            if (response.data.success) {
                setServices(response.data.body.data);
                setTotalPages(response.data.body.pagination.totalPages);
            } else {
                Swal.fire("Error", response.data.message || "Failed to load services", "error");
            }
        } catch (error) {
            console.error("Error fetching service list", error);
            Swal.fire("Error", error.response?.data?.message || "An error occurred while fetching the service list", "error");
        } finally {
            setLoading(false);
        }
    };

    const toggleStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === "0" ? "1" : "0";

        try {
            const response = await axios.post(`${BASE_URL}/status`, {
                id,
                status: newStatus,
            });

            if (response.data.success) {
                fetchData();
                toast.success(`Service status changed to ${newStatus === "0" ? "Active" : "Inactive"}`);
            } else {
                toast.error(response.data.message || "Failed to change status");
            }
        } catch (error) {
            toast.error("An error occurred while changing status");
        }
    };

    const deleteService = async (_id) => {
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
                await axios.delete(`${BASE_URL}/delete_service/${_id}`);
                fetchData();
                Swal.fire("Deleted!", "Service has been deleted.", "success");
            } catch (error) {
                Swal.fire("Error!", error.response?.data?.message || "Error deleting service", "error");
            }
        } else {
            Swal.fire("Cancelled", "Service deletion has been cancelled", "info");
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredServices = services.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddService = () => {
        navigate('/createservice');
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
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
                            <h1>Services</h1>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <button
                                    onClick={handleAddService}
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
                                    {loading ? (
                                        <p>Loading...</p>
                                    ) : (
                                        <div className="table-responsive">
                                            <table className="table table-bordered table-md">
                                                <thead>
                                                    <tr>
                                                        <th>Sr_No.</th>
                                                        <th>Category Name</th>
                                                        <th>Name</th>
                                                        <th>Price</th>
                                                        <th>Image</th>
                                                        <th>Status</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredServices.length ? (
                                                        filteredServices.map((service, index) => (
                                                            <tr key={service._id}>
                                                                <td>{(currentPage - 1) * pageSize + index + 1}</td>
                                                                <td>{service.cat_id?.name || "Unknown"}</td>
                                                                <td>{service.name}</td>
                                                                <td>${service.price}</td>
                                                                <td>
                                                                    {service.image ? (
                                                                        <img
                                                                            src={`${BASE_URL}/${service.image}`}
                                                                            alt={service.name}
                                                                            onError={(e) => e.target.src = 'path/to/default/image.jpg'}
                                                                            style={{ width: "50px", height: "50px", borderRadius: '50%' }}
                                                                        />
                                                                    ) : (
                                                                        "No Image"
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    <button
                                                                        className={`has-icon btn ${
                                                                            service.status === "0" ? "btn-success" : "btn-danger"
                                                                        }`}
                                                                        onClick={() => toggleStatus(service._id, service.status)}
                                                                    >
                                                                        {service.status === "0" ? "Active" : "Inactive"}
                                                                    </button>
                                                                </td>
                                                                <td>
                                                                    <button
                                                                        onClick={() => navigate(`/service/${service._id}`)}
                                                                        className="has-icon btn btn-success m-1"
                                                                    >
                                                                        <i className="me-100 fas fa-eye" />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => deleteService(service._id)}
                                                                        className="has-icon btn btn-danger m-1 text-dark"
                                                                    >
                                                                        <i className="me-100 fas fa-trash" />
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="7">No services found</td>
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
                                            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                                <a className="page-link" href="#" onClick={() => handlePageChange(currentPage - 1)}>
                                                    <i className="fas fa-chevron-left" />
                                                </a>
                                            </li>
                                            {Array.from({ length: totalPages }, (_, index) => (
                                                <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                                                    <a className="page-link" href="#" onClick={() => handlePageChange(index + 1)}>
                                                        {index + 1}
                                                        {currentPage === index + 1 && <span className="sr-only">(current)</span>}
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

export default ServiceList;
