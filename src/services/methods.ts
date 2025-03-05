import { isAxiosError } from "axios";
import { api } from "./axios";
import { ApiResponseError } from "./types";

// Default methods
export const _get = async (path: string, params: object = {}) => {
  const response = await api.get(path, { params });
  if (isAxiosError(response)) {
    const { error } = response.response?.data as ApiResponseError;
    throw new Error(error);
  }
  return response.data;
};

export const _post = async (
  path: string,
  data: object,
  params: object = {},
) => {
  const response = await api.post(path, data, { params });

  if (isAxiosError(response)) {
    const { error } = response.response?.data as ApiResponseError;
    throw new Error(error);
  }
  return response.data;
};

export const _patch = async (
  path: string,
  data: object,
  params: object = {},
) => {
  const response = await api.patch(path, data, { params });
  if (isAxiosError(response)) {
    const { error } = response.response?.data as ApiResponseError;
    throw new Error(error);
  }
  return response.data;
};

export const _put = async (path: string, data: object, params: object = {}) => {
  const response = await api.put(path, data, { params });
  if (isAxiosError(response)) {
    const { error } = response.response?.data as ApiResponseError;
    throw new Error(error);
  }
  return response.data;
};

export const _delete = async (path: string, params: object = {}) => {
  const response = await api.delete(path, { params });
  if (isAxiosError(response)) {
    const { error } = response.response?.data as ApiResponseError;
    throw new Error(error);
  }
  return response.data;
};
