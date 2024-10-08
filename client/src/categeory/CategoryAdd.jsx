import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CategoryAdd = () => {
  const [data, setData] = useState({
    name: '',
    image: null, 
  });
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (id === 'image' && files.length > 0) {
      setData((prevData) => ({
        ...prevData,
        [id]: files[0],
      }));
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', data.name);
    if (data.image) {
      formData.append('image', data.image);
    }

    try {
      const response = await axios.post('http://localhost:8000/createcategory', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast.success('Category added successfully!');
        console.log('Toast for success triggered')
        navigate('/categeorylist');
      } else {
        toast.error('Category creation failed: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Request failed: ' + error.message);
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
      <div>
        <div id="app">
          <div className="main-wrapper">
            <div className="navbar-bg" />
            <div className="main-content">
              <section className="section">
                <div className="section-header">
                  <h1>Add New Category</h1>
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
                                  id="image"
                                  className="form-control"
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                            <div className="form-group">
                              <label htmlFor="name">Category Name</label>
                              <input
                                type="text"
                                className="form-control"
                                required
                                id="name"
                                value={data.name}
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
        </div>
      </div>
    </>
  );
};

export default CategoryAdd;
