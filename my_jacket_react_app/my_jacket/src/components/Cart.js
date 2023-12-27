import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { getAmountOfSizeOfColorOfProduct } from "../service/ProductService";
import {
  insertOrUpdateCartDetail,
  getCartByUserId,
  updateAmountCartDetail,
  deleteCartDetail,
} from "../service/CartService";
import { getIdFromJwt } from "../service/Jwt";
import { toast } from "react-toastify";
import ModalConfirm from "./ModalConfirm";
import { getUserByAccountId } from "../service/LoginService";
export default function Cart() {
  const inputRef = useRef(null);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [productDetail, setProductDetail] = useState();
  const {
    isLogin,
    cartDetails,
    totalPrice,
    fetchDataCartDetail,
    productDetailId,
    handleShowModal,
    isPay,
    handleDeleteCartDetail,
    isValid
  } = useContext(AppContext);

  

  useEffect(() => {
    fetchDataCartDetail();
  }, [isLogin, productDetailId, showModalDelete,isPay]);

  const increaseAmount = async (
    productDetailId,
    quantity,
    colorId,
    sizeId,
    productId
  ) => {
    const response = await getAmountOfSizeOfColorOfProduct(
      productId,
      colorId,
      sizeId
    );

    if (quantity < response.quantity) {
      const jwt = localStorage.getItem("jwt");
      if (jwt && isLogin) {
        const idLogin = getIdFromJwt(jwt);
        const user = await getUserByAccountId(idLogin);
        const cartId = await getCartByUserId(user.id);
        const value = {
          cartId: cartId,
          productDetailId: productDetailId,
          quantity: 1,
          userId: user.id,
        };
        await insertOrUpdateCartDetail(value);
        await fetchDataCartDetail();
      }
    } else {
      toast.info(`This product has only ${response.quantity} left.`);
    }
  };

  const decreaseAmount = async (productDetailId, quantity, productId) => {
    if (quantity > 1) {
      const jwt = localStorage.getItem("jwt");
      if (jwt && isLogin) {
        const idLogin = getIdFromJwt(jwt);
        const user = await getUserByAccountId(idLogin);
        const cartId = await getCartByUserId(user.id);
        const value = {
          cartId: cartId,
          productDetailId: productDetailId,
          quantity: -1,
          userId: user.id,
        };
        await insertOrUpdateCartDetail(value);
        await fetchDataCartDetail();
      }
    } else {
      toast.info(
        <div>
          <p style={{ color: "blue", fontSize: "14px" }}>
            Do you want to delete this product ?
          </p>
          <div className="mt-1">
            <button
              onClick={() => handleDeleteCartDetail(productId, productDetailId)}
              className="btn-donate"
            >
              Delete
            </button>
          </div>
        </div>
      );
    }
  };
  const handleShowModalDelete = (productDetail) => {
    setShowModalDelete(true);
    setProductDetail(productDetail);
  };

  const handleHideModalDelete = () => {
    setShowModalDelete(false);
  };

  if (!cartDetails) {
    return null;
  }
  return (
    <div>
      {isLogin && (
        <section className="h-100 h-custom" style={{ marginTop: "100px" }}>
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col">
                <div className="card">
                  <div className="card-body p-4">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="d-flex justify-content-between">
                          <div className="d-flex flex-row align-items-center">
                            <h5 className="mb-3">
                              <Link to="/" className="text-body">
                                <i className="fas fa-long-arrow-alt-left me-2" />
                                Continue shopping
                              </Link>
                            </h5>
                          </div>
                          {cartDetails.length > 0  && (
                            <div className="d-flex flex-row align-items-center">
                              <Link
                                to="/invoice"
                                style={{
                                  paddingLeft: "70px",
                                  paddingRight: "70px",
                                }}
                                className="btn-donate"
                              >
                                Pay immediately
                              </Link>
                            </div>
                          )}
                          {cartDetails.length < 1 && (
                            <div className="d-flex flex-row align-items-center">
                              <Link
                                to="/"
                                style={{
                                  paddingLeft: "70px",
                                  paddingRight: "70px",
                                }}
                                className="btn-donate"
                              >
                                Buy now
                              </Link>
                            </div>
                          )}
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <div>
                            <h5 className="mb-1">Shopping cart</h5>
                            <h5 className="mb-0">
                              You have {cartDetails.length} items in your cart
                            </h5>
                          </div>
                          {cartDetails.length > 0 && !isPay && (
                            <div>
                              <h4 style={{ color: "blue" }}>
                                Total: ${totalPrice}
                              </h4>
                            </div>
                          )}
                        </div>
                        {cartDetails.map((item, index) => (
                          <div key={index} className="card mb-3">
                            <div className="card-body">
                              <div className="d-flex justify-content-between">
                                <div className="d-flex flex-row align-items-center">
                                  <div>
                                    <Link
                                      to={`/product-detail/${item.product_id}`}
                                    >
                                      <img
                                        src={item.path}
                                        className="img-fluid rounded-3"
                                        alt="Shopping item"
                                        style={{ width: 65 }}
                                      />
                                    </Link>
                                  </div>
                                  <div className="ms-3">
                                    <h5>
                                      <Link
                                        to={`/product-detail/${item.product_id}`}
                                      >
                                        {item.product_name}
                                      </Link>
                                    </h5>
                                    <p className="small mb-0">
                                      Code: {item.productDetailCode}
                                      <br />
                                      Size: {item.size_name} <br />
                                      Color: {item.color_name}
                                    </p>
                                  </div>
                                </div>
                                <div className="d-flex flex-row align-items-center">
                                  <div
                                    className="btn-group"
                                    role="group"
                                    aria-label="Small button group"
                                  >
                                    <button
                                      type="button"
                                      className="btn btn-outline-primary"
                                      onClick={() =>
                                        decreaseAmount(
                                          item.productDetailId,
                                          item.quantity,
                                          item.product_id
                                        )
                                      }
                                    >
                                      -
                                    </button>
                                    <input
                                      style={{
                                        width: "60px",
                                        border: "1px solid blue",
                                        textAlign: "center",
                                      }}
                                      id="amount"
                                      type="number"
                                      min="0"
                                      value={item.quantity}
                                      readOnly
                                      onKeyDown={(event) => {
                                        const key = event.key;
                                        if (
                                          key === "-" ||
                                          key === "e" ||
                                          key === "+" ||
                                          key === "." ||
                                          key === 0
                                        ) {
                                          event.preventDefault();
                                        }
                                      }}
                                      className="btn btn-outline"
                                    />
                                    <button
                                      type="button"
                                      className="btn btn-outline-primary"
                                      onClick={async () =>
                                        await increaseAmount(
                                          item.productDetailId,
                                          item.quantity,
                                          item.color_id,
                                          item.size_id,
                                          item.product_id
                                        )
                                      }
                                    >
                                      +
                                    </button>
                                  </div>
                                  <div style={{ width: 50 }}></div>
                                  <div style={{ width: 80 }}>
                                    <h5 className="mb-0">
                                      ${item.quantity * item.price}
                                    </h5>
                                  </div>
                                  <a
                                    onClick={() => handleShowModalDelete(item)}
                                    style={{ color: "#cecece" }}
                                  >
                                    <i className="fas fa-trash-alt" />
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {!isLogin && (
        <section
          className="h-100 h-custom"
          style={{
            marginTop: "150px",
            textAlign: "center",
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="mt-4">
            <button
              style={{ width: "100%", color: "white" }}
              className="btn-donate"
              onClick={handleShowModal}
            >
              Login to Shopping
            </button>
          </div>
        </section>
      )}
      <ModalConfirm
        productDetail={productDetail}
        showModalDelete={showModalDelete}
        handleHideModalDelete={handleHideModalDelete}
      />
      
    </div>
  );
}
