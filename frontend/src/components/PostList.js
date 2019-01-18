import React, { Component } from 'react';
//import PropTypes from 'prop-types';

function Wall(props) {
  const posts = props.posts;
  return (
    <div id="wall">
    {posts.map(post => (
      <div class="post" key={post.id}>
        <div class="post-body">{post.body_text}</div>
        <div class="post-author">&ndash;{post.author}</div>
      </div>
    ))}
  </div>
  );
}

export default Wall;
