import axios from "axios";

export const createInvoice = async (value) => {
    try {
      const respone = await axios.post(
        "http://localhost:8080/api/invoice/new",
        value
      );
      console.log(respone);
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
      const respone = await axios.get("http://localhost:8080/api/invoice/user/" + id);
      return respone;
    } catch (error) {
      console.log(error);
    }
  };
  export const getInvoiceDetailByInvoiceId = async (id) => {
    try {
      const respone = await axios.get("http://localhost:8080/api/invoice/invoice-detail/"+id);
      return respone.data;
    } catch (error) {
      console.log(error);
    }
  };

  export const getInvoicesByUserId= async (id) => {
    try {
      const respone = await axios.get("http://localhost:8080/api/invoice/getAll/"+id);
      return respone.data;
    } catch (error) {
      console.log(error);
    }
  };