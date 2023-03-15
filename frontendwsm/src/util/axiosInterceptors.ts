import axios from "axios";
import Cookies from "js-cookie";
import { ToastError } from "../components/common/toast/Toast";
import { CustomError } from "../middlewares/handlerError";
import historyObject from "./configRouter";
const { REACT_APP_BACKEND_APP = "http://be.wsm.zinza.com" } = process.env;
const httpClient = axios.create({
  baseURL: REACT_APP_BACKEND_APP,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  function (response) {
    return response;
  },

  function (error) {
    if (
      error.response.status !== 403 &&
      error.response.data.message.trim() !== "not found access token" &&
      error.response.data.message !== "jwt expired"
    ) {
      ToastError(error.response.data.message);
    }
    if (error.response.status === 500 && error.response.data.message === "jwt expired") {
      Cookies.remove("userID");
      historyObject.push("/login");
    }
    if (
      (error.response.data.code === 404 && error.response.data.message.trim() === "you are deleted") ||
      (error.response.data.code === 404 && error.response.data.message.trim() === "not found access token")
    ) {
      historyObject.push("/login");
    }
    if (error.response.data.code === 500) {
      historyObject.push("/error");
      throw new CustomError("error server");
    }

    throw new CustomError(error.response.data.message);
  }
);

const instanceUpload = axios.create({
  baseURL: REACT_APP_BACKEND_APP,
  headers: {
    "Content-Type": "multipart/formdata",
  },
});

// Before making request, do the following
instanceUpload.interceptors.request.use(
  (config: any) => {
    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

// With response data, do the following
instanceUpload.interceptors.response.use(
  (res) => {
    return res;
  },

  async (error) => {
    if (error.response.data.code === 500) {
      historyObject.push("/error");
      throw new CustomError("error server");
    }
    if (error.response.data.code !== 403) {
      ToastError(error.response.data.message);
    }
    if (error.response.status === 405) {
      ToastError(error.response.data.error);
    }
    throw new CustomError(error.response.data.message);
  }
);

export { httpClient, instanceUpload };
