import React, { useEffect, useState } from "react";
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
} from "../service/ProductService";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [productDetails, setProductDetails] = useState();
  const [colorOfProducts, setColorOfProducts] = useState();
  const [colorId, setColorId] = useState();
  const [imagesOfColor, setImageOfColor] = useState();
  const [colorName, setColorName] = useState();
  const [sizesOfColor, setSizesOfColor] = useState();
  const [amount, setAmount] = useState();
  const [sizeName, setSizeName] = useState();
  const [isActive, setIsActive] = useState(false);

  const fetchDataProduct = async () => {
    const product = await getProductById(id);
    setProduct(product);
  };

  const fetchDataProductDetails = async () => {
    const productDetails = await getProductDetailByProductId(id);
    setProductDetails(productDetails);
    if (colorId == undefined) {
      setColorId(productDetails[0].color.id);
      setColorName(productDetails[0].color.name);
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

  const handleChangeImageByColor = (colorId, colorName) => {
    setColorId(colorId);
    fetchDataImagesOfColor(colorId, id);
    setColorName(colorName);
  };
  const handleChangeSize = (sizeName) => {
    setSizeName(sizeName);
  };
  useEffect(() => {
    const fetchData = async () => {
      await fetchDataProductDetails();
      await fetchDataProduct();
      await fetchDataColorOfProducts();
      if (colorId !== undefined) {
        await fetchDataImagesOfColor();
        await fetchDataSizesOfColor();
      }
    };
    fetchData();
  }, [colorId, id]);

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
          </div>
          <div className="col-lg-4">
            <div className="row gy-3" style={{ padding: "40px 40px" }}>
              <div>
                <h4>{product.name}</h4>
                <h4 style={{ color: "red" }}>
                  <b>Price: </b>${product.price}
                </h4>
              </div>
              <div className="mt-3">
                <div className="mb-2">
                  <span>
                    <b>Color:</b> {colorName}
                  </span>
                </div>
                <div className="row">
                  {colorOfProducts.map((item) => (
                    <div className="col-2 " key={item.color_id}>
                      <button 
                        title={item.name}
                        onClick={() =>
                          handleChangeImageByColor(item.color_id, item.name)
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
                    <b>Size: </b> {sizeName}
                  </span>
                </div>
                <div className="row">
                  {sizesOfColor.map((item) => (
                    <div key={item.id} className="col-2">
                      <button
                        className="btn btn-sm btn-outline-primary btn-size"
                        style={{ width: "40px" }}
                        onClick={() => handleChangeSize(item.name)}
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
                    <b>Quantity:</b>{" "}
                  </span>
                </div>
                <div className="">
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Small button group"
                  >
                    <button type="button" className="btn btn-outline-secondary">
                      -
                    </button>
                    <button
                      type="button"
                      disabled
                      className="btn btn-outline-secondary"
                    >
                      1
                    </button>
                    <button type="button" className="btn btn-outline-secondary">
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <div className="mb-2">
                  <span>
                    <b>Description:</b>{" "}
                  </span>
                </div>
                <p>{product.description}</p>
              </div>
              <div className="mt-3">
                <button className="btn-donate">Add to cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


