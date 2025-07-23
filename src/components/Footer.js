import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3">
      <div className="container">
        <small>© {new Date().getFullYear()} Bhavik Patel. All rights reserved.</small>
      </div>
    </footer>
  );
};

export default Footer;
