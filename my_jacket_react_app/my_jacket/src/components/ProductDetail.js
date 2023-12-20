import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import {
  getProductDetailByProductId,
  getProductById,
  getColorOfProduct,
  getImagesOfColor,
  getSizeByColorIdOfProduct,
  getSumAmountOfProduct,
  splitDescription,
  getAmountOfSizeOfColorOfProduct,
  getIdOfProductDetail,
} from "../service/ProductService";
import { AppContext } from "../context/AppContext";
import { Formik, Form, Field } from "formik";
import { getIdFromJwt } from "../service/Jwt";
import { toast } from "react-toastify";
import {
  createCartDetail,
  getCartByUserId,
  insertOrUpdateCartDetail,
} from "../service/CartService";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [productDetails, setProductDetails] = useState();
  const [colorOfProducts, setColorOfProducts] = useState();
  const [colorId, setColorId] = useState();
  const [imagesOfColor, setImageOfColor] = useState();
  const [colorName, setColorName] = useState();
  const [sizesOfColor, setSizesOfColor] = useState();
  const [sumAmount, setSumAmount] = useState();
  const [sizeName, setSizeName] = useState();
  const [sizeId, setSizeId] = useState();
  const [isChoose, setIsChoose] = useState(false);
  const [productCode, setProductCode] = useState();
  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();

  const {
    amountProductDetail,
    setAmountProductDetail,
    amountSelect,
    setAmountSelect,
    isLogin,
    amountProductInCart,
    setAmountProductInCart,
    productDetailId,
    setProductDetailId,
    isProductInCart,
    fetchDataCartDetail,
    handleShowModal,
  } = useContext(AppContext);

  const handleCreateCartDetail = async () => {
    const jwt = localStorage.getItem("jwt");
    if (
      isLogin &&
      jwt &&
      amountSelect > 0 &&
      !isNaN(amountSelect) &&
      (amountSelect < amountProductDetail ||
        amountSelect === amountProductDetail)
    ) {
      const idLogin = getIdFromJwt(jwt);
      const cartId = await getCartByUserId(idLogin);
      const productDetailId = await getIdOfProductDetail(id, colorId, sizeId);
      setProductDetailId(productDetailId);
      if (!isProductInCart(productDetailId)) {
        const value = {
          cartId: cartId,
          productDetailId: productDetailId,
          quantity: amountSelect,
          accountId: idLogin,
        };
        const respone = await insertOrUpdateCartDetail(value);
        setAmountSelect(0);
        if (respone == 201) {
          fetchDataCartDetail();
          toast.success(
            <div style={{ color: "green", fontWeight: "bold" }}>
              <Link
                to="/cart"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <h5 style={{ color: "blue" }}>Product has added to cart</h5>
                <div className="row">
                  <div className="col-5">
                    <img
                      src={image}
                      alt="Product"
                      style={{ marginRight: "5px", width: "100%" }}
                    />
                  </div>
                  <div className="col-7">
                    <p>
                      {name} <br />
                      {colorName}/{sizeName}/{amountSelect}
                      <br />
                      Price: ${price}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <button
                      style={{ padding: "10px", width: "100%" }}
                      className="btn-donate"
                    >
                      See cart
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          );
        }
      } else {
        setProductDetailId(0);
        toast.info(
          <div style={{ color: "green", fontWeight: "bold" }}>
            <Link
              to="/cart"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <h6 style={{ color: "blue" }}>Product already in the cart.</h6>
              <div className="row">
                <div className="col-5">
                  <img
                    src={image}
                    alt="Product"
                    style={{ marginRight: "5px", width: "100%" }}
                  />
                </div>
                <div className="col-7">
                  <p>
                    {name} <br />
                    {colorName}/{sizeName}/{amountSelect}
                    <br />
                    Price: ${price}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <button
                    style={{ padding: "10px", width: "100%" }}
                    to="/cart"
                    className="btn-donate"
                  >
                    See cart
                  </button>
                </div>
              </div>
            </Link>
          </div>
        );
      }
    } else if (amountSelect > amountProductDetail) {
      toast.info(`This product only has ${amountProductDetail} left.`);
    } else if (amountSelect == 0 || isNaN(amountSelect)) {
      toast.warning("You have not selected a quantity!");
    } else if (!isLogin) {
      toast.warning("Please login to shopping.");
    }
  };

  const fetchDataProduct = async () => {
    const product = await getProductById(id);
    setProduct(product);
  };
  const fetchDataAmountProduct = async () => {
    const respone = await getSumAmountOfProduct(id);
    setSumAmount(respone.amount);
  };

  const fetchDataAmountProductOfColorOfSize = async () => {
    const respone = await getAmountOfSizeOfColorOfProduct(id, colorId, sizeId);
    setAmountProductDetail(respone.quantity);
  };

  const fetchDataProductDetails = async () => {
    const productDetails = await getProductDetailByProductId(id);
    setProductDetails(productDetails);
    if (colorId == undefined) {
      setColorId(productDetails[0].color.id);
      setColorName(productDetails[0].color.name);
      setSizeName(productDetails[0].size.name);
      setProductCode(productDetails[0].productDetailCode);
      setColorId(productDetails[0].color.id);
      setSizeId(productDetails[0].size.id);
      setName(productDetails[0].product.name);
      setPrice(productDetails[0].product.price);
    }
  };

  const fetchDataColorOfProducts = async () => {
    const colorOfProducts = await getColorOfProduct(id);
    setColorOfProducts(colorOfProducts);
  };

  const fetchDataImagesOfColor = async () => {
    const imagesOfColor = await getImagesOfColor(colorId, id);
    setImageOfColor(imagesOfColor);
    setImage(imagesOfColor[0].path);
  };
  const fetchDataSizesOfColor = async () => {
    const sizesOfColor = await getSizeByColorIdOfProduct(colorId, id);
    setSizesOfColor(sizesOfColor);
  };

  const handleChangeImageByColor = (
    colorId,
    colorName,
    productDetailCode,
    path
  ) => {
    setColorId(colorId);
    fetchDataImagesOfColor(colorId, id);
    setColorName(colorName);
    setProductCode(productDetailCode);
    setImage(path);
  };
  const handleChangeSize = (sizeName, sizeId) => {
    setSizeName(sizeName);
    setSizeId(sizeId);
  };

  const increaseAmount = () => {
    if (amountSelect < amountProductDetail) {
      setAmountSelect(amountSelect + 1);
    }
  };

  const decreaseAmount = () => {
    if (amountSelect > 0) {
      setAmountSelect(amountSelect - 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchDataProductDetails();
      await fetchDataProduct();
      await fetchDataColorOfProducts();
      await fetchDataAmountProduct();
      if (colorId !== undefined) {
        await fetchDataImagesOfColor();
        await fetchDataSizesOfColor();
        await fetchDataAmountProductOfColorOfSize();
      }
    };
    fetchData();
  }, [colorId, id, sizeId]);

  if (
    !product ||
    !productDetails ||
    !colorOfProducts ||
    !imagesOfColor ||
    !sizesOfColor
  ) {
    return null;
  }
  return (
    <section style={{ marginTop: "120px" }} className="section">
      {sumAmount > 0 && (
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="row gy-3">
                <Swiper
                  navigation={true}
                  modules={[Navigation]}
                  className="mySwiper"
                  initialSlide={0}
                  loop={true}
                >
                  {imagesOfColor.map((item, index) => (
                    <SwiperSlide key={index}>
                      <div style={{ height: "680px" }}>
                        <img className="w-100 rounded-2" src={item.path}></img>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div style={{ padding: "40px 60px" }} className="mt-3">
                <div className="mb-2">
                  <span>
                    <b>Description:</b>{" "}
                  </span>
                </div>
                <p>{splitDescription(product.description)}</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="row gy-3" style={{ padding: "40px 40px" }}>
                <div>
                  <h5>{product.name}</h5>
                  <p>Product code: {productCode}</p>
                  <h3 style={{ color: "blue" }}>
                    <b>Price: </b>${product.price}
                  </h3>
                  {amountProductDetail > 0 && (
                    <h6 style={{ color: "red" }}>
                      <b>
                        Only <span>{amountProductDetail}</span> products left in
                        stock
                      </b>
                    </h6>
                  )}
                  {amountProductDetail == 0 && (
                    <h6 style={{ color: "red" }}>
                      <b>Products are being imported</b>
                    </h6>
                  )}
                </div>
                <div className="mt-3">
                  <div className="mb-2">
                    <span>
                      <b>Select color:</b> {colorName}
                    </span>
                  </div>
                  <div className="row">
                    {colorOfProducts.map((item) => (
                      <div className="col-2 " key={item.color_id}>
                        <button
                          id="btn-color"
                          title={item.name}
                          onClick={() =>
                            handleChangeImageByColor(
                              item.color_id,
                              item.name,
                              item.product_detail_code,
                              item.path,
                              item.price
                            )
                          }
                          className="p-0 border-0 btn-color"
                        >
                          <img
                            className="rounded-2"
                            style={{ width: "40px", height: "40px" }}
                            src={item.path}
                          ></img>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-3">
                  <div className="mb-2">
                    <span>
                      <b>Select size: </b> {sizeName}
                    </span>
                  </div>
                  <div className="row">
                    {sizesOfColor.map((item) => (
                      <div key={item.id} className="col-2">
                        <button
                          id="btn-size"
                          className="btn btn-sm btn-outline-primary btn-size"
                          style={{ width: "40px" }}
                          onClick={() => handleChangeSize(item.name, item.id)}
                        >
                          {item.name}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-3">
                  <div className="mb-2">
                    <span>
                      <b> Enter a quantity:</b>{" "}
                    </span>
                  </div>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Small button group"
                  >
                    <button
                      id="decreaseAmount"
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={decreaseAmount}
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
                      name="amount"
                      onChange={(event) =>
                        setAmountSelect(parseInt(event.target.value))
                      }
                      value={amountSelect}
                      max={amountProductDetail}
                      onKeyDown={(event) => {
                        const key = event.key;
                        if (
                          key === "-" ||
                          key === "e" ||
                          key === "+" ||
                          key === "."
                        ) {
                          event.preventDefault();
                        }
                      }}
                      className="btn btn-outline"
                    />
                    <button
                      id="increaseAmount"
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={increaseAmount}
                    >
                      +
                    </button>
                  </div>
                </div>
                {amountProductDetail > 0 && isLogin && (
                  <div className="mt-4">
                    <button
                      onClick={handleCreateCartDetail}
                      className="btn-donate"
                    >
                      Add to cart
                    </button>
                  </div>
                )}
                 {amountProductDetail < 1 && (
                  <div  className="mt-4">
                    {/* <button  
                      className="btn-donate"
                    >
                      Go to shopping
                    </button> */}
                  </div>
                )}
                {!isLogin && (
                  <div className="mt-4">
                    <button onClick={handleShowModal} className="btn-donate">
                      Login to shopping
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {sumAmount == 0 && (
        <div><h3 style={{textAlign:"center", color:"blue"}}>Products are being imported</h3></div>
      )}
    </section>
  );
}
