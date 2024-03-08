import React, { useEffect, useState } from "react";
import Header from "../Header";
import Leftsidebar from "../Admin/Leftsidebar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../Context/Auth";

const Products = () => {
  const [category, setcategory] = useState([]);
  const [cat, setCat] = useState("");
  const [product, setProduct] = useState("");
  const [market, setMarket] = useState("");
  const [auth, setauth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/Products?market=${market}&category=${cat}`)
      .then((res) => {
        console.log(cat);
        console.log(market);
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }, [market]);

  const Getcat = async () => {
    try {
      let { data } = await axios.get(`http://localhost:5000/category`);
      setcategory(data);
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  const GetPro = async () => {
    try {
      let { data } = await axios.get(`http://localhost:5000/Products`);
      setProduct(data);
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  const ProFilter = async (cate) => {
    try {
      let { data } = await axios.get(
        `http://localhost:5000/Products?category=${cate}&market=${market}`
      );
      setCat(cate);
      setProduct(data);
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const AddCart = async (id) => {
    try {
        if (!auth.user) {
            alert("Login please here")
            navigate('/');
        }
        let singleProduct = await axios.get(`http://localhost:5000/Products/${id}`);
        let record = singleProduct.data;
        console.log(record );
        let dup = await axios.get(`http://localhost:5000/carts?user=${auth.user.id}&productId=${record.id}`)

        console.log(auth.user.id);
        // console.log(!(dup.data != 0));
        if (!(dup.data != 0)) {
            let addcart = await axios.post(`http://localhost:5000/carts`, {
                product: record.product,
                price: record.price,
                qty: record.qty,
                image: record.image,
                user: auth.user.id,
                productId: record.id
            })
            alert("Product successfully add to cart") 
        } else {
            alert("Product already added");
            return false;
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

  useEffect(() => {
    GetPro();
    Getcat();
  }, []);

  return (
    <div>
      <Header />

      <div className="d-flex">
        <div
          className="sidebarr col-md-2    "
          style={{
            justifyContent: "center",
            textAlign: "center",
            backgroundColor: " #080D33",
          }}
        >
          <div className="" style={{ fontSize: "20px", textAlign: "center" }}>
            <p
              class="logo mb-2 pt-5"
              style={{
                fontWeight: "700",
                color: "aliceblue",
                fontStyle: "italic",
              }}
            >
              Products
            </p>
           <div style={{height:'100vh'}} className="category-list">
           <ul className="list-group">
              <li
                className="list-group-item bg-transparent"
                style={{
                  display: "flex",
                  justifyContent: "center ",
                  flexWrap: "wrap",
                }}
              >
                {category.map((val) => {
                  return (
                    <div>
                      <button className="btnss"
                      onClick={() => ProFilter(val.category)}
                      style={{
                        
                        color: "white",
                        borderRadius:'5px',
                        backgroundColor: "transparent",
                        margin: "4px 30px",
                        padding: "5px 20px",
                        textAlign: "center",
                        width: "200px",
                        fontSize:'16px',
                        border:'1px solid white'
                        
                      }}
                    >
                      {val.category}
                    </button>
                    </div>

                  );
                })}
                <button className="btnss"  style={{
                        
                        color: "white",
                        borderRadius:'5px',
                        backgroundColor: "transparent",
                        margin: "50px",
                        padding: "5px 20px",
                        textAlign: "center",
                        width: "100px",
                        fontSize:'16px',
                        border:'1px solid white'
                        
                      }}
                      onClick={() => GetPro(auth.user.id)}>All</button>
              </li>
            </ul>
           </div>
          </div>
        </div>
        <div className="col-md-10 ">
          <h3 style={{ color: "#080D33" }} className="p-4">
            Products
          </h3>
          <div
            className="select d-flex m-3"
            style={{ justifyContent: "space-between" }}
          >
            <div className="col-lg-3">
              
            </div>

            <div className="col-lg-3 " sr>
              <select
                className="form-control text-center "
                style={{backgroundColor:'#080D33', color:'white'}}
                onChange={(e) => setMarket(e.target.value)}
                value={market}
              >
                <option value="">----Select Market-Status----</option>
                <option value="Latest">Latest</option>
                <option value="Upcomming">Upcomming</option>
                <option value="Best">Best</option>
              </select>
            </div>
          </div>
          <div
            className="main d-flex"
            style={{ flexWrap: "wrap", justifyContent: "center" }}
          >
            {product &&
              product.map((val) => {
                return (
                  <div className="col-lg-3 m-0">
                    <div
                      className="card p-3 m-3"
                      style={{
                        backgroundColor: "white",
                        border: "1px solid black",
                        boxShadow: "none",
                        width: "18rem",
                      }}
                    >
                      <img
                        src={val.image}
                        height="200"
                        style={{ objectFit: "contain" }}
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body text-center">
                        <h5 className="card-title py-3 text-dark">
                          Name :-{val.product}
                        </h5>
                        <h6 className="card-text mb-4 text-dark">
                          Price :-{val.price}
                        </h6>
                        <div className="d-flex justify-content-center">
                          <button
                            type="button"
                            onClick={() => AddCart(val.id)}  
                            style={{backgroundColor:'#080D33', color:'white'}}
                            class="btn btn-primary me-2"
                          >
                            AddCart
                          </button>
                         <Link to={`/productdetails/${val.id}`}>
                         <button type="button" class="btn btn-success"  style={{backgroundColor:'#080D33', color:'white'}}>

                            Details
                          </button>
                         </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
