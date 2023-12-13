import axios from "axios";

export const getProductLatestOfKid  = async () => {
    try {
        const respone = await axios.get("http://localhost:8080/api/product/latest-kid");
        console.log(respone.data);
        return respone.data;
    } catch (error) {
        console.log(error);
    }
}

export const getProductLatestOfWomen  = async () => {
    try {
        const respone = await axios.get("http://localhost:8080/api/product/latest-women");
        console.log(respone.data);
        return respone.data;
    } catch (error) {
        console.log(error);
    }
}

export const getProductLatestOfMen  = async () => {
    try {
        const respone = await axios.get("http://localhost:8080/api/product/latest-men");
        console.log(respone.data);
        return respone.data;
    } catch (error) {
        console.log(error);
    }
}

export const truncateString = (input) => {
    if (input.length <= 20) {
      return input;
    } else {
      return input.substring(0, 15) + '...';
    }
  };