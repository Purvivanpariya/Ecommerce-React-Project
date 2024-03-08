import React, { useEffect, useState } from "react";
import Leftsidebar from "../Leftsidebar";
import Header from "../../Header";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./table.css";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useAuth } from "../../../Context/Auth";

const Category = () => {
  const [categoryall, setCategoryall] = useState([]);
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  useEffect(() => {
    if (auth?.user?.role === "user") {
      navigate("/");
    }
  });

  const allrecord = async () => {
    try {
      let { data } = await axios.get("http://localhost:5000/category");
      setCategoryall(data);
      categoryall("");
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  useEffect(() => {
    allrecord();
  }, []);

  return (
    <>
      <Header />

      <div className="d-flex">
        <div className="col-md-2">
          <Leftsidebar />
        </div>
        <div className="col-md-10 p-5 ">
          <h5 className="" style={{ color: "#080D33" }}>
            View Category
          </h5>
          <Link className="" to={`/admin/add`}>
            <button
              className=" btn-sm m-3 mb-1 ms-0"
              style={{ backgroundColor: "#080D33", color: "white" }}
            >
              Add
            </button>
          </Link>
          <div className="d-flex justify-content-center flex-wrap align-items-center m-0">
            <div class="container d-flex align-items-center ">
              <table class="table w-25 mt-5" style={{border:'2px solid black'}}>
                <thead>
                  <tr>
                    <th scope="col" style={{borderRight:'2px solid black'}}>#</th>
                    <th >First</th>
                  </tr>
                </thead>
                <tbody>
                {categoryall.map((val, i) => {
                  return (
                    <tr>
                      <td scope="row" style={{borderRight:'2px solid black'}}>{i+1}</td>
                      <td>{val.category}</td>
                    </tr>
                  );
                })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
