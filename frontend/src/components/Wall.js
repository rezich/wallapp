import React, { Component } from 'react';
//import PropTypes from 'prop-types';

function Wall(props) {
  const posts = props.posts;
  return (
    <ul id="wall">
    {posts.map(post => (
      <li key={post.id}>
        {post.body_text}
      </li>
    ))}
  </ul>
  );
}

export default Wall;
