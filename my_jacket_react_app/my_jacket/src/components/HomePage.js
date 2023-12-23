import React, { useContext, useEffect, useState } from "react";
import { getAllProduct, truncateString } from "../service/ProductService";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";

export default function HomePage() {
  const [products, setProducts] = useState();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState([]);
  const { nameSearch, categoryId, isSearch, setIsSearch,cartDetails,isLogin } =
    useContext(AppContext);

  const fetchData = async () => {
    const data = await getAllProduct(page, nameSearch, categoryId);
    const totalP = totalPageArray(data.totalPages);
    setTotalPage(totalP);
    setProducts(data.content);
  };

  useEffect(() => {
    fetchData();
    if (isSearch) {
      setPage(0);
      setIsSearch(!isSearch);
    }
  }, [page, nameSearch, categoryId]);

  const totalPageArray = (totalP) => {
    const arr = [];
    for (let i = 0; i < totalP; i++) {
      arr[i] = i + 1;
    }
    return arr;
  };

  if ( !products || !totalPage) {
    return null;
    
  }
  return (
    <div>
       <div className="main-banner" id="top">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <div className="left-content">
                <div className="thumb">
                  <div className="inner-content">
                    <h4>We Are MyJacket</h4>
                    <span>Stylish, comfortable, durable</span>
                    <div className="main-border-button">
                      <a href="#">Purchase Now!</a>
                    </div>
                  </div>
                  <img src="/images/left-banner-image.jpg" />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="right-content">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="right-first-image">
                      <div className="thumb">
                        <div className="inner-content">
                          <h4>Women</h4>
                          <span>Best Clothes For Women</span>
                        </div>
                        <div className="hover-content">
                          <div className="inner">
                            <h4>Women</h4>
                            <p>
                              Lorem ipsum dolor sit amet, conservisii ctetur
                              adipiscing elit incid.
                            </p>
                            <div className="main-border-button">
                              <a href="#">Discover More</a>
                            </div>
                          </div>
                        </div>
                        <img src="/images/baner-right-image-01.jpg"></img>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="right-first-image">
                      <div className="thumb">
                        <div className="inner-content">
                          <h4>Men</h4>
                          <span>Best Clothes For Men</span>
                        </div>
                        <div className="hover-content">
                          <div className="inner">
                            <h4>Men</h4>
                            <p>
                              Lorem ipsum dolor sit amet, conservisii ctetur
                              adipiscing elit incid.
                            </p>
                            <div className="main-border-button">
                              <a href="#">Discover More</a>
                            </div>
                          </div>
                        </div>
                        <img src="/images/baner-right-image-02.jpg"></img>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="right-first-image">
                      <div className="thumb">
                        <div className="inner-content">
                          <h4>Kids</h4>
                          <span>Best Clothes For Kids</span>
                        </div>
                        <div className="hover-content">
                          <div className="inner">
                            <h4>Kids</h4>
                            <p>
                              Lorem ipsum dolor sit amet, conservisii ctetur
                              adipiscing elit incid.
                            </p>
                            <div className="main-border-button">
                              <a href="#">Discover More</a>
                            </div>
                          </div>
                        </div>
                        <img src="/images/baner-right-image-03.jpg"></img>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="right-first-image">
                      <div className="thumb">
                        <div className="inner-content">
                          <h4>Accessories</h4>
                          <span>Best Trend Accessories</span>
                        </div>
                        <div className="hover-content">
                          <div className="inner">
                            <h4>Accessories</h4>
                            <p>
                              Lorem ipsum dolor sit amet, conservisii ctetur
                              adipiscing elit incid.
                            </p>
                            <div className="main-border-button">
                              <a href="#">Discover More</a>
                            </div>
                          </div>
                        </div>
                        <img src="/images/baner-right-image-04.jpg"></img>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
      {products.length > 0 ? (<> <section style={{ marginTop: "0px" }} className="section" id="products">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-heading">
                <h2 style={{color:"blue"}}>Our Products</h2>
                <span>Check out all of our products.</span>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            {products.map((item) => (
              <div key={item.id} className="col-lg-4">
                <div className="item">
                  <div className="thumb">
                    <div className="hover-content">
                      <ul>
                        <li>
                          <Link to={`/product-detail/${item.id}`}>
                            <i className="fa fa-eye" />
                          </Link>
                        </li>
                        
                      </ul>
                    </div>
                    <Link to = {`/product-detail/${item.id}`}>
                    <img
                      src={item.path}
                      style={{ width: "100%", height: "450px" }}
                    />
                    </Link>
                  </div>
                  <div className="down-content">
                    <h4>{truncateString(item.name)}</h4>
                    <span style={{ color: "red" }}>${item.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>  
      <div
        style={{
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
        className="mt-3"
      >
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-end">
            <li className="page-item">
              <button
                className={`page-link rounded-0 ${page <= 0 ? "disabled" : ""}`}
                aria-label="Previous"
                onClick={() => setPage(0)}
              >
                <small aria-hidden="true">&lt;&lt;</small>
              </button>
            </li>
            <li className="page-item">
              <button
                className={`page-link rounded-0 ${page <= 0 ? "disabled" : ""}`}
                onClick={() => setPage(page - 1)}
                aria-label="Previous"
              >
                <span aria-hidden="true">&lt;</span>
              </button>
            </li>
            {totalPage.map((item, index) => {
              return (
                <li className="page-item" key={index}>
                  <button
                    className={`page-link ${page === index ? "active" : ""}`}
                    id="page-number"
                    onClick={() => setPage(index)}
                  >
                    {index + 1}
                  </button>
                </li>
              );
            })}

            <li className="page-item">
              <button
                className={`page-link rounded-0 ${
                  page + 1 >= totalPage[totalPage.length - 1] ||
                  totalPage.length === 0
                    ? "disabled"
                    : ""
                }`}
                onClick={() => setPage(page + 1)}
                aria-label="Next"
              >
                <small aria-hidden="true">&gt;</small>
              </button>
            </li>
            <li className="page-item">
              <button
                className={`page-link rounded-0 ${
                  page + 1 >= totalPage[totalPage.length - 1] ||
                  totalPage.length === 0
                    ? "disabled"
                    : ""
                }`}
                onClick={() => setPage(totalPage[totalPage.length - 2])}
                aria-label="Next"
              >
                <small aria-hidden="true">&gt;&gt;</small>
              </button>
            </li>
          </ul>
        </nav>
      </div></>) : (<div style={{marginTop:"200px", width:"100%", color:"blue",textAlign:"center"}}><h2>No Data</h2></div>)}
    </div>
  );
}
