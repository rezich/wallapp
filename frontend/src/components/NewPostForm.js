import React from 'react';
import PropTypes from 'prop-types';

class NewPostForm extends React.Component {
  state = {
    body_text: ''
  };

  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  reset() {
    this.setState({
     body_text: ''
   });
  }

  render() {
    return (
      <form
        id="new_post"
        onSubmit={e => {this.props.handle_post(e, this.state); this.reset(); }}>
        <input
          id="body_text"
          type="text"
          name="body_text"
          value={this.state.body_text}
          onChange={this.handle_change}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
}

export default NewPostForm;

NewPostForm.propTypes = {
  handle_post: PropTypes.func.isRequired
};
