import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const onButtonClick = () => {
    setUsernameError("");
    setPasswordError("");

    if ("" === username) {
      setUsernameError("Please enter your username");
      return;
    }

    if ("" === password) {
      setPasswordError("Please enter a password");
      return;
    }

    if (password.length < 7) {
      setPasswordError("The password must be 8 characters or longer");
      return;
    }
/*
    checkAccountExists(accountExists => {
      if (accountExists) {
        logIn();
      }
      else if (window.confirm("There is no account with this username. Do you wish to create a new account?")) {
        logIn();
        }
    })

    const checkAccountExists = (callback) => {
      fetch("", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username})
      })
      .then(r => r.json())
      .then(r => {
        callback(r?.userExists)
      })
    }
*/
    const logIn = () => {
      fetch("", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
      })
      .then(r => r.json())
      .then(r => {
        if ('Login Successful' === r.message) {
          localStorage.setItem("user", JSON.stringify({username, token: r.token}))
          props.setLoggedIn(true)
          props.setUsername(username)
          navigate("/")
        } else if ('User Not Found.' === r.message) {
          window.alert("There is no account with this username") // include sign up option?
        } else {
          window.alert("Invalid username or password. Please try again.")
        }
      })
    }
   
  };

  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>Login</div>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={username}
          placeholder="Username"
          onChange={(ev) => setUsername(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{usernameError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={password}
          type="password"
          placeholder="Password"
          onChange={(ev) => setPassword(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={onButtonClick}
          value={"Log in"}
        />
      </div>
    </div>
  );
};

export default Login;