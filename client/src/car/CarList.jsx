import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = 'http://localhost:8000';

const CarList = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/carlist`, {
        params: { page: currentPage, size: pageSize }
      });

      if (response.data.success) {
        setCars(response.data.body.cars || []);
        setTotalPages(response.data.body.pagination.totalPages || 1);
      } else {
        toast.error('Failed to fetch cars');
      }
    } catch (error) {
      console.error('Error fetching car data:', error);
      toast.error('An error occurred while fetching cars');
    } finally {
      setLoading(false);
    }
  };

  const deleteCar = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be reverted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${BASE_URL}/delete/${id}`);
        fetchData();
        Swal.fire('Deleted!', 'The car has been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting car:', error);
        Swal.fire(
          'Error!',
          error.response?.data?.message || 'Error deleting car',
          'error'
        );
      }
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);  
  };

  const filteredCars = cars.filter((car) =>
    (car?.carname || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} />
      <div id="app">
        <div className="main-content">
          <section className="section">
            <div className="section-header">
              <h1>Cars</h1>
              <div className="ml-auto d-flex align-items-center">
                <button
                  className="btn btn-primary mr-2"
                  onClick={() => navigate('/createcar')}
                >
                  Add
                </button>
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
                            <th>Sr. No</th>
                            <th>Image</th>
                            <th>Car Name</th>
                            <th>Model</th>
                            <th>Color</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredCars.length > 0 ? (
                            filteredCars.map((car, index) => (
                              <tr key={car._id}>
                                <td>{(currentPage - 1) * pageSize + index + 1}</td>
                                <td>
                                  {car.image ? (
                                    <img
                                      src={`${BASE_URL}/${car.image}`}
                                      alt={car.carname || 'Car Image'}
                                      style={{ width: '60px', height: '40px', borderRadius: '50%' }}
                                    />
                                  ) : (
                                    'No Image'
                                  )}
                                </td>
                                <td>{car.carname || 'Unknown Car Name'}</td>
                                <td>{car.model || 'Unknown Model'}</td>
                                <td>{car.color || 'Unknown Color'}</td>
                                <td>
                                  <button
                                    onClick={() => navigate(`/carview/${car._id}`)}
                                    className="btn btn-success m-1"
                                  >
                                    <i className="fas fa-eye" />
                                  </button>
                                  <button
                                    onClick={() => deleteCar(car._id)}
                                    className="btn btn-danger m-1"
                                  >
                                    <i className="fas fa-trash" />
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="6" className="text-center">
                                No cars found.
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
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          <i className="fas fa-chevron-left" />
                        </button>
                      </li>
                      {[...Array(totalPages)].map((_, index) => (
                        <li
                          key={index + 1}
                          className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                        >
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(index + 1)}
                          >
                            {index + 1}
                          </button>
                        </li>
                      ))}
                      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          <i className="fas fa-chevron-right" />
                        </button>
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

export default CarList;
