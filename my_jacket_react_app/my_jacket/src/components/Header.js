import React, { useEffect, useState } from "react";
import Login from "./Login";
import { decodeJwt } from "../service/Jwt";

export default function Header() {
  const [showModal,setShowModal] = useState(false);
  
  const handleShowModal = () => {
    setShowModal(true);
  }

  const handleHideModal = () => {
    setShowModal(false);
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
                    <a href="#top">
                      Home
                    </a>
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
                  <li className="scroll-to-section">
                    <a onClick={handleShowModal} data-toggle="modal" data-target="#loginModal">
                      Login
                    </a>
                  </li>
                </ul>
                <a className="menu-trigger">
                  <span>Menu</span>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>
      <Login handleHideModal = {handleHideModal} showModal = {showModal}/>
    </div>
  );
}
