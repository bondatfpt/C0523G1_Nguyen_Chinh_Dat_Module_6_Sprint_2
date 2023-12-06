import axios from "axios";

export const login = async (loginRequest) => {
    try {
        const response  = await axios.post("http://localhost:8080/api/login",loginRequest);
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}