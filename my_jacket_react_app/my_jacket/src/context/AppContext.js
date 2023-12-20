  import { createContext, useEffect, useState } from "react";
  import { findAll } from "../service/CategoryService";
  import { getIdFromJwt } from "../service/Jwt";
  import { getCartByUserId } from "../service/CartService";
  import { getCartDetail } from "../service/CartService";
  import { useParams } from "react-router-dom";

  export const AppContext = createContext({});
  export const AppProvider = ({ children }) => {
    const [nameSearch, setNameSearch] = useState();
    const [categoryId, setCategoryId] = useState();
    const [isSearch, setIsSearch] = useState(false);
    const [categories, setCategories] = useState();
    const [nameRecommend, setNameRecommend] = useState();
    const [amountProductDetail, setAmountProductDetail] = useState(0);
    const [amountSelect, setAmountSelect] = useState(0);
    const [isLogin,setIsLogin] = useState(false);
    const [amountProductInCart, setAmountProductInCart] = useState(0);
    const [cartDetails, setCartDetails] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [productDetailId,setProductDetailId] = useState();
    const [showModal, setShowModal] = useState(false);


    const isProductInCart = (productDetailId) => {
      return cartDetails.some((item) => item.productDetailId === productDetailId);
    };

    const handleShowModal = () => {
      setShowModal(true);
    };
  
    const handleHideModal = () => {
      setShowModal(false);
    };

    const fetchDataCartDetail = async () => {
      const jwt = localStorage.getItem("jwt");
      if (isLogin && jwt) {
        const accountId = getIdFromJwt(jwt);
        const cartId = await getCartByUserId(accountId);
        const cartDetails = await getCartDetail(accountId, cartId);
        setCartDetails(cartDetails);
        const sumPrice = cartDetails.reduce(
          (total, item) => total + item.quantity * item.price,
          0
        );
        // cartDetails.map(element => {
        //   setAmountProductDetail(element.quantity);
        // });
        setTotalPrice(sumPrice);
      }
    };
    const fetchDataCategories = async () => {
      const categories = await findAll();
      setCategories(categories);
    };

    useEffect(() => {
      const jwt = localStorage.getItem("jwt");
      if (jwt){
        setIsLogin(true);
      }
      fetchDataCategories();
    }, [isLogin]);

    return (
      <AppContext.Provider
        value={{
          nameSearch,
          setNameSearch,
          categoryId,
          setCategoryId,
          isSearch,
          setIsSearch,
          categories,
          nameRecommend,
          setNameRecommend,
          amountProductDetail,
          setAmountProductDetail,
          amountSelect,
          setAmountSelect,
          isLogin,setIsLogin,
          amountProductInCart,
          setAmountProductInCart,
          totalPrice, setTotalPrice,
          cartDetails,setCartDetails,fetchDataCartDetail,
          productDetailId,setProductDetailId,
          isProductInCart, showModal,handleHideModal,handleShowModal
        }}
      >
        {children}
      </AppContext.Provider>
    );
  };
