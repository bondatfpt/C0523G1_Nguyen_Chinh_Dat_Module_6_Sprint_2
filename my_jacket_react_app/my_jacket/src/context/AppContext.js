import { createContext, useEffect, useState } from "react";
import { findAll } from "../service/CategoryService";
import { getIdFromJwt } from "../service/Jwt";
import { getCartByUserId } from "../service/CartService";
import { getCartDetail, deleteCartDetail } from "../service/CartService";
import { toast } from "react-toastify";
import { getUserByAccountId } from "../service/LoginService";

export const AppContext = createContext({});
export const AppProvider = ({ children }) => {
  const [nameSearch, setNameSearch] = useState();
  const [categoryId, setCategoryId] = useState();
  const [isSearch, setIsSearch] = useState(false);
  const [nameRecommend, setNameRecommend] = useState();
  const [amountProductDetail, setAmountProductDetail] = useState(0);
  const [amountSelect, setAmountSelect] = useState(0);
  const [isLogin, setIsLogin] = useState(false);
  const [amountProductInCart, setAmountProductInCart] = useState(0);
  const [cartDetails, setCartDetails] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [productDetailId, setProductDetailId] = useState();
  const [showModal, setShowModal] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [isPay,setIsPay] = useState(false);
  const [amountItem,setAmountItem] = useState();

  const isProductInCart = (productDetailId) => {
    return cartDetails.some((item) => item.productDetailId === productDetailId);
  };

  const handleDeleteCartDetail = async (productId, productDetailId) => {
    const jwt = localStorage.getItem("jwt");
    if (jwt && isLogin) {
      const idLogin = getIdFromJwt(jwt);
      const user = await getUserByAccountId(idLogin)
      const cartId = await getCartByUserId(user.id);
      const response = await deleteCartDetail(
        user.id,
        cartId,
        productId,
        productDetailId
      );
      fetchDataCartDetail();
      if (response === 201) {
        toast.success("Success deleted");
      }
    }
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
      const user = await getUserByAccountId(accountId)
      const cartId = await getCartByUserId(user.id);
      const cartDetails = await getCartDetail(user.id, cartId);
      setCartDetails(cartDetails);
      setAmountItem(cartDetails.length);
      if (cartDetails.length > 0) {
        const sumPrice = cartDetails.reduce(
          (total, item) => total + item.quantity * item.price,
          0
        );
        setTotalPrice(sumPrice);
        const totalQuantity = cartDetails.reduce(
          (total, item) => total + item.quantity,
          0
        );
        setTotalQuantity(totalQuantity);
      }
    }
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      setIsLogin(true);
    }
    fetchDataCartDetail();
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
        nameRecommend,
        setNameRecommend,
        amountProductDetail,
        setAmountProductDetail,
        amountSelect,
        setAmountSelect,
        isLogin,
        setIsLogin,
        amountProductInCart,
        setAmountProductInCart,
        totalPrice,
        setTotalPrice,
        cartDetails,
        setCartDetails,
        fetchDataCartDetail,
        productDetailId,
        setProductDetailId,
        isProductInCart,
        showModal,
        handleHideModal,
        handleShowModal,
        handleDeleteCartDetail,
        totalQuantity,isPay,setIsPay,amountItem,setAmountItem
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
