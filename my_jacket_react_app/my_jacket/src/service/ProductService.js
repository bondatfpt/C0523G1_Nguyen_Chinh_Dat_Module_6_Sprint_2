import axios from "axios";

export const getAllProduct = async (page, name,id) => {
    let path = "http://localhost:8080/api/product"+ 
    (name === undefined && id === undefined ? `?page=${page}`
        : id === undefined && name !== undefined ? `?page=${page}&name=${name}`
            : `?page=${page}&name=${name}&categoryId=${id}`)
    try {
        const respone = await axios.get(path);
        console.log(respone.data);
        return respone.data;
    } catch (error) {
        console.log(error);
    }
}

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

export const getProductDetailByProductId  = async (id) => {
    try {
        const respone = await axios.get("http://localhost:8080/api/product/product-detail/detail/" + id);
        console.log(respone.data);
        return respone.data;
    } catch (error) {
        console.log(error);
    }
}

export const getSumAmountOfProduct  = async (id) => {
    try {
        const respone = await axios.get("http://localhost:8080/api/product/product-detail/amount/" + id);
        console.log(respone.data);
        return respone.data;
    } catch (error) {
        console.log(error);
    }
}


export const getProductById  = async (id) => {
    try {
        const respone = await axios.get("http://localhost:8080/api/product/detail/" + id);
        console.log(respone.data);
        return respone.data;
    } catch (error) {
        console.log(error);
    }
}

export const getColorOfProduct  = async (id) => {
    try {
        const respone = await axios.get("http://localhost:8080/api/image/product/" + id);
        console.log(respone.data);
        return respone.data;
    } catch (error) {
        console.log(error);
    }
}

export const getImagesOfColor  = async (colorId,productId) => {
    try {
        const respone = await axios.get(`http://localhost:8080/api/image/product/${colorId}/${productId}`);
        console.log(respone.data);
        return respone.data;
    } catch (error) {
        console.log(error);
    }
}

export const getSizeByColorIdOfProduct  = async (colorId,productId) => {
    try {
        const respone = await axios.get(`http://localhost:8080/api/size/color/product/${colorId}/${productId}`);
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

  
export const splitDescription = (input) => {
    let splitArray = input.split(".");
    let result = splitArray.join(".\n");
    return result;
  };