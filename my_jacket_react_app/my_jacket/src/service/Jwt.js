import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const saveJwt = (jwt) => {
  localStorage.setItem("jwt", jwt);
};

export const getIdFromJwt = () => {
  const jwt = localStorage.getItem("jwt");
  const decodedToken = jwtDecode(jwt);
  return decodedToken.sub;
};

export const getUsernameFromJwt = () => {
  const jwt = localStorage.getItem("jwt");
  const decodedToken = jwtDecode(jwt);
  return decodedToken.username;
};

export const getRolesFromJwt = () => {
  const jwt = localStorage.getItem("jwt");
  const decodedToken = jwtDecode(jwt);
  return decodedToken.roles;
};

export const removeJwt = () => {
  localStorage.removeItem("jwt");
};
