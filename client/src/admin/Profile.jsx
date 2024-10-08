import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenNib } from '@fortawesome/free-solid-svg-icons';

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
      navigate('/profile');
    } catch (error) {
      console.error("Error updating profile", error);
      toast.error("Error updating profile");
    }
  };

  return (
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
                    <div className="col-md-12">
                      <div className="card">
                        <div className="card-body py-4">
                          <div className="tab-content">
                            <div
                              className="tab-pane active"
                              id="account"
                              aria-labelledby="account-tab"
                              role="tabpanel"
                            >
                              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                               
                                <div style={{ flex: '0 0 auto', position: 'relative' }}>
                                  {imagePreview && (
                                    <>
                                      <img
                                        src={imagePreview}
                                        alt="Preview"
                                        style={{
                                          marginTop: "10px",
                                          marginBottom: "20px",
                                          width: "300px",
                                          height: "380px",
                                          objectFit: 'cover',
                                          borderRadius:"20px"
                                        }}
                                      />
                                      <label
                                        htmlFor="image"
                                        style={{
                                          position: 'absolute',
                                          bottom: "15px",
                                          right: "10px",
                                          cursor: "pointer",
                                        }}
                                      >
                                        <FontAwesomeIcon icon={faPenNib} size="lg" color="red" />
                                      </label>
                                    </>
                                  )}
                                  <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    id="image"
                                    onChange={handleImageChange}
                                  />
                                </div>
                                
                                <div style={{ flex: '1', marginLeft: '16px' }}>
                                  <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px' }} htmlFor="name">
                                      Name
                                    </label>
                                    <input
                                      required
                                      style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ced4da' }}
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
                                  <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px' }} htmlFor="email">
                                      E-mail
                                    </label>
                                    <input
                                      type="email"
                                      style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ced4da' }}
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
                                  <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px' }} htmlFor="phone_no">
                                      Phone No
                                    </label>
                                    <input
                                      type="text"
                                      style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ced4da' }}
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
                                  <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px' }} htmlFor="address">
                                      Address
                                    </label>
                                    <input
                                      type="text"
                                      style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ced4da' }}
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
                                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                                    <button
                                      type="submit"
                                      style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px' }}
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
                  </div>
                </form>
              </section>
            </div>
          </section>
        </div>
      </div>

       
    
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
    </div>
  );
};

export default Profile;
