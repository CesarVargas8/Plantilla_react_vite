import axios, { AxiosError } from "axios";

import { URL_API } from "../utils/constants/env";
import type { ApiResponse } from "./response";

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
  message?: string | null;
  mensaje?: string | null;
  datos?: T | null;
  valor?: T | null;
  data?: T | null;
}

const getBaseUrl = (service: ApiServices): string => {
  switch (service) {
    case "api":
      return URL_API;
    case "":
      return "";
    default:
      throw new Error("Servicio desconocido");
  }
};

const getErrorMessage = (
  error: AxiosError,
  resData?: AxiosResponse<unknown>,
): string => {
  if (resData?.message) {
    return resData.message;
  }
  if (resData?.mensaje) {
    return resData.mensaje;
  }

  const status = error.response?.status;
  const statusMessages: Record<number, string> = {
    400: "Revise los datos ingresados e inténtelo de nuevo.",
    401: "Sin autorización para este módulo",
    403: "Sin permisos para esta acción",
    404: "Recurso no encontrado",
    500: "Error interno del servidor",
  };

  if (status && statusMessages[status]) {
    return statusMessages[status];
  }

  return error.message;
};

const handleAxiosError = (error: AxiosError): ApiResponse<never> => {
  const status = error.response?.status;
  const resData = error.response?.data as AxiosResponse<unknown> | undefined;
  const message = getErrorMessage(error, resData);

  return {
    error: true,
    message,
    type: status,
  };
};

export const fetchApi = async <T>(
  service: ApiServices,
  endpoint: string,
  options?: FetchApiOptions,
): Promise<ApiResponse<T>> => {
  const base = getBaseUrl(service);
  const cleanEndpoint = endpoint.replace(/^\/+/, "");
  const url = base
    ? cleanEndpoint
      ? `${base.replace(/\/+$/, "")}/${cleanEndpoint}`
      : base
    : cleanEndpoint;

  try {
    const response = await axios<AxiosResponse<T>>(url, {
      method: options?.method ?? "GET",
      headers: options?.headers,
      data: options?.body,
      params: options?.query,
      timeout: 60000,
    });

    const resData = response.data;
    if (resData.error) {
      return {
        error: true,
        message: resData.message ?? resData.mensaje ?? "Error en la petición",
      };
    }

    const data = (resData.datos ?? resData.valor ?? resData.data ?? null) as T;

    return {
      error: false,
      message: resData.message ?? "",
      mensaje: resData.mensaje ?? "",
      datos: data,
      data,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      return handleAxiosError(error);
    }

    return {
      error: true,
      message: error instanceof Error ? error.message : "Error desconocido",
    };
  }
};
