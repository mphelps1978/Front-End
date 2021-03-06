import React from "react";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import {Link} from 'react-router-dom';

class Login extends React.Component {
  state = {
    credentials: {
      username: "",
      password: ""
    }
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  login = e => {
    e.preventDefault();
    axios
      .post("https://choretracker01.herokuapp.com/api/auth/login", this.state.credentials)
      .then(res => {
        // console.log("login results: ", res);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("id", res.data.id)
        this.props.history.push("/dashboard");
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.login}>
          <input
            type="text"
            name="username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
          />
          <button>Log in</button>
        </form>
       <Typography>
                New User? <Link to="/register">Click Here</Link>
              </Typography>
      </div>
    );
  }
}

export default Login;
