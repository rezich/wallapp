import React, { Component } from 'react';
import { Route, Link, Switch } from "react-router-dom";
import Nav from './components/Nav';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import PostList from './components/PostList';
import NewPostForm from './components/NewPostForm';
import UserDetail from './components/UserDetail';
import PostDetail from './components/PostDetail';
import NotFound from './components/NotFound';
import './App.css';

function handle_errors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

class App extends Component {
  constructor(props) {
    super(props);
    document.title = "WallApp";
    this.state = {
      displayed_form: '',
      logged_in: localStorage.getItem('token') ? true : false,
      username: '',
      posts: []
    };
  }

  componentDidMount() {
    if (this.state.logged_in) {
      fetch('http://localhost:8000/api/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({ username: json.username });
        });
    }
    this.get_posts();
  }

  handle_login = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/api/auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(handle_errors)
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.user.username,
          refresh_wall: true
        });
      });
  };

  handle_signup = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(handle_errors)
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.username,
          refresh_wall: true
        });
      });
  };

  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ logged_in: false, username: '' });
  };
  
  handle_post = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/api/posts/', {
      method: 'POST',
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(handle_errors)
      .then(() => {
        this.get_posts();
      });
  };

  get_posts() {
    fetch("http://localhost:8000/api/posts/")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          posts: result
        })
      },
      (error) => {
      }
    )
  };

  display_form = form => {
    this.setState({
      displayed_form: form
    });
  };

  render() {
    let nav_form;
    const username = this.state.logged_in ? this.state.username : '';
    const new_post_form = this.state.logged_in ? (
      <NewPostForm
          handle_post={this.handle_post}
      />
    ) : '';
    switch (this.state.displayed_form) {
      case 'login':
        nav_form = <LoginForm handle_login={this.handle_login} />;
        break;
      case 'signup':
        nav_form = <SignupForm handle_signup={this.handle_signup} />;
        break;
      default:
        nav_form = null;
    }

    return (
      <div className="App">
        <h1><Link to={`/`}>WallApp</Link></h1>
        <Nav
          logged_in={this.state.logged_in}
          display_form={this.display_form}
          handle_logout={this.handle_logout}
          username={username}
        />
        {nav_form}
        {new_post_form}
        <Switch>
          <Route
            exact
            path='/'
            render={props => <PostList posts={this.state.posts} />}
          />
          <Route
            path={`/user/:username`}
            component={UserDetail}
          />
          <Route
            path={`/post/:id`}
            component={PostDetail}
          />
          <Route
            component={NotFound}
          />`
        </Switch>
      </div>
    );
  }
}

export default App;
