import { User } from "../models/user";
import { fetchApi } from "./fetchApi";
import { ApiResponse } from "./response";

export interface IApiRepository {
  validarToken: (token: string) => User;

  //NOSONAR
  // getDocumentos: (arg0: { token: string; idDocumento: number }) => Documentos64;
  // postDocumentos: (arg1: {
  //   token: string;
  //   Nombre: string;
  //   MimeType: string;
  //   Contenido: string;
  //   RutaSC: string;
  // }) => Documentos64;
}
export type ParsedApiRepository = {
  [K in keyof IApiRepository]: IApiRepository[K] extends (
    arg0: infer P,
  ) => infer R
    ? (arg0: P) => Promise<ApiResponse<R>>
    : never;
};

export const ApiRepository: ParsedApiRepository = {
  validarToken: async (token) => {
    return fetchApi("", "", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // getDocumentos: async ({ token, idDocumento }) => {
  //   return fetchApi("variable_api_env", `direccion_api_a_apuntar`, {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: {
  //       idDocumento,
  //     },
  //   });
  // },
  // postDocumentos: async ({ token, Nombre, MimeType, Contenido, RutaSC }) => {
  //   return fetchApi("variable_api_env", "direccion_api_a_apuntar", {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: {
  //       Subcarpeta: RutaSC,
  //       Nombre,
  //       MimeType,
  //       Contenido,
  //       Etiqueta: "",
  //     },
  //   });
  // },
} as const;
