import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <br />
      <footer className="main-footer">
        <div className="footer-left">
          Copyright &copy; 2018 <div className="bullet"></div> Design By <Link to="/Dashboard">Abhishek Thakur</Link>
        </div>
        <div className="footer-right">
          2.3.0
        </div>
      </footer>
    </>
  );
}

export default Footer;
