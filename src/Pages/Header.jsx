import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../Context/Auth";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const logout = () =>{
    localStorage.removeItem('userLogin')
    alert("User Log out")
    navigate('/')
    setAuth({
      ...auth,
      user : null
 })
  }

  return (
    <>
      <header className="header">
        <nav>
          <div className="logo">
            <a href="index.html">
              <img
                src="https://i.pinimg.com/474x/15/96/e3/1596e3b738d6e32dbd700844ed062488.jpg"
                width={70}
                height={70}
                alt=""
              />
            </a>
          </div>
          <input type="checkbox" id="menu-toggle" />
          <label htmlFor="menu-toggle" className="menu-icon">
            ☰
          </label>
          <ul className="menu">
            {!auth.user ? (
              <>
                <li >
                  <Link  style={{textDecoration:'none'}} to={"/"}>Login</Link>
                </li>
                <li >
                  <Link style={{textDecoration:'none'}} to={"/register"}>Register</Link>
                </li>
              </>
            ) : (
              <li >
                <button style={{border:'1px solid white',color:'white',backgroundColor:'transparent',padding:'6px',borderRadius:'4px',fontWeight:'400',marginRight:'5px'}} onClick={() => logout()}>Log out</button>
              </li>
            )}

      
            <li >
              <Link href="#" style={{textDecoration:'none'}}  to={'/user/home'}>Home</Link>
            </li>
            <li >
            <Link href="#" style={{textDecoration:'none'}}  to={'/user/products'}>Product</Link>
            </li>
            <li >
            <Link href="#" style={{textDecoration:'none'}}  to={'/user/carts'}>Cart</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
