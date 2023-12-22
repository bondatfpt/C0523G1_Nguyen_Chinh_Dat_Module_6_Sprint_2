import axios from "axios";

export const createCart = async (value) => {
  try {
    const respone = await axios.post(
      "http://localhost:8080/api/cart/new",
      value
    );
    return respone.status;
  } catch (error) {
    console.log(error);
  }
};

export const createCartDetail = async (value) => {
  try {
    const respone = await axios.post(
      "http://localhost:8080/api/cart/detail/new",
      value
    );
    return respone.status;
  } catch (error) {
    console.log(error);
  }
};
export const getCartByUserId = async (id) => {
  try {
    const respone = await axios.get("http://localhost:8080/api/cart/" + id);
    return respone.data.cart_id;
  } catch (error) {
    console.log(error);
  }
};

export const getCartDetail = async (accountId, cartId) => {
  try {
    const respone = await axios.get(
      `http://localhost:8080/api/cart/cart-detail/${accountId}/${cartId}`
    );
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const insertOrUpdateCartDetail = async (value) => {
  try {
    const respone = await axios.post(
      "http://localhost:8080/api/cart/cart-detail/new",
      value
    );
    return respone.status;
  } catch (error) {
    console.log(error);
  }
};

export const updateAmountCartDetail = async (value) => {
    try {
      const respone = await axios.post(
        "http://localhost:8080/api/cart/cart-detail/update-amount",
        value
      );
      return respone.status;
    } catch (error) {
      console.log(error);
    }
  };

  export const deleteCartDetail = async (userId,cartId,productId,productDetailId) => {
    try {
      const respone = await axios.delete(
        `http://localhost:8080/api/cart/cart-detail/${userId}/${cartId}/${productId}/${productDetailId}`);
      
      return respone.status;
    } catch (error) {
      console.log(error);
    }
  };

  export const deleteCartDetailFlowInvoice = async (userId,cartId) => {
    try {
      const respone = await axios.delete(
        `http://localhost:8080/api/cart/cart-detail/${userId}/${cartId}`);
      
      return respone.status;
    } catch (error) {
      console.log(error);
    }
  };


