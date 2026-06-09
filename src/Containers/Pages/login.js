import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Login.css'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="loginMainContainer">
      <h1 className="MainHeading">Employees Management System</h1>
      <div className="FormContainer">
        <h1 className="loginHeading">Login</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        
          <form onSubmit={handleSubmit}>
            <div className="inputContainer">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="inpustStyle"
            ></input>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="inpustStyle"

            />
            <button className="LoginBtnStyles">
              Login
            </button>
              </div>
          </form>
      
      </div>
    </div>
  );
}

export default Login;
