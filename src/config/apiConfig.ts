import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { getEnvConfig } from './envConfig';
import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { get } from 'lodash';
import { showToaster, startLoader, stopLoader } from '../helpers/utils';
import { tagTypes } from '../constants/constants';

export const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      silent?: boolean;
      params?: any;
      headers?: any;
      transformRequest?: any;
      onUploadProgress?: AxiosRequestConfig['onUploadProgress'];
    },
    unknown,
    unknown
  > =>
  async ({
    url,
    method,
    data,
    silent,
    headers,
    params,
    transformRequest,
    baseURL,
    cancelToken = undefined,
    onUploadProgress = () => {},
  }: any) => {
    try {
      if (!silent) {
        startLoader();
      }
      const result = await axiosInstance({
        url: url,
        method,
        data,
        transformRequest,
        params,
        headers,
        baseURL,
        cancelToken,
        onUploadProgress,
      });
      stopLoader();
      return { data: result.data };
    } catch (axiosError) {
      let error = axiosError as AxiosError;
      const err = error;
      if (!silent && err?.message) {
        showToaster(err.message, 'E');
      }
      if (get(error, 'response.status') === 402) {
        return {};
      }
      return {
        error: { ...err, data: error.response?.data },
      };
    } finally {
      stopLoader();
    }
  };

export const API = createApi({
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
  tagTypes: Object.values(tagTypes),
});

export const axiosInstance = axios.create({
  baseURL: getEnvConfig('API_URL'),
  headers: {
    // Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  },
});

export const setDeviceId = async (deviceId: string) => {
  axiosInstance.defaults.headers.common.DeviceId = deviceId;
};

export const setUserId = async (id: number) => {
  axiosInstance.defaults.headers.common.UserId = id;
};

export const removeAuthToken = () => {
  delete axiosInstance.defaults.headers.common.DeviceId;
  delete axiosInstance.defaults.headers.common.UserId;
};

axiosInstance.interceptors.request.use(async config => {
  console.log('config: ', config?.headers);
  return config;
});

axiosInstance.interceptors.response.use(
  response => {
    console.log('>>>>>>>>response: ', JSON.stringify(response?.data));
    if (response.data && response.data.error) {
      return Promise.reject(response);
    }
    return response;
  },
  error => {
    return Promise.reject(error);
  },
);
