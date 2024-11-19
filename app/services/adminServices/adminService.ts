import { getRequest, postRequest } from "../globalServices";

interface RegisterInterface {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
}

interface LoginInterface {
  email: string;
  password: string;
}

export function registerUserAPI(data: RegisterInterface) {
  return postRequest("/register", data);
}

export function loginUserAPI(data: LoginInterface) {
  return postRequest("/login", data);
}

export function logoutUserAPI() {
  return getRequest("/logout", "");
}
