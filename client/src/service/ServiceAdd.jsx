import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ServiceAdd = () => {
  const [data, setData] = useState({
    cat_id: '',
    name: '',
    price: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {

    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files.length > 0) {
      const file = files[0];
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file.');
        return;
      }
      setData((prevData) => ({
        ...prevData,
        [name]: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('cat_id', data.cat_id);
    formData.append('name', data.name);
    formData.append('price', data.price);
    if (data.image) {
      formData.append('image', data.image);
    }

    try {
      const response = await axios.post('http://localhost:8000/createservice', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setData({
          cat_id: "",
          name: "",
          price: "",
          image: null,
        });
        setImagePreview(null); 
        toast.success('Service added successfully!');
        navigate('/services');
      } else {
        toast.error(`Service creation failed: ${response.data.message}`);
      }
    } catch (error) {
      toast.error(`Request failed: ${error.message}`);
    }
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
      <div className="main-wrapper">
        <div className="navbar-bg" />
        <div className="main-content">
          <section className="section">
            <div className="section-header">
              <h1>Add New Service</h1>
            </div>
            <div className="section-body">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <form onSubmit={handleSubmit}>
                      <div className="card-body">
                        <div className="form-group col-3 mx-auto">
                          <div className="admin_profile" data-aspect="1/1">
                            {imagePreview && (
                              <img
                                src={imagePreview}
                                alt="Preview"
                                style={{
                                  paddingBottom: '20px',
                                  width: '265px',
                                  height: '200px',
                                }}
                              />
                            )}
                            <input
                              type="file"
                              name="image"
                              className="form-control"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="cat_id">Category ID</label>
                          <input
                            type="text"
                            className="form-control"
                            required
                            name="cat_id"
                            value={data.cat_id}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="name">Name</label>
                          <input
                            type="text"
                            className="form-control"
                            required
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="price">Price</label>
                          <input
                            type="number"
                            className="form-control"
                            required
                            name="price"
                            value={data.price}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="card-footer text-right">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => navigate(-1)}
                          style={{ marginRight: '10px' }}
                        >
                          Back
                        </button>
                        <button type="submit" className="btn btn-primary">
                          Add 
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ServiceAdd;
