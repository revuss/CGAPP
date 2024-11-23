import { getRequest, postRequest } from "../globalServices";

export async function userVisit() {
  const response = await postRequest("/visit", "");
  if (response.cookie) {
    document.cookie = response.cookie;
  }
  return response;
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
