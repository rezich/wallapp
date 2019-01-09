import React from 'react';
import PropTypes from 'prop-types';

function Nav(props) {
  const username = props.username == null ? '' : props.username;
  const logged_out_nav = (
    <ul>
      <li onClick={() => props.display_form('login')}>login</li>
      <li onClick={() => props.display_form('signup')}>signup</li>
    </ul>
  );

  const logged_in_nav = (
    <ul>
      <li onClick={props.handle_logout}>logout</li>
    </ul>
  );
  return (
    <div id="nav">
      {username.length > 0 &&
        <b>logged in as {username}</b>
      }
      {props.logged_in ? logged_in_nav : logged_out_nav}
    </div>
  );
}

export default Nav;

Nav.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  display_form: PropTypes.func.isRequired,
  handle_logout: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};
