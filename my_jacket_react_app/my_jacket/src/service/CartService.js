import axios from "axios";

export const createCart = async (value) => {
    try {
        const respone = await axios.post("http://localhost:8080/api/cart/new",value);
        console.log(respone.status);
        return respone.status;
    } catch (error) {
        console.log(error);
    }
}

export const createCartDetail = async (value) => {
    try {
        const respone = await axios.post("http://localhost:8080/api/cart/detail/new",value);
        console.log(respone.status);
        return respone.status;
    } catch (error) {
        console.log(error);
    }
}
export const getCartByUserId = async (id) => {
    try {
        const respone = await axios.get("http://localhost:8080/api/cart/"+id);
        console.log(respone.data.cart_id);
        return respone.data.cart_id;
    } catch (error) {
        console.log(error);
    }
}

export const getCartDetail = async (accountId,cartId) => {
    try {
        const respone = await axios.get(`http://localhost:8080/api/cart/cart-detail/${accountId}/${cartId}`);
        console.log(respone.data);
        return respone.data;
    } catch (error) {
        console.log(error);
    }
}