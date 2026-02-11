import {
  useQueryValue as useQueryValueRender,
  useURLQuery as useURLQueryRender,
} from "./useQuery.render";
import {
  useQueryValue as useQueryValueRouter,
  useURLQuery as useURLQueryRouter,
} from "./useQuery.router";

type QueryMode = "render" | "router";

const QUERY_MODE: QueryMode =
  (import.meta.env.VITE_QUERY_MODE as QueryMode | undefined) ?? "render";

const useQueryValue =
  QUERY_MODE === "render" ? useQueryValueRender : useQueryValueRouter;
const useURLQuery =
  QUERY_MODE === "render" ? useURLQueryRender : useURLQueryRouter;

export { useQueryValue, useURLQuery };
