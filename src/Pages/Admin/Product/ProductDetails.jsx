import React, { useEffect, useState } from "react";
import { useAuth } from "../../../Context/Auth";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../../Header";
import './Productdetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [auth, setAuth] = useAuth();

  const getProduct = async () => {
    try {
      let { data } = await axios.get(`http://localhost:5000/Products/${id}`);
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

      <div>
      

        <div className="wrapper">
          <div className="product-img">
            <img src={product.image} height={420} style={{objectFit:'contain'}} width={327} />
          </div>
          <div className="product-info">
            <div className="product-text text-white " style={{marginTop:'95px'}}>
              <h5 className="mt-5 mb-3" style={{marginLeft:'37px',fontSize:'21px'}} >Name :- {product.product}</h5>
              <p className="text-white" style={{marginRight:'37px',fontSize:'16px'}}>
              Description :- {product.description}
              </p>
              <p className="text-white" style={{marginRight:'37px',fontSize:'16px'}}>
              Price :- {product.price}
              </p>
              <p className="text-white" style={{marginRight:'37px',fontSize:'16px'}}>
              Qty :- {product.qty}
              </p>
              <p className="text-white" style={{marginRight:'37px',fontSize:'16px'}}>
              Market Status :- {product.market}
              </p>
              <p className="text-white" style={{marginRight:'37px',fontSize:'16px'}}>
              Status :- {product.status}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
