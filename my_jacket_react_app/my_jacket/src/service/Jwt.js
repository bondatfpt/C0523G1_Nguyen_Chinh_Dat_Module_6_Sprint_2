import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const saveJwt = (jwt) => {
  localStorage.setItem("jwt", jwt);
};

export const getIdFromJwt = (jwt) => {
  if (jwt) {
    const decodedToken = jwtDecode(jwt);
    return decodedToken.sub;
  }
};

export const getUsernameFromJwt = (jwt) => {
  if (jwt) {
    const decodedToken = jwtDecode(jwt);
    return decodedToken.username;
  }
};

export const getRolesFromJwt = (jwt) => {
  if (jwt) {
    const decodedToken = jwtDecode(jwt);
    return decodedToken.roles;
  }
};

export const removeJwt = () => {
  localStorage.removeItem("jwt");
};
