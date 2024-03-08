import React, { useEffect, useState } from "react";
import Header from "../../Header";
import Leftsidebar from "../Leftsidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/Auth";

const Add = () => {
  const [category, setCategory] = useState();
  const navigate = useNavigate();
  const [auth,setAuth] = useAuth();
  useEffect(()=>{
    if(auth?.user?.role === "user"){
        navigate('/')
    } 
})

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let caterecord = await axios.post(`http://localhost:5000/category`, {
        category: category,
      });
      alert("Category successfully add");
      setCategory("");
      navigate("/admin/addproduct");
    } catch (err) {
      console.log(err);
      return false;
    }
  };
  return (
    <>
      <Header />
      <div className="d-flex">
        <div className="col-md-2">
          <Leftsidebar />
        </div>
        <form className="p-5 add">
          <div className=" mb-3 ">
            <h5 htmlFor="" className=" py-3" style={{color:'#080D33'}}>
              Category
            </h5>
            <input
              style={{ backgroundColor: "transparent", color:'#080D33' }}
              type="text"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="form-control"
              placeholder="Enter category"
            />
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="btn btn-sm text-white"
            style={{ backgroundColor: "#080D33" }}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Add;
