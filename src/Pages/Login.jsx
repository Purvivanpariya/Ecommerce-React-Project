import React, { useState } from "react";
import Header from "./Header";
import "./Header.css";
import "./Login.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../Context/Auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate()

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const submitt = async (e) => {
    e.preventDefault();
    try {
      let { data } = await axios.get(
        `http://localhost:5000/users/?name=${name}&password=${password}`
      );
      if (data.length > 0) {
        localStorage.setItem("userLogin", JSON.stringify(data[0]));
        setAuth({
          ...auth,
          user: data[0],
        });
        alert("User Login");
        setName("");
        setPassword("");
        if(data[0].role === "admin"){
          navigate('/admin/dashboard');
    }else{
        navigate('/user/home');
    }
      } else {
        alert("User Not Login");
      }
    } catch (err) {
      console.log(err);
      return false;
    }
    setName("");
    setPassword("");
  };

  return (
    <>
      <Header />
      <div className="box ">
        <form onSubmit={submitt} className="form">
          <h2 style={{ color: "white" }}>Login Form</h2>
          <div className="inputBox">
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              required="required"
            />
            <span>Username</span>
            <i />
          </div>
          <div className="inputBox"  style={{marginTop: "60px" }}>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
             
              required="required"
            />
            <span>Password</span>
            <i />
          </div>
          <a style={{ marginTop: "60px" }}>
            <div className="submitt">
              <input type="submit" defaultValue="Login" />
            </div>
          </a>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default Login;
