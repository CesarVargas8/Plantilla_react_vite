/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios, { AxiosError } from "axios";

import { URL_API } from "../utils/constants/env";
import { ApiResponse } from "./response";

type ApiServices = "api" | "";

type ApiMethod = "GET" | "POST" | "PUT" | "DELETE";

interface FetchApiOptions {
  headers?: Record<string, string>;
  body?: unknown;
  method?: ApiMethod;
  query?: Record<string, string>;
}

interface AxiosResponse<T> {
  error: boolean;
  message: string | null;
  mensaje: string | null;
  datos: T | null;
  valor: T | null;
  valor2: T | null;
  data: T | null;
  messageAdvertencia: T | null;
}

const getBaseUrl = (service: ApiServices): string => {
  switch (service) {
    case "api":
      return URL_API;
    case "":
      return "";
    default:
      throw new Error(`Servicio desconocido`);
  }
};

const buildQueryString = (query?: Record<string, string>): string => {
  if (!query) {
    return "";
  }

  return new URLSearchParams(query).toString();
};

const buildUrl = (
  service: ApiServices,
  endpoint: string,
  query?: string,
): string => {
  const base = getBaseUrl(service);
  const url = [base, endpoint].filter(Boolean).join("/");

  if (!query) {
    return url;
  }

  return `${url}?${query}`;
};

const extractResponseData = <T>(response: AxiosResponse<T>): T | null => {
  return response.datos ?? response.valor ?? response.data ?? null;
};

const getAxiosErrorMessage = (error: AxiosError): string => {
  const status = error.response?.status;
  if (!status) {
    return error.message;
  }

  const statusMessages: Record<number, string> = {
    400: "Revise los datos ingresados e inténtelo de nuevo.",
    401: "Sin autorización para este modulo",
    403: "Sin permisos para esta acción",
    404: "Recurso no encontrado",
  };

  if (status === 500) {
    const data = error.response?.data as { message?: string } | undefined;

    return data?.message ?? "Error desconocido";
  }

  return statusMessages[status] ?? error.message;
};

export const fetchApi = async <T>(
  service: ApiServices,
  endpoint: string,
  options?: FetchApiOptions,
): Promise<ApiResponse<T>> => {
  const query = buildQueryString(options?.query);
  const url = buildUrl(service, endpoint, query);

  try {
    const response = await axios<AxiosResponse<T>>(url, {
      method: options?.method ?? "GET",
      headers: options?.headers,
      data: options?.body,
    });
    if (response.data.error) {
      return {
        error: true,
        message: response.data.message ?? "Error desconocido",
      };
    }

    const data = extractResponseData(response.data);
    if (!data && response.data.error) {
      return {
        error: true,
        message: response.data.message ?? "Error desconocido",
        type: response.data.error,
      };
    }

    return {
      error: false,
      message: response.data.message ?? "",
      mensaje: response.data.mensaje ?? "",
      datos: data as T,
      data: data as T,
    };
  } catch (error) {
    console.error(error);
    if (error instanceof AxiosError) {
      const message = getAxiosErrorMessage(error);

      return {
        error: true,
        message,
        type: error.response?.status,
      };
    }

    return {
      error: true,
      message: "Error desconocido",
    };
  }
};
