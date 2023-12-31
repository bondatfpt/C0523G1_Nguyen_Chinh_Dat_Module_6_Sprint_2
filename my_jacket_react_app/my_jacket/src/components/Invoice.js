import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import { getIdFromJwt } from "../service/Jwt";
import { getUserByAccountId } from "../service/LoginService";
import { Link } from "react-router-dom";
import {
  createInvoice,
  createInvoiceDetail,
  getInvoiceDetailByInvoiceId,
} from "../service/InvoiceService";
import {
  deleteCartDetailFlowInvoice,
  getCartByUserId,
} from "../service/CartService";
import { findAll } from "../service/PaymentService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { updateQuantityAfterPay } from "../service/ProductService";
import Paypal from "./Paypal";
import ConfirmPay from "./ConfirmPay";

export default function Invoice() {
  const {
    fetchDataCartDetail,
    cartDetails,
    totalPrice,
    isLogin,
    totalQuantity,
    setIsPay,setAmountItem
  } = useContext(AppContext);
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [payments, setPayments] = useState([]);
  const [note, setNote] = useState("");
  const [paymentId, setPaymentId] = useState();
  const [showPayPal, setShowPaypal] = useState(false);
  const [isPaypal, setIsPaypal] = useState(false);
  const [otherAddress, setOtherAddress] = useState("");
  const [openOtherAddress, setOpenOtherAddess] = useState(false);
  const checkboxRef = useRef(null);
  const [showConfirm,setShowConfirm] = useState(false);

  const handleShowConfirm = () => {
    setShowConfirm(true);
  }

  const handleHideConfirm = () => {
    setShowConfirm(false);
  }
  const handleCheckboxChange = () => {
    const isChecked = checkboxRef.current.checked;
    if (isChecked) {
      setOpenOtherAddess(true);
    } else {
      setOpenOtherAddess(false);
    }
  };

  const fetchDataUser = async () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      const idLogin = getIdFromJwt(jwt);
      const user = await getUserByAccountId(idLogin);
      setUser(user);
    }
  };
  const fetchDataPayment = async () => {
    const payments = await findAll();
    setPayments(payments);
  };
  

  useEffect(() => {
    fetchDataUser();
    fetchDataCartDetail();
    fetchDataPayment();
  }, []);

  return (
    <div>
      <div style={{ marginTop: "130px" }} className="container">
        {isLogin && cartDetails.length > 0 && user && payments.length > 0 && (
          <div className="row">
            <div
              className="col-12"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "35px",
              }}
            >
              <Link to="/">
                <img style={{ width: "100%" }} src="/images/logo4.png" />
              </Link>
            </div>
            <div
              className="col-lg-6"
              style={{ padding: "20px", border: "1px solid #ccc" }}
            >
              <div className="row">
                <div className="col-12">
                  <div className="mb-2 mt-2">
                    <h4 style={{ color: "blue", textAlign: "center" }}>
                      Customer Information
                    </h4>
                  </div>
                  <div style={{ marginTop: "20px" }}>
                    <div className="form-outline mb-3">
                      <input
                        value={user.name}
                        readOnly
                        required
                        type="text"
                        className="form-control form-control-lg"
                      />
                    </div>
                    <div className="form-outline mb-3 ">
                      <input
                        value={user.phoneNumber}
                        readOnly
                        type="text"
                        className="form-control form-control-lg "
                      />
                    </div>
                    {!openOtherAddress && (
                      <div className="form-outline mb-3">
                      <textarea
                        value={user.location.name}
                        readOnly
                        required
                        type="text"
                        id="address"
                        className="form-control form-control-lg no-resize "
                      />
                    </div>
                    )}
                    <div
                      className="payment-options"
                      style={{ border: "none", padding: "0px" }}
                    >
                      {openOtherAddress && (
                        <div className="form-outline mb-3">
                          <textarea
                            onChange={(event) =>
                              setOtherAddress(event.target.value)
                            }
                            placeholder="Other delivery address"
                            type="text-area"
                            id="otherAddress"
                            className="form-control form-control-lg no-resize "
                          />
                        </div>
                      )}
                      <label>
                        <input
                          ref={checkboxRef}
                          onChange={handleCheckboxChange}
                          type="checkbox"
                        />
                        Delivery to another address
                      </label>
                        <div className="form-outline mb-3">
                      <textarea
                        onChange={(event) => setNote(event.target.value)}
                        placeholder="Notes upon delivery"
                        type="text-area"
                        className="form-control form-control-lg no-resize"
                      />
                    </div>
                    </div>
                    <div className="payment-container">
                      <div className="payment-options">
                        <div className="mb-3">
                          <h4 style={{ color: "blue", textAlign: "center" }}>
                            Payment method
                          </h4>
                        </div>
                        {payments.map((item) => (
                          <label key={item.id}>
                            <input
                              onChange={(event) =>
                                setPaymentId(parseInt(event.target.value))
                              }
                              value={item.id}
                              name="radio"
                              type="radio"
                            />
                            {item.method}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-6"
              style={{ backgroundColor: "antiquewhite", padding: "20px" }}
            >
              <div className="row">
                <div className="col-12">
                  <div>
                    <div className="mb-2 mt-2">
                      <h4 style={{ textAlign: "center", color: "blue" }}>
                        Order Products ({cartDetails.length} items)
                        <p style={{ color: "green"}}>
                        Total Price: ${totalPrice}/Total Quantity: {totalQuantity}
                      </p>
                      </h4>
                    </div>
                    <div
                      style={{ marginTop: "20px" }}
                      className="scrollable-div"
                    >
                      {cartDetails.map((item, index) => (
                        <Link key={index} to={`/product-detail/${item.product_id}`}>
                        <div  className="card mb-3 product-order">
                          <div className="card-body">
                            <div className="d-flex justify-content-between">
                              <div className="d-flex flex-row align-items-center">
                                <div>
                                  <img
                                    src={item.path}
                                    className="img-fluid rounded-3"
                                    alt="Shopping item"
                                    style={{ width: 65 }}
                                  />
                                </div>
                                <div className="ms-3">
                                  <h5>{item.product_name}</h5>
                                  <p className="small mb-0">
                                    ${item.price}/{item.color_name}/
                                    {item.size_name}
                                  </p>
                                </div>
                              </div>
                              <div className="d-flex flex-row align-items-center">
                                <div style={{ width: 50 }}>
                                  <h5 className="fw-normal mb-0">
                                    {item.quantity}
                                  </h5>
                                </div>
                                <div style={{ width: 80 }}>
                                  <h5 className="mb-0">
                                    ${item.quantity * item.price}
                                  </h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-3 mb-3">
                    </div>
                    {paymentId == 1 && (
                      <div
                        className="col-12 mt-3 "
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <button
                          onClick={handleShowConfirm}
                          style={{ padding: "10px", width: "50%" }}
                          className="btn-donate"
                        >
                          Delivery
                        </button>
                      </div>
                    )}
                    {paymentId == 2 && (
                      <div
                        className="col-12 mt-3 "
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          height: "70px",
                        }}
                      >
                        <Paypal
                          amount={totalPrice}
                          note={note}
                          paymentId={paymentId}
                          otherAddress={otherAddress}
                          payload={cartDetails}
                          setNote={setNote}
                          setOtherAddress={setOtherAddress}                          
                        />
                      </div>
                    )}
                    <ConfirmPay showConfirm = {showConfirm}
                     handleHideConfirm={handleHideConfirm}
                     setShowConfirm = {setShowConfirm}
                     paymentId = {paymentId}
                    note={note} 
                    otherAddress = {otherAddress}
                    setOpenOtherAddess={setOpenOtherAddess}
                    setNote={setNote}
                    setOtherAddress = {setOtherAddress}/>
                  </div>
                  <div className="mt-5">
                    <p style={{ color: "blue" }}>
                      After completing the order about 60-90 minutes (during
                      office hours)
                      <br /> MY JACKET will quickly call you to confirm the
                      delivery time.
                      <br /> MY JACKET Thank you !
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {!user ||
          (cartDetails.length < 1 && (
            <div
              className="col-12 mt-4"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Link
                to="/"
                style={{ padding: "10px", width: "50%", textAlign: "center" }}
                className="btn-donate"
              >
                Buy now
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
