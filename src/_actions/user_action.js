import axios from "axios";
import { LOGIN_USER, SIGNUP_USER, AUTH_USER } from "./types";

export function loginUser(dataTosubmit) {
  const request = axios
    .post("/api/login", dataTosubmit)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function signupUser(dataTosubmit) {
  const request = axios
    .post("/api/signup", dataTosubmit)
    .then((response) => response.data);

  return {
    type: SIGNUP_USER,
    payload: request,
  };
}

export function auth() {
  const request = axios.get("/api/auth").then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}
