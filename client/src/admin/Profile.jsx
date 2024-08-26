import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    phone_no: '',
    address: '',
    image: ''
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      try {
        const response = await axios.get('http://localhost:8000/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && response.data.body) {
          setData(response.data.body);
          const imageUrl = response.data.body.image.startsWith('http')
            ? response.data.body.image 
            : `http://localhost:8000/${response.data.body.image}`;
          setImagePreview(imageUrl);
        }
      } catch (error) {
        console.error("Error fetching profile data", error);
        toast.error("Error fetching profile data");
      }
    };

    fetchProfileData();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone_no', data.phone_no);
    formData.append('address', data.address);
    if (selectedImage) {
      formData.append('image', selectedImage);
    }

    try {
      await axios.post('http://localhost:8000/profileupdate', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success("Profile updated successfully");
      navigate('/Dashboard');
    } catch (error) {
      console.error("Error updating profile", error);
      toast.error("Error updating profile");
    }
  };

  return (<div id="app">
   <div id="app">
  <div className="main-wrapper">
    <div className="navbar-bg" />
    <div className="main-content">
      <section className="section">
        <div className="section-header">
          <h1>Profile</h1>
        </div>
        <div className="content-body">
          <section className="app-user-edit">
            <form
              onSubmit={handleSubmit}
              className="form-validate"
              noValidate
              encType="multipart/form-data"
            >
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body py-4">
                      <div className="tab-content">
                        <div
                          className="tab-pane active"
                          id="account"
                          aria-labelledby="account-tab"
                          role="tabpanel"
                        >
                          <div className="col-md-3 mx-auto">
                            <div className="mb-3">
                              {imagePreview && (
                                <img
                                  src={imagePreview}
                                  alt="Preview"
                                  className="img-thumbnail"
                                  style={{
                                    marginBottom: "20px",
                                    width: "300px",
                                    height: "200px",
                                    
                                  }}
                                />
                              )}
                              <input
                                type="file"
                                className="form-control"
                                id="image"
                                onChange={handleImageChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="mb-3">
                              <label className="form-label" htmlFor="name">
                                Name
                              </label>
                              <input
                                required
                                className="form-control"
                                placeholder="Name"
                                name="name"
                                id="name"
                                value={data.name}
                                onChange={(e) =>
                                  setData((prevData) => ({
                                    ...prevData,
                                    name: e.target.value,
                                  }))
                                }
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="mb-3">
                              <label className="form-label" htmlFor="email">
                                E-mail
                              </label>
                              <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                name="email"
                                id="email"
                                value={data.email}
                                onChange={(e) =>
                                  setData((prevData) => ({
                                    ...prevData,
                                    email: e.target.value,
                                  }))
                                }
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="mb-3">
                              <label className="form-label" htmlFor="phone_no">
                                Phone No
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Phone No"
                                name="phone_no"
                                id="phone_no"
                                value={data.phone_no}
                                onChange={(e) =>
                                  setData((prevData) => ({
                                    ...prevData,
                                    phone_no: e.target.value,
                                  }))
                                }
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="mb-3">
                              <label className="form-label" htmlFor="address">
                                Address
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Address"
                                name="address"
                                id="address"
                                value={data.address}
                                onChange={(e) =>
                                  setData((prevData) => ({
                                    ...prevData,
                                    address: e.target.value,
                                  }))
                                }
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                          <div className="d-flex justify-content-end mt-3">
                            <button
                              type="submit"
                              className="btn btn-primary"
                            >
                              Update
                            </button>
                          </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </section>
        </div>
      </section>
    </div>
  </div>
</div>

  </div>
  


  );
};

export default Profile;
