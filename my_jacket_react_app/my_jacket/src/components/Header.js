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
export default function Header() {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState();
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [idLogin, setIdLogin] = useState("");
  const {
    nameSearch,
    setNameSearch,
    categoryId,
    nameRecommend,
    setNameRecommend,
    setCategoryId,
    isSearch,
    setIsSearch,
    categories,
  } = useContext(AppContext);

  const fetchDataProductByName = async () => {
    const products = await getProductByName(nameSearch);
    setProducts(products);
  };

  const fetchDataUser = async () => {
    const jwt = localStorage.getItem("jwt");
    fetchDataProductByName();
    if (jwt) {
      const idLogin = getIdFromJwt();
      setIdLogin(idLogin);
      const user = await getUserByAccountId(idLogin);
      setUser(user);
    }
  };
  const handleLogout = () => {
    removeJwt();
    setIdLogin("");
  };
  useEffect(() => {
    fetchDataUser();
  }, [idLogin,nameRecommend]);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
  };
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

  if ((idLogin !== "" && !user) || !categories || !products ) {
    return null;
  }

  return (
    <div>
      <header className="header-area header-sticky">
        <div className="container">
          <div className="row main-nav">
            <div className="col-lg-2 col-md-5">
              <Link to="/" className="logo">
                <img  src="/images/logo4.png" />
              </Link>
            </div>
            <div className="col-lg-5 col-md-5">
              <div className="search">
              <div className="btn-category">
                  <select name="categoryId" onChange={handleChangeCategoryId}>
                    <option value="">All</option>
                    {categories.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  onChange={handleChangeNameSearch}
                  placeholder="Enter a name product"
                  type="text"
                  name="name"
                />
                <div>
                <button type="submit">Search</button></div>
                {/* <div className="result-box d-none">
                  {products.map((item) => (
                    <div
                      style={{
                        marginBottom: "5px",
                        marginTop: "2px",
                      }}
                      className="row"
                    >
                      <div className="col-2">
                        <img
                          style={{
                            width: "100%",
                            height: "100%",
                            marginLeft: "2px",
                          }}
                          src={item.path}
                        ></img>
                      </div>
                      <div className="col-10">
                        <p>{item.name}</p>
                      </div>
                      <hr style={{ width: "100%" }}></hr>
                    </div>
                   ))} 
                </div> */}
              </div>
            </div>
            <div className=" col-lg-5 col-md-2 ">
              <ul className="nav">
                <li className="scroll-to-section">
                  <Link to="/">Home</Link>
                </li>
                 <li className="scroll-to-section">
                  <Link to="/cart" >Cart</Link>
                </li>
                {!user && (
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

                {user && (
                  <li className="scroll-to-section">
                    <a
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      onClick={handleLogout}
                    >
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
                      {/* <li>
                          <a className="dropdown-item" href="#">
                            Another action
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Something else here
                          </a>
                        </li> */}
                    </ul>
                  </li>
                )}
              </ul>
              <a className="menu-trigger ">
                <span>Menu</span>
              </a>
            </div>
          </div>
          {/* </nav> */}
          {/* </div>
          </div> */}
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
