import React, { useState, useEffect, useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { updateQuantityAfterPay } from "../service/ProductService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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

const ConfirmPay = ({
  showConfirm,
  handleHideConfirm,
  setShowConfirm,
  paymentId,
  note,
  otherAddress,
  setNote,setOpenOtherAddess,setOtherAddress
}) => {
  const [secondsLeft, setSecondsLeft] = useState(15);
  const navigate = useNavigate();
  const [user,setUser] = useState();
  const {
    fetchDataCartDetail,
    cartDetails,
    totalPrice,
    isLogin,
    totalQuantity,
    setIsPay,
    setAmountItem,
  } = useContext(AppContext);
  const fetchDataUser = async () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      const idLogin = getIdFromJwt(jwt);
      const user = await getUserByAccountId(idLogin);
      setUser(user);
    }
  };
  const handleCreateInvoice = async () => {
    let respone;
    if (paymentId !== undefined) {
      const invoice = {
        note: note,
        otherLocation: otherAddress,
        totalPrice: totalPrice,
        totalQuantity: totalQuantity,
        paymentId: paymentId,
        userId: user.id,
      };
      respone = await createInvoice(invoice);
      if (respone && respone.status === 200) {
        const invoiceDetailArr = cartDetails.map((item) => ({
          quantity: item.quantity,
          totalPrice: item.price * item.quantity,
          invoiceId: respone.data.id,
          productDetailId: item.productDetailId,
        }));
        const respone1 = await createInvoiceDetail(invoiceDetailArr);
        if (respone.status === 200 && respone1 === 201) {
          setIsPay(true);
          toast.success("Order Success. The item will be delivered to your registered address after 3-5 days.");
          navigate("/history");
          const cartId = await getCartByUserId(user.id);
          await deleteCartDetailFlowInvoice(user.id, cartId);
          const invoiceDetails = await getInvoiceDetailByInvoiceId(
            respone.data.id
          );
          console.log("InvoiceS:" + invoiceDetails);
          const productDetails = invoiceDetails.map((item) => ({
            quantity: item.quantity,
            userId: user.id,
            invoiceId: item.invoice_id,
            productDetailId: item.product_detail_id,
          }));
          const status = await updateQuantityAfterPay(productDetails);
          setOpenOtherAddess(false);
          setAmountItem("");
          setNote("");
          setOpenOtherAddess("");
          fetchDataCartDetail();
        }
      }
    } else {
      toast.warn("You have not selected a payment method.");
    }
  };
  useEffect(() => {
    fetchDataUser();
    const timer = setInterval(() => {
      setSecondsLeft((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (secondsLeft === 0) {
      setShowConfirm(false);
      setSecondsLeft(15);
    }
  }, [secondsLeft]);

  return (
    <Modal show={showConfirm}>
      <Modal.Header
        style={{
          textAlign: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Modal.Title style={{ color: "blue" }}>Order confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <b style={{ color: "green" }}>
          Are you sure you want to order these products? After clicking agree,
          these products will be shipped to the address you registered. Please
          pay attention to your phone.
        </b>{" "}
        <br />
        <b style={{color:"red"}}> Modal will close in {secondsLeft} seconds.</b>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleHideConfirm}>
          Close
        </Button>
        <Button variant="primary"onClick={handleCreateInvoice}>Agree</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmPay;
