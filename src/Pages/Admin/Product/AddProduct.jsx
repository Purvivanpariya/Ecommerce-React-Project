import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Leftsidebar from "../Leftsidebar";
import "./Addproduct.css";
import Header from "../../Header";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../../Context/Auth";

const AddProduct = () => {
  const [categoryRecord, setCategoryRecord] = useState([]);

  const [category, setCategory] = useState("");
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [market, setMarket] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const [auth,setAuth] = useAuth();
  useEffect(()=>{
    if(auth?.user?.role === "user"){
        navigate('/')
    } 
})

  const getCategory = async () => {
    try {
      let { data } = await axios.get(`http://localhost:5000/category`);
      setCategoryRecord(data);
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let addproduct = await axios.post(`http://localhost:5000/Products`, {
        category: category,
        product: product,
        price: price,
        qty: '1',
        description: description,
        image: image,
        market: market,
        status: status,
      });
      setCategory("");
      setProduct("");
      setPrice("");
      setQty("");
      setDescription("");
      setImage("");
      setMarket("");
      setStatus("");
      alert("Product successfully add");
      navigate("/admin/product");
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

        <div className="col-md-10 pt-5 ps-5 pt-4">
         
          <h5 className="mb-5" style={{ color: "#080D33" }}>
              Product
            </h5>
          <form onSubmit={handleSubmit} className="pp  p-4" style={{width:'340px',backgroundColor:'#080D33'  , border:'1px solid white'}}>
            <div class=" p-0">
              <select
                className="p-1   text-dark bg-light text-center  mb-3"
                style={{
                  fontWeight: "700",
                  width: "290px",
                  backgroundColor: "#333",
                  fontSize: "13px",
                  border: "1px solid black",
                  borderRadius: "3px",
                }}
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                <option>---select Categories</option>
                {categoryRecord.map((cat) => {
                  return <option>{cat.category}</option>;
                })}
              </select>
            </div>

            <div className="in">
              <input
                onChange={(e) => setProduct(e.target.value)}
                value={product}
                type="text"
                placeholder="Product Name "
                className="mt-2 "
                style={{width:'290px'}}
              />
              <input
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                type="text"
                placeholder="Price"
                style={{width:'290px'}}
              />
              <input
                onChange={(e) => setQty(e.target.value)}
                value={qty}
                type="text"
                placeholder="Qty"
                style={{width:'290px'}}
              />
              <input
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                type="text"
                placeholder="Discription"
                style={{width:'290px'}}
              />
              <input
                onChange={(e) => setImage(e.target.value)}
                value={image}
                type="text"
                placeholder="Image url"
                style={{width:'290px'}}
              />
            </div>

            <select
              className="p-1   text-dark bg-light text-center  mb-3"
              style={{
                fontWeight: "700",
                width: "290px",
                backgroundColor: "#333",
                fontSize: "13px",
                border: "1px solid black",
                borderRadius: "3px",
              }}onChange={(e) => setMarket(e.target.value)}
              value={market}
            >
              <option>---select market status</option>
              <option>Latest</option>
              <option>Best</option>
              <option>Upcomming</option>
              
            </select>
            <br></br>
            <select
              className="p-1   text-dark bg-light text-center  mb-3"
              style={{
                fontWeight: "700",
                width: "290px",
                backgroundColor: "#333",
                fontSize: "13px",
                border: "1px solid black",
                borderRadius: "3px",
              }}
              onChange={(e) => setStatus(e.target.value)}
              value={status}
            >
              
              <option>---select status</option>
              <option>Active</option>
              <option>Deactive</option>
              
            </select>
            <input className="jj" type="submit" value="Send" />
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
