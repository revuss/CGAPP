/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "../globalServices";

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

export function visitorsAPI(data: {
  pageSize?: number;
  pageIndex?: number;
  sortCol?: string;
  sortOrder?: string;
}) {
  return postRequest("/visitors", data);
}

export function deleteVisitorsAPI(id: string) {
  return deleteRequest(`/visitors/del?id=${id}`, "");
}

export function deleteCareerAPI(id: number) {
  return deleteRequest(`/career/del?id=${id}`, "");
}

export function careerDetailsAPI(data: {
  pageSize?: number;
  pageIndex?: number;
  sortCol?: string;
  sortOrder?: string;
}) {
  return postRequest("/career", data);
}

export function deleteContactAPI(id: number) {
  return deleteRequest(`/contact/del?id=${id}`, "");
}

export function contactDetailsAPI(data: {
  pageSize?: number;
  pageIndex?: number;
  sortCol?: string;
  sortOrder?: string;
}) {
  return postRequest("/contact", data);
}

export function updaterUserAPI(data: any) {
  return postRequest("/user/crts", data);
}

export function deleteUserAPI(userId: number) {
  return deleteRequest(`/userdts/del?id=${userId}`, "");
}

export function usersAPI(data: {
  pageSize?: number;
  pageIndex?: number;
  sortCol?: string;
  sortOrder?: string;
}) {
  return postRequest("/userdts", data);
}

export function createProductAPI(data: {
  productName: string;
  productDescription: string;
  tagLine: string;
  imageUrl: string;
}) {
  return postRequest("/products/crt", data);
}

export function deleteProductAPI(id: any) {
  return deleteRequest("/products/dlt", id);
}

export function updateProductAPI(data: {
  id: number;
  productName: string;
  productDescription: string;
  tagLine: string;
  imageUrl: string;
}) {
  return putRequest("/products/upt", data);
}

export function allProductsAPI(data: any) {
  return postRequest("/products", data);
}
