import React, { useEffect, useState } from "react";
import Header from "../Header";
import Leftsidebar from "./Leftsidebar";
import axios from "axios";
import { useAuth } from "../../Context/Auth";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  useEffect(() => {
    if (auth?.user?.role === "user") {
      navigate("/");
    }
  });

  const getUsers = async () => {
    try {
      let { data } = await axios.get(`http://localhost:5000/users?role=user`);
      setUsers(data);
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const DeleteData = async (id) => {
    try {
      let { data } = await axios.delete(`http://localhost:5000/users/${id}`);
      let d = users.filter((val) => {
        return val.id !== id;
      });
      setUsers(d);
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Header />
      <div className="d-flex ">
        <div className="col-md-2">
          <Leftsidebar />
        </div>
        <div className="col-md-10">
          <h5 className="p-5" style={{ color: "#080D33" }}>
            Dashboard
          </h5>
          <table class="table text-center">
            <thead>
              <tr>
                <th scope="col">Srno</th>
                <th scope="col">Name</th>
                <th scope="col">Phone</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((val, i) => {
                i++;
                return (
                  <tr>
                    <th scope="row">{i}</th>
                    <td>{val.name}</td>
                    <td>{val.phone}</td>
                    <td>
                      <Link to={`/admin/userdetails/${val.id}`}>
                        <button className="btn btn-success btn-sm">View</button>
                      </Link>
                      <button
                        className="btn btn-danger btn-sm mx-2"
                        onClick={() => DeleteData(val.id)}
                      >
                        Delete
                      </button>
                      {/* <button className='btn btn-primary btn-sm'>Edit</button> */}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
