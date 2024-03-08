import React, { useEffect, useState } from "react";
import Header from "../Header";
import axios from "axios";

const Home = () => {
  const [home, setHome] = useState([]);

  const HomeProduct = async () => {
    let { data } = await axios.get("http://localhost:5000/Products");
    setHome(data);
  };

  useEffect(() => {
    HomeProduct();
  }, []);

  return (
    <div>
      <div className="p">
        <Header />
      </div>
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={0}
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={1}
            aria-label="Slide 2"
          />
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://images.vexels.com/content/194700/preview/buy-online-slider-template-4261dd.png" className="d-block w-100" alt="..." height={450}  style={{backgroundSize:'cover',backgroundPosition:'center'}}/>
          </div>
          <div className="carousel-item">
            <img src="https://static.doofinder.com/main-files/uploads/2022/03/Foto-post-Headless-tools-quickfire.jpg" className="d-block w-100" alt="..." height={450}  style={{backgroundSize:'cover',backgroundPosition:'center'}}/>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="mt-5">
        <div className="container">
          <div className="row px-5">
            <h3 className="pb-3 text-dark">Products</h3>
            {home.map((val) => {
              return (
                <div className="col-lg-3 my-3">
                  <div
                    className="card p-5 "
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
                      <p className="card-text  text-dark">
                        Price :-{val.price}
                      </p>
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

export default Home;
