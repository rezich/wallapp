import React from 'react';
import { Link } from "react-router-dom";
//import PropTypes from 'prop-types';

const NotFound = () => {
  return (
    <div>
        <h1>Sorry, that page doesn't exist!</h1>
        <p><Link to='/'>Return to the homepage</Link></p>
    </div>
  );
};

export default NotFound;
