import { postRequest } from "../globalServices";

export function userVisit() {
  return postRequest("/visit", "");
}
