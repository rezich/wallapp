import React from 'react';
import { Link } from "react-router-dom";
//import PropTypes from 'prop-types';

const PostDetail = ({ match }) => {
  const id = match.params.id;
  const body_text = match.params.body_text;
  return (
    <div>
      <h1>Post #{id}</h1>
      <p>{body_text}</p>
    </div>
  );
};

export default PostDetail;
