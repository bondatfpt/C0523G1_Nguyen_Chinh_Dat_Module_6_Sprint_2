import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import {toast} from "react-toastify";
import { createCartDetail,getCartByUserId} from "../service/CartService";

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

  const {
    amountProductDetail,
    setAmountProductDetail,
    amountSelect,
    setAmountSelect,
    isLogin,
  } = useContext(AppContext);


  const hanleCreateCartDetail = async () => {
    console.log("Is login:" + isLogin);
    if (isLogin) {
      const idLogin = getIdFromJwt();
      console.log("Who login:" + idLogin);
      const cartId = await getCartByUserId(idLogin);
      const productDetailId = await getIdOfProductDetail(id,colorId,sizeId);
      const value = {
        "quantity": amountSelect,
        "cartId" : cartId,
        "productDetailId": productDetailId
      };
    const respone = await createCartDetail(value);
    setAmountSelect(0);
    if (respone == 201){
      toast.success("Product added to cart");
    }
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
    }
  };

  const fetchDataColorOfProducts = async () => {
    const colorOfProducts = await getColorOfProduct(id);
    setColorOfProducts(colorOfProducts);
  };

  const fetchDataImagesOfColor = async () => {
    const imagesOfColor = await getImagesOfColor(colorId, id);
    setImageOfColor(imagesOfColor);
  };
  const fetchDataSizesOfColor = async () => {
    const sizesOfColor = await getSizeByColorIdOfProduct(colorId, id);
    setSizesOfColor(sizesOfColor);
  };

  const handleChangeImageByColor = (colorId, colorName, productDetailCode) => {
    setColorId(colorId);
    fetchDataImagesOfColor(colorId, id);
    setColorName(colorName);
    setProductCode(productDetailCode);
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
    !sizesOfColor ||
    !amountProductDetail
  ) {
    return null;
  }
  return (
    <section style={{ marginTop: "120px" }} className="section">
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
                <h6 style={{ color: "red" }}>
                  <b>
                    Only <span>{amountProductDetail}</span> products left in
                    stock
                  </b>
                </h6>
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
                            item.product_detail_code
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
              <div className="mt-4">
                <button onClick={hanleCreateCartDetail} className="btn-donate">Add to cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
