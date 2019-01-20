import React from 'react';
import { Link } from "react-router-dom";
//import PropTypes from 'prop-types';

const UserDetail = ({ match }) => {
  const username = match.params.username;
  return (
    <div>
      <h1>User profile: {username}</h1>
    </div>
  );
};

export default UserDetail;
