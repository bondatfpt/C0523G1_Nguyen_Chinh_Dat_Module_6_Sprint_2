import axios from "axios";

export const createInvoice = async (value) => {
  try {
    const respone = await axios.post(
      "http://localhost:8080/api/invoice/new",
      value
    );
    return respone;
  } catch (error) {
    console.log(error);
  }
};

export const createInvoiceDetail = async (value) => {
  try {
    const respone = await axios.post(
      "http://localhost:8080/api/invoice/invoice-detail/new",
      value
    );
    return respone.status;
  } catch (error) {
    console.log(error);
  }
};

export const getInvoiceByUserId = async (id) => {
  try {
    const respone = await axios.get(
      "http://localhost:8080/api/invoice/user/" + id
    );
    return respone;
  } catch (error) {
    console.log(error);
  }
};
export const getInvoiceDetailByInvoiceId = async (id) => {
  try {
    const respone = await axios.get(
      "http://localhost:8080/api/invoice/invoice-detail/" + id
    );
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const getInvoicesByUserId = async (page, userId, date) => {
  let path =
    "http://localhost:8080/api/invoice/getAll" +
    (date === undefined 
      ? `?page=${page}&userId=${userId}` : `?page=${page}&userId=${userId}&date=${date}`
    )
  try {
    const respone = await axios.get(path);
    return respone.data;
  } catch (error) {
    console.log(error);
  }
};

export const formatDate =  (date) => {
  let datetime = new Date(date);
  let hours = datetime.getHours();
  let minutes = datetime.getMinutes();
  let day = datetime.getDate();
  let month = datetime.getMonth() + 1;
  let year = datetime.getFullYear();
  let formattedString =
    hours +
    ":" +
    (minutes < 10 ? "0" : "") +
    minutes +
    "/" +
    day +
    "-" +
    month +
    "-" +
    year;
    return formattedString;
};
