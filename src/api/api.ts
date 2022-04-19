import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';

/* Type friendly api requests and handlers for success and error */

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_BACKEND,
  headers: {
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': true,
  },
});

export function onRequestSuccess<T = Record<string, unknown>>(
  response: AxiosResponse<T>,
) {
  console.log('Request Successful!', response);

  return response;
}

export function onRequestError<T = Record<string, unknown>>(
  error: AxiosError<T>,
) {
  console.log('Request Failed!', error);

  return Promise.reject(error);
}

export async function getRequest<T = Record<string, unknown>>(
  url: string,
  config?: AxiosRequestConfig | undefined,
) {
  return api.get<T, AxiosResponse<T>>(url, config);
}

export async function postRequest<
  T = Record<string, unknown>,
  D = Record<string, unknown>,
>(url: string, data?: D | undefined, config?: AxiosRequestConfig | undefined) {
  return api
    .post<T, AxiosResponse<T>>(url, data, config)
    .then(onRequestSuccess)
    .catch(onRequestError);
}

export async function putRequest<
  T = Record<string, unknown>,
  D = Record<string, unknown>,
>(url: string, data?: D | undefined, config?: AxiosRequestConfig | undefined) {
  return api
    .put<T, AxiosResponse<T>>(url, data, config)
    .then(onRequestSuccess)
    .catch(onRequestError);
}

export async function deleteRequest<T = Record<string, unknown>>(
  url: string,
  config?: AxiosRequestConfig | undefined,
) {
  return api
    .delete<T, AxiosResponse<T>>(url, config)
    .then(onRequestSuccess)
    .catch(onRequestError);
}

export async function patchRequest<
  T = Record<string, unknown>,
  D = Record<string, unknown>,
>(url: string, data?: D | undefined, config?: AxiosRequestConfig | undefined) {
  return api
    .patch<T, AxiosResponse<T>>(url, data, config)
    .then(onRequestSuccess)
    .catch(onRequestError);
}
