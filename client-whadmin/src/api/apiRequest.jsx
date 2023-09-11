import axiosInstance from "./axiosInterceptor";

export const getDataAPI = async url => {
  const res = await axiosInstance.get(`${url}`);
  return res;
};

export const postDataAPI = async (url, post) => {
  const res = await axiosInstance.post(`${url}`, post);
  return res;
};

export const putDataAPI = async (url, post) => {
  const res = await axiosInstance.put(`${url}`, post);
  return res;
};

export const patchDataAPI = async (url, post) => {
  const res = await axiosInstance.patch(`${url}`, post);
  return res;
};

export const deleteDataAPI = async (url, post) => {
  const res = await axiosInstance.delete(`${url}`, post);
  return res;
};
