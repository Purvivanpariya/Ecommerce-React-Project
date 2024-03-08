import React, { useEffect, useState } from "react";
import Leftsidebar from "../Leftsidebar";
import Header from "../../Header";
import axios from "axios";
import "./Product.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/Auth";
import { AiFillDelete } from "react-icons/ai";

const Product = () => {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  const [auth,setAuth] = useAuth();
  useEffect(()=>{
    if(auth?.user?.role === "user"){
        navigate('/')
    } 
})

const Deletecart = async(id) => {
  try {
    let {data} = await axios.delete(`http://localhost:5000/Products/${id}`)
    let del = product.filter((val)=>{
      return val.id !== id
    })
    setProduct(del)
  } catch (error) {
    console.log(error);
    return false
  }
}

  const getProduct = async () => {
    try {
      let { data } = await axios.get(`http://localhost:5000/Products`);
      setProduct(data);
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div>
      <Header />
      <div className="d-flex shadow" style={{ overflowX: "hidden" }}>
        <div className="col-md-2">
          <Leftsidebar />
        </div>

        <div className="col-md-10 pt-5 ps-5">
          <div style={{}}>
            <h5 className="" style={{ color: "#080D33" }}>
              View Products
            </h5>

            <div className="row">
              <div className="col-lg-12">
                <Link to={`/admin/addproduct`}>
                  <button
                    className="btn-sm m-3 mb-5 ms-0"
                    style={{ backgroundColor: "#080D33", color: "white" }}
                  >
                    Add
                  </button>
                </Link>

                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {product.map((val) => {
                    return (
                      <div
                        className="card  m-3 p-4"
                        style={{
                          width: "250px",
                          backgroundColor: "white",
                          color: "#080D33",
                          border: "1px solid #080D33",
                        }}
                      >
                        <img
                          src={val.image}
                          style={{ height: "200px", objectFit: "contain" }}
                          className="card-img-top"
                        />
                        <div className="card-body">
                          <div className="card-title text-center">
                            <h6 style={{fontWeight:'600'}} className="mt-2">Name :- {val.product}</h6>
                            <h6 style={{fontWeight:'600'}}>Price :- {val.price}</h6>
                            <button className="btn btn-sm mt-3" style={{borderRadius:'5px',backgroundColor:' #080D33',color:'white'}} onClick={() => Deletecart(val.id)}>Delete</button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
