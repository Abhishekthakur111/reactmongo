import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const Privacy = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      try {
        const response = await axios.get('http://localhost:8000/privacy');
        const { data } = response.data;
        setTitle(data.title || '');
        setContent(data.content || '<p><br></p>');
      } catch (error) {
        console.error('Error fetching privacy policy:', error);
      }
    };

    fetchPrivacyPolicy();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (content.trim() === "<p><br></p>") {
      setError('Privacy Policy cannot be empty.');
      return; 
    }

    setError(''); 
    setSubmitError(''); 

    try {
      await axios.post('http://localhost:8000/privacypolicy', { title, content });
      toast.success('Privacy policy updated successfully');
      navigate('/privacy');
    } catch (error) {
      setSubmitError('Error submitting privacy policy. Please try again.');
      toast.error('Error submitting privacy policy. Please try again.');
      console.error('Error submitting privacy policy:', error);
    }
  };

  return (
    <div id="app">
      <div className="main-content">
        <section className="section">
          <div className="section-header">
            <h1>Privacy Policy</h1>
          </div>
          <div className="section-body">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                          id="title"
                          type="text"
                          className="form-control"
                          value={title}
                          readOnly
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <div style={{ position: "relative" }}>
                          <ReactQuill
                            id="content"
                            style={{ height: "300px", marginBottom: "50px" }}
                            theme="snow"
                            value={content}
                            onChange={setContent}
                            modules={{
                              toolbar: [
                                [{ header: "1" }, { header: "2" }, { font: [] }],
                                [{ list: "ordered" }, { list: "bullet" }],
                                ["bold", "italic", "underline"],
                                [{ color: [] }, { background: [] }],
                                [{ align: [] }],
                                ["clean"],
                              ],
                            }}
                          />
                          {content.trim() === "<p><br></p>" && (
                            <div
                              style={{
                                position: "absolute",
                                top: 55,
                                left: 18,
                                right: 0,
                                bottom: 0,
                                // display: "flex",
                                // alignItems: "center",
                                // justifyContent: "center",
                                pointerEvents: "none",
                                color: "red",
                                fontStyle: "italic",
                              }}
                            >
                              Privacy Policy  cannot be empty.
                            </div>
                          )}
                        </div>
                        {error && (
                          <p className="text-danger">
                            {error}
                          </p>
                        )}
                        {submitError && (
                          <p className="text-danger">{submitError}</p>
                        )}
                      </div>
                      <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-success">
                          Update
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
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

export default Privacy;
