import axios from "axios";

export const getHttp = async (path: string) => {
  const userObj: any = localStorage.getItem("techCheckPoint");
  const token = JSON.parse(userObj)?.token;

  const response = await axios.get(path, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response?.data?.data;
};

export const createHttp = async <T>(path: string, payload: T) => {
  const userObj: any = localStorage.getItem("techCheckPoint");
  const token = JSON.parse(userObj)?.token;

  const response = await axios.post(path, payload, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response?.data?.data;
};

export const createHttpWithMessage = async <T>(path: string, payload: T) => {
  const userObj: any = localStorage.getItem("techCheckPoint");
  const token = JSON.parse(userObj)?.token;

  const response = await axios.post(path, payload, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response?.data?.message;
};

export const updateHttp = async <T>(path: string, payload: T) => {
  const userObj: any = localStorage.getItem("techCheckPoint");
  const token = JSON.parse(userObj)?.token;

  const response = await axios.put(path, payload, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response?.data?.data;
};

export const createResponseType = typeof createHttp;
