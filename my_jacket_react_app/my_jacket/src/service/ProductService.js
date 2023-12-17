import axios from "axios";

export const getAllProduct = async (page, name, id) => {
  let path =
    "http://localhost:8080/api/product" +
    (name === undefined && id === undefined
      ? `?page=${page}`
      : id === undefined && name !== undefined
      ? `?page=${page}&name=${name}`
      : id !== undefined && name === undefined
      ? `?page=${page}&categoryId=${id}`
      : `?page=${page}&name=${name}&categoryId=${id}`);
  try {
    const respone = await axios.get(path);
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductByName = async (name) => {
 
    const respone = await axios.get(
      "http://localhost:8080/api/product/search/l"
    );
    return respone.data;
  
};

export const getProductLatestOfKid = async () => {
  try {
    const respone = await axios.get(
      "http://localhost:8080/api/product/latest-kid"
    );
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductLatestOfWomen = async () => {
  try {
    const respone = await axios.get(
      "http://localhost:8080/api/product/latest-women"
    );
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductLatestOfMen = async () => {
  try {
    const respone = await axios.get(
      "http://localhost:8080/api/product/latest-men"
    );
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductDetailByProductId = async (id) => {
  try {
    const respone = await axios.get(
      "http://localhost:8080/api/product/product-detail/detail/" + id
    );
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSumAmountOfProduct = async (id) => {
  try {
    const respone = await axios.get(
      "http://localhost:8080/api/product/product-detail/amount/" + id
    );
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (id) => {
  try {
    const respone = await axios.get(
      "http://localhost:8080/api/product/detail/" + id
    );
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const getColorOfProduct = async (id) => {
  try {
    const respone = await axios.get(
      "http://localhost:8080/api/image/product/" + id
    );
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const getImagesOfColor = async (colorId, productId) => {
  try {
    const respone = await axios.get(
      `http://localhost:8080/api/image/product/${colorId}/${productId}`
    );
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSizeByColorIdOfProduct = async (colorId, productId) => {
  try {
    const respone = await axios.get(
      `http://localhost:8080/api/size/color/product/${colorId}/${productId}`
    );
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAmountOfSizeOfColorOfProduct = async (productId,colorId, sizeId) => {
  try {
    const respone = await axios.get(
      `http://localhost:8080/api/product/product-detail/amount/${productId}/${colorId}/${sizeId}`
    );
    console.log(respone.data);
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const getIdOfProductDetail = async (productId,colorId, sizeId) => {
  try {
    const respone = await axios.get(
      `http://localhost:8080/api/product/product-detail/${productId}/${colorId}/${sizeId}`
    );
    console.log(respone.data.id);
    return respone.data.id;
  } catch (error) {
    console.log(error);
  }
};

export const truncateString = (input) => {
  if (input.length <= 20) {
    return input;
  } else {
    return input.substring(0, 15) + "...";
  }
};

export const splitDescription = (input) => {
  let splitArray = input.split(".");
  let result = splitArray.join(".\n");
  return result;
};
