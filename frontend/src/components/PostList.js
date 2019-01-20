import React from 'react';
import { Link } from "react-router-dom";
//import PropTypes from 'prop-types';

function PostList(props) {
  const posts = props.posts;
  return (
    <div className="post-list">
    {posts.map(post => (
      <div className="post" key={post.id}>
        <div className="post-body">{post.body_text}</div>
        <div className="post-author">&ndash;<Link to={`/user/${post.author}/`}>{post.author}</Link></div>
        <div><Link to={`/post/${post.id}/`}>#{post.id}</Link></div>
      </div>
    ))}
  </div>
  );
}

export default PostList;
