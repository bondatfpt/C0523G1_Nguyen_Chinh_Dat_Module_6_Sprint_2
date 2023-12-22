import axios from "axios";

export const login = async (loginRequest) => {
    try {
        const response  = await axios.post("http://localhost:8080/api/login",loginRequest);
        return response;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const getUserByAccountId  = async (accountId) => {
    try {
        const response = await axios.get("http://localhost:8080/api/authentication/user/" + accountId);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}