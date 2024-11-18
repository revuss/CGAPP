import axios from "axios";

function handleError(err: unknown) {
  if (axios.isAxiosError(err) && err.response) {
    const errorData = err.response.data;
    console.error("API Error:", errorData);
    return errorData;
  } else {
    console.error("Unexpected Error:", (err as Error).message || err);
    throw (err as Error).message || "An unexpected error occurred";
  }
}

function getBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_API_URL || "https://cytogenesis-beta.vercel.app/api"
  );
}

export async function getRequest(api: string, queryString: string = "") {
  try {
    const url = queryString
      ? `${getBaseUrl()}${api}?${queryString}`
      : `${getBaseUrl()}${api}`;
    const response = await axios.get(url, { withCredentials: true });
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
    const errorDetails = handleError(err);
    throw errorDetails;
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
