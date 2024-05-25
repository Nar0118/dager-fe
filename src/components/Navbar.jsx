import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <h2>Car Catalogue</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/catalogue">Catalogue</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
