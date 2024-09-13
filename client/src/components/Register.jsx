import "./login.css";
import { useEth } from "../contexts/EthContext";
import { useCont } from "../contexts/MyContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [myrole, setMyRole] = useState("student");
  const { web3 } = useCont();

  useEffect(() => {
    console.log(web3);
  }, [web3]);

  const register = (e) => {
    const req = {
      eth_address: web3.accounts[0],
      username: username,
      password: password,
      name: name,
      organization_name: organisationName,
      role: myrole,
    };
    console.log(req);
    e.preventDefault();
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    })
      .then((response) => {
        console.log(response);

        return response.json();
      })
      .then((data) => {
        if (data.userId) {
          localStorage.setItem("userId", data.id);
          localStorage.setItem("role", data.role);
        }
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <h1>Register form</h1>
      <form action="">
        <div className="headingsContainer">
          <h3>Enter your details</h3>
          <p>Sign up and create your account</p>
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

          <br />
          <br />
          <label htmlFor="Name">Your Name</label>
          <input
            type="text"
            placeholder="Enter Name"
            name="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          />

          <br />
          <br />
          <label htmlFor="OrganisationName">Your OrganisationName</label>
          <input
            type="text"
            placeholder="Enter OrganisationName"
            name="OrganisationName"
            onChange={(e) => {
              setOrganisationName(e.target.value);
            }}
            required
          />

          <br />
          <br />
          <label for="role">Select Role:</label>
          <select
            id="role"
            name="role"
            onChange={(e) => {
              setMyRole(e.target.value);
            }}
          >
            <option value="student" selected>
              Student
            </option>
            <option value="issuer">Issuer</option>
          </select>

          {/* <div className="subcontainer">
            <label>
              <input type="checkbox" checked="checked" name="remember" />
              Remember me
            </label>
            <p className="forgotpsd">
              <a href="#">Forgot Password?</a>
            </p>
          </div> */}

          <button type="submit" onClick={register}>
            Register
          </button>

          <p className="register">
            Already a member? <Link to="/login">Login here!</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
