import axios from "axios";
import {jwtDecode} from 'jwt-decode';

export const saveJwt = (jwt) => {
    localStorage.setItem('jwt',jwt);
}


export const decodeJwt = async (jwt) => {
     jwt =  await localStorage.getItem('jwt');
    const decodedToken = await jwtDecode(jwt);
    // console.log(decodedToken);
    return decodedToken;
}