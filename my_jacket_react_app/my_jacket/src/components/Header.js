import React, { useContext, useEffect, useState } from "react";
import Login from "./Login";
import {
  getUsernameFromJwt,
  getIdFromJwt,
  getRolesFromJwt,
  removeJwt,
} from "../service/Jwt";
import { getProductByName } from "../service/ProductService";
import { getUserByAccountId } from "../service/LoginService";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { findAll } from "../service/CategoryService";
import { toast } from "react-toastify";
export default function Header() {
  const [products, setProducts] = useState();
  const [categories, setCategories] = useState();
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [idLogin, setIdLogin] = useState("");
  const {
    nameSearch,
    setNameSearch,
    setNameRecommend,
    setCategoryId,
    isSearch,
    setIsSearch,
    isLogin,
    setIsLogin,
    showModal,
    handleShowModal,
    handleHideModal,
    amountItem,
  } = useContext(AppContext);
  const fetchDataCategories = async () => {
    const categories = await findAll();
    setCategories(categories);
  };
  const fetchDataProductByName = async () => {
    const products = await getProductByName(nameSearch);
    setProducts(products);
  };

  const fetchDataUser = async () => {
    const jwt = localStorage.getItem("jwt");
    if (isLogin && jwt) {
      const idLogin = getIdFromJwt(jwt);
      setIdLogin(idLogin);
      const user = await getUserByAccountId(idLogin);
      setUser(user);
    }
  };
  const handleLogout = () => {
    removeJwt();
    setIdLogin("");
    setIsLogin(false);
    toast.info("Success log out");
  };

  useEffect(() => {
    fetchDataUser();
    fetchDataCategories();
  }, [isLogin, amountItem]);

  const handleChangeNameSearch = (event) => {
    setNameSearch(event.target.value);
    setIsSearch(!isSearch);
    setNameRecommend(event.target.value);
    navigate("/");
  };

  const handleChangeCategoryId = (event) => {
    setCategoryId(event.target.value);
    setIsSearch(!isSearch);
    navigate("/");
  };

  if (!categories) {
    return null;
  }

  return (
    <div>
      <header className="header-area header-sticky">
        <div className="container">
          <div className="row main-nav">
            <div className="col-lg-2 col-md-5">
              <Link to="/" className="logo">
                <img src="/images/logo4.png" />
              </Link>
            </div>
            <div className="col-lg-5 col-md-5">
              <div className="search">
                <input
                  onChange={handleChangeNameSearch}
                  placeholder="Enter a name product"
                  type="text"
                  name="name"
                  className="input1"
                />
                 <div className="btn-category" style={{width:"50%"}}>
                  <select className="input1" style={{height:"50px"}} name="categoryId" onChange={handleChangeCategoryId}>
                    <option value="">All</option>
                    {categories.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className=" col-lg-5 col-md-2 ">
              <ul className="nav">
                <li className="scroll-to-section">
                  <Link to="/">Products</Link>
                </li>
                {user && isLogin && (
                  <li className="scroll-to-section">
                    <Link to="/cart" className="cart-link">
                      Cart{amountItem > 0 && (<span className="cart-amount">({amountItem})</span>)}
                    </Link>
                  </li>
                )}
                {user && isLogin && (
                  <li className="scroll-to-section">
                    <Link to="/history" className="cart-link">
                        History
                    </Link>
                  </li>
                )}
                {!isLogin && (
                  <li className="scroll-to-section">
                    <a
                      onClick={handleShowModal}
                      data-toggle="modal"
                      data-target="#loginModal"
                    >
                      Login
                    </a>
                  </li>
                )}

                {user && isLogin && (
                  <li className="scroll-to-section">
                    <a id="dropdownMenuButton1" data-bs-toggle="dropdown">
                      {user.name}
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <li>
                        <a className="dropdown-item" onClick={handleLogout}>
                          Log out
                        </a>
                      </li>
                    </ul>
                  </li>
                )}
              </ul>
              <a className="menu-trigger ">
                <span>Menu</span>
              </a>
            </div>
          </div>
        </div>
      </header>
      <Login
        handleHideModal={handleHideModal}
        showModal={showModal}
        setIdLogin={setIdLogin}
      />
    </div>
  );
}
