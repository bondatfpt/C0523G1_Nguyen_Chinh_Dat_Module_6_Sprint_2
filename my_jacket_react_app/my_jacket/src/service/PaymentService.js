import axios from "axios";

export const findAll  = async () => {
    try {
        const respone = await axios.get("http://localhost:8080/api/payment");
        return respone.data;
    } catch (error) {
        console.log(error);
    }
}