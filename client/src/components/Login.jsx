import "./login.css";

const Login = () => {
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
            required
          />

          <br />
          <br />

          <label htmlFor="pswrd">Your password</label>
          <input
            type="password"
            placeholder="Enter Password"
            name="pswrd"
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

          <button type="submit">Login</button>

          <p className="register">
            {/* Not a member? <a href="#">Register here!</a> */}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
