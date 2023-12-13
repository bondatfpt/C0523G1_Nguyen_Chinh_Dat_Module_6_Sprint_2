import React, { useEffect, useState } from "react";
import Login from "./Login";
import {
  getUsernameFromJwt,
  getIdFromJwt,
  getRolesFromJwt,
  removeJwt,
} from "../service/Jwt";
import { getUserByAccountId } from "../service/LoginService";
import { Link } from "react-router-dom";
export default function Header() {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState();
  const [idLogin, setIdLogin] = useState("");

  const fetchDataUser = async () => {
    const jwt = localStorage.getItem("jwt");
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
  }, [idLogin]);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
  };
  if (idLogin !== "" && !user) {
    return null;
  }

  return (
    <div>
      <header className="header-area header-sticky">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="main-nav">
                <a href="index.html" className="logo">
                  <img src="/images/logo.png" />
                </a>
                <ul className="nav">
                  <li className="scroll-to-section">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="scroll-to-section">
                    <a href="#men">Men</a>
                  </li>
                  <li className="scroll-to-section">
                    <a href="#women">Women</a>
                  </li>
                  <li className="scroll-to-section">
                    <a href="#kids">Kid</a>
                  </li>
                  {idLogin == "" && (
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

                  {idLogin !== "" && (
                    <li className="scroll-to-section">
                      <a id="dropdownMenuButton1" data-bs-toggle="dropdown" >{user.name}</a>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
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
                <a className="menu-trigger">
                  <span>Menu</span>
                </a>
              </nav>
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
