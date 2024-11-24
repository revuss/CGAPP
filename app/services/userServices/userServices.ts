/* eslint-disable @typescript-eslint/no-explicit-any */
import { getRequest, postRequest } from "../globalServices";

export function visitAPI(data: any) {
  return postRequest("/visit", data);
}

export function addContactAPI(data: {
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
}) {
  return postRequest("/contact/addContact", data);
}

export function addCareerAPI(data: {
  name: string;
  email: string;
  phoneNumber: string;
}) {
  return postRequest("/career/addcareer", data);
}

export function getallProductsAPI() {
  return getRequest("/products/all", "");
}
