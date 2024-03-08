import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header";
import Leftsidebar from "./Leftsidebar";
import "./UserDetails.css";
import { useAuth } from "../../Context/Auth";

const UserDetails = () => {
  
  const [user, setUser] = useState({});
  const { id } = useParams();
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    if (auth?.user?.role === "user") {
      navigate("/");
    }
  });

  const getUser = async () => {
    try {
      let { data } = await axios.get(`http://localhost:5000/users/${id}`);
      setUser(data);
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const getCart = async () => {
    try {
      let { data } = await axios.get(`http://localhost:5000/carts?user=${id}`);
      setCart(data);
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  
  useEffect(() => {
    getUser();
    getCart();
  }, []);





  return (
    <div>
      <Header />
      <div className="d-flex">
        <div className="col-md-2">
          <Leftsidebar />
        </div>
        <div className="col-md-10">
          <h5 className="p-5" style={{ color: "#080D33" }}>
            User Details
          </h5>
          <div class="user-card ms-5">
            <div class="avatar">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                alt=""
              />
            </div>
            <div class="details">
              <div class="name ">
                <p className="fs-6" style={{ fontWeight: "700" }}>
                  Name :- {user.name}
                </p>
                <p className="fs-6 pt-2" style={{ fontWeight: "700" }}>
                  Phone :- {user.phone}
                </p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="py-5 ps-5" style={{ color: "#080D33" }}>
              carts
            </h3>
            <div className="d-flex flex-wrap justify-content-center">
              {cart &&
                cart.map((val) => {
                  return (
                    <div
                      className="card ms-5 p-4 "
                      style={{
                        width: "18rem",
                        color: "#080D33",
                        border: "1px solid #080D33",
                      }}
                    >
                      <img
                        src={val.image}
                        height="200"
                        style={{ objectFit: "contain" }}
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body text-center mt-3">
                        <h5 className="card-title">Name :- {val.product}</h5>
                        <h5 className="card-text"> Price :- {val.price}</h5>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
