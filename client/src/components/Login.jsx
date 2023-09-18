import "./login.css";
import { useEth } from "../contexts/EthContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { state } = useEth();

  const login = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/validate-credentials", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => {
        console.log(response);

        return response.json();
      })
      .then((data) => {
        if (data.userId) {
          localStorage.setItem("userId", data.userId);
        }
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    console.log("login");
  };

  return (
    <div>
      <h1>Login form</h1>
      <form action="">
        <div className="headingsContainer">
          <h3>Sign in</h3>
          <p>Sign in with your username and password</p>
        </div>

        <div className="mainContainer">
          <label htmlFor="username">Your username</label>
          <input
            type="text"
            placeholder="Enter Username"
            name="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
          />

          <br />
          <br />

          <label htmlFor="pswrd">Your password</label>
          <input
            type="password"
            placeholder="Enter Password"
            name="pswrd"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />

          {/* <div className="subcontainer">
            <label>
              <input type="checkbox" checked="checked" name="remember" />
              Remember me
            </label>
            <p className="forgotpsd">
              <a href="#">Forgot Password?</a>
            </p>
          </div> */}

          <button type="submit" onClick={login}>
            Login
          </button>

          <p className="register">
            Not a member? <Link to="/register">Register here!</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
