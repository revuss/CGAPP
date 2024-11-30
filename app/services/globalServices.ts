import axios from "axios";

function handleError(err: unknown) {
  if (axios.isAxiosError(err) && err.response) {
    const errorData = err.response.data;
    console.error("API Error:", errorData);
    return errorData?.message || err.message || "Unknown error";
  } else {
    console.error("Unexpected Error:", (err as Error).message || err);
    throw (err as Error).message || "An unexpected error occurred";
  }
}

function getBaseUrl() {
  return "https://cytogenesis-beta.vercel.app/api";
  // return "http://localhost:3000/api";
}

export async function getRequest(api: string, queryString: string = "") {
  try {
    const url = queryString
      ? `${getBaseUrl()}${api}?${queryString}`
      : `${getBaseUrl()}${api}`;
    const response = await axios.get(url, {
      withCredentials: true,
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
    return response.data;
  } catch (err: unknown) {
    const errorDetails = handleError(err);
    throw errorDetails;
  }
}

export async function postRequest(api: string, data: unknown) {
  try {
    const response = await axios.post(`${getBaseUrl()}${api}`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error("API Error Response:", err.response?.data || err.message);
      throw new Error(
        err.response?.data?.message || "Unknown API error occurred"
      );
    } else {
      console.error("Unexpected Error:", err);
      throw new Error("An unexpected error occurred");
    }
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
    const errorDetails = handleError(err);
    throw errorDetails;
  }
}

export async function putRequest(api: string, data: unknown) {
  try {
    const response = await axios.put(`${getBaseUrl()}${api}`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (err: unknown) {
    const errorDetails = handleError(err);
    throw errorDetails;
  }
}
