import React, { useEffect, useState } from 'react'; 
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AboutUs = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const navigate = useNavigate();
    
    useEffect(()=>{
        const FetchAboutUs = async (req, res) =>{
            try {
                const response = await axios.get('http://localhost:8000/aboutus');
                const { data } = response.data;
        setTitle(data.title || '');
        setContent(data.content || '');
            } catch (error) {
               console.error('error fetching aboutus', error); 
            }
            
        };
        FetchAboutUs();
    }, []);
    const handleSubmit = async (event) => {
      event.preventDefault();
      if (content.trim() === '') {
          setError(true);
      } else {
          setError(false);
          try {
              await axios.post('http://localhost:8000/updateabout', { title, content });
              console.log('About Us page submitted');
              navigate('/Dashboard'); 
          } catch (error) {
              setSubmitError('Error submitting About Us page. Please try again.');
              console.error('Error submitting About Us page:', error);
          }
      }
  };
  
    return (
<div id="app">
  <div className="main-content">
    <section className="section">
      <div className="section-header">
        <h1>About Us</h1>
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
                    {error && (
                      <p className="text-danger">
                        Content cannot be empty.
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
</div>
    );
}

export default AboutUs;
