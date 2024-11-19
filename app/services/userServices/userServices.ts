import { postRequest } from "../globalServices";

export async function userVisit() {
  const response = await postRequest("/visit", "");
  if (response.cookie) {
    document.cookie = response.cookie;
  }
  return response;
}
