import axios from "axios";

function handleError(err: unknown) {
  if (axios.isAxiosError(err) && err.response) {
    console.error("API Error:", err.response.data);
    throw err.response.data;
  } else {
    console.error("Unexpected Error:", (err as Error).message || err);
    throw (err as Error).message || "An unexpected error occurred";
  }
}

function getBaseUrl() {
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
}

export async function getRequest(api: string, queryString: string = "") {
  try {
    const url = queryString
      ? `${getBaseUrl()}${api}?${queryString}`
      : `${getBaseUrl()}${api}`;
    const response = await axios.get(url, { withCredentials: true });
    return response.data;
  } catch (err: unknown) {
    handleError(err);
  }
}

export async function postRequest(api: string, data: unknown) {
  try {
    const response = await axios.post(`${getBaseUrl()}${api}`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (err: unknown) {
    handleError(err);
  }
}

export async function deleteRequest(api: string, data: unknown = {}) {
  try {
    const response = await axios.delete(`${getBaseUrl()}${api}`, {
      data,
      withCredentials: true,
    });
    return response.data;
  } catch (err: unknown) {
    handleError(err);
  }
}

export async function putRequest(api: string, data: unknown) {
  try {
    const response = await axios.put(`${getBaseUrl()}${api}`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (err: unknown) {
    handleError(err);
  }
}
