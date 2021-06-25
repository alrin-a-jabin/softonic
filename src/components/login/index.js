import React, { Component } from "react";

import { Redirect } from "react-router-dom";

const data = {
  "username": "admin",
  "password": "password"
}
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      isAuthenticated: false,
      errorMessage: ""
    };
  }


  handleOnChange = (event) => {
    const { name, value } = event.currentTarget;
    const state = { ...this.state };
    state[name] = value;
    this.setState(state);
  };

  onSubmit = () => {
    if (this.state.userName === "" && this.state.password === "") {
      this.setState({ errorMessage: "Please enter all the fileds" })
    } else {
      if (this.state.userName === data.username && this.state.password === data.password) {
        this.setState({ isAuthenticated: true });
      }
    }
  };

  render() {
    const {
      handleOnChange,
      onSubmit,
      state: { userName, password, isAuthenticated },
    } = this;
    if (isAuthenticated) {
      return <Redirect to="/Dashboard" />;

    }

    return (
      <div>
        <section id="Login">
          <div className="Container">
            <div className="Login_card">
              <div className="card">
                <div className="text-center error Company_Logo mb-3">
                  {this.state.errorMessage}
                </div>
                <div className="email-login">
                  <form>
                    <input
                      value={userName}
                      name="userName"
                      placeholder="User Name"
                      type="text"
                      className="form-control"
                      onChange={handleOnChange}
                    />
                    <input
                      onChange={handleOnChange}
                      value={password}
                      name="password"
                      placeholder="Password"
                      type="Password"
                      className="form-control"
                    />
                  </form>
                </div>
                <span>
                  <button onClick={onSubmit} className="btn login-btn cta-btn">
                    Log In
                  </button>
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Login;
