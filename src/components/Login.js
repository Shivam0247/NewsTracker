import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import "../css/Login.css";
import UserContext from "../UserContext/UserContext";
const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  // let history = useHistory();
  const context = useContext(UserContext);
  const { users, getUsers, addUser, AuthUser } = context;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userAuth = await AuthUser(credentials.email, credentials.password);
    setCredentials({ email: "", password: "" });
    console.log(userAuth);
    if (!userAuth.error || userAuth.error.length === 0) {
      navigate("/");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="login">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form>
        <h3>Login Here</h3>

        <label htmlFor="eamil">Email</label>
        <input
          type="email"
          placeholder="Email"
          id="email"
          name="email"
          onChange={onChange}
          value={credentials.email}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          name="password"
          onChange={onChange}
          value={credentials.password}
          required
        />

        <button onClick={handleSubmit}>Log In</button>
        {/* <div className="social">
          <div className="go"><i className="fab fa-google"></i>  Google</div>
          <div className="fb"><i className="fab fa-facebook"></i>  Facebook</div>
        </div> */}
      </form>
    </div>
  );
};

export default Login;
