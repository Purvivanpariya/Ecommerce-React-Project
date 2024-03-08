import React, { useState } from "react";
import Header from "./Header";
import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  let URL = `http://localhost:5000/users`
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [con, setCon] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let rec = await axios.post(`${URL}`,{
        name : name,
        password : password,
        phone : phone,
        role : "user"
      })
      alert("User successfully insert");
      setName("");
      setPhone("")
      setPassword("");
      setCon("")
      navigate('/')
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  return (
    <>
      <Header />
      <div className="box">
        <form onSubmit={handleSubmit} className="form pb-5" >
          <h2 >Register Form</h2>
          <div className="inputBox">
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required="required"
            />
            <span>name</span>
            <i />
          </div>
          <div className="inputBox">
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required="required"
            />
            <span>Password</span>
            <i />
          </div>
          <div className="inputBox">
            <input
              type="text"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              required="required"
            />
            <span>Phone</span>
            <i />
          </div>
          <a style={{marginTop:'20px',marginBottom:'10px',textDecoration:'none',color:'black'}} className="text-dark" href="https://akhs1.com/">
            <div className="sub">
            <input className="sub" type="submit" defaultValue="Login" />
            </div>
          </a>
        </form>
      </div>
    </>
  );
};

export default Register;
