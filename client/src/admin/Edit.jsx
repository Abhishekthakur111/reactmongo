import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Edit() {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    address: "",
    phone_no: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null); 

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post(`http://localhost:8000/user_edit/${_id}`);
        if (response.data.success) {
          setData(response.data.body);
          if (response.data.body.image) {
            setImagePreview(`http://localhost:8000/${response.data.body.image}`);
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }

    fetchData();
  }, [_id]);

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
    formData.append('email', data.email);
    formData.append('address', data.address);
    formData.append('phone_no', data.phone_no);
    if (data.image) {
      formData.append('image', data.image);
    }

    try {
      const response = await axios.post(`http://localhost:8000/user_edit/${_id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.success) {
        navigate('/Userlist');
      } else {
        console.error("Update failed:", response.data.message);
      }
    } catch (error) {
      console.error("Request failed:", error.message);
    }
  };

  return (
    <div>
      <div id="app">
        <div className="main-wrapper">
          <div className="navbar-bg" />
          <div className="main-content">
            <section className="section">
              <div className="section-header">
                <h1>Edit User Detail</h1>
                <div className="section-header-breadcrumb"></div>
              </div>
              <div className="section-body">
                <div className="row">
                  <div className="col-12 col-md-12 col-lg-12">
                    <div className="card">
                      <form onSubmit={handleSubmit}>
                        <div className="card-body">
                        <div className="form-group col-3 mx-auto">
                            <div className="admin_profile" data-aspect="1/1">
                              {imagePreview && <img src={imagePreview} alt="Profile" id="profileImage"  style={{
                                paddingBottom: "20px",
                                width: "265px",
                                height: "200px",
                              
                              }}  />}
                              
                              <input
                                type="file"
                                id="image"
                                className="form-control"
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="form-group">
                          <label htmlFor="name">Name</label>
                            <input
                              type="text"
                              className="form-control"
                              required
                              id="name"
                              value={data.name}
                              onChange={handleChange}
                            />
                          </div>
                        
                          <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                              type="email"
                              id="email"
                              className="form-control"
                              value={data.email}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input
                              type="text"
                              id="address"
                              className="form-control"
                              value={data.address}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="phone_no">Phone Number</label>
                            <input
                              type="text"
                              id="phone_no"
                              className="form-control"
                              value={data.phone_no}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="card-footer text-right">
                        <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => navigate(-1)}
                        style={{ marginRight: "10px" }}
                      >
                        Back
                      </button>
                          <button type="submit" className="btn btn-primary">
                            Update
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
  );
}

export default Edit;
