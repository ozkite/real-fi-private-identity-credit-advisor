import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";

import useSWR, { type SWRConfiguration, type SWRResponse } from "swr";

export type TGetRequest = AxiosRequestConfig | null;

type SWRReturn<Data, Error> = SWRResponse<
  AxiosResponse<Data>["data"],
  AxiosError<Error>
>;

export type SWRConfig<Data = unknown, Error = unknown> = SWRConfiguration<
  AxiosResponse<Data>["data"],
  AxiosError<Error>
>;

export type IRequestError = AxiosError;

export const createFetcher = (): AxiosInstance => {
  const headers: AxiosRequestConfig["headers"] = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const client = axios.create({
    baseURL: "/api",
    headers,
  });

  return client;
};

export default function useRequest<Data = unknown, Error = unknown>(
  request: TGetRequest,
  config: SWRConfig<Data, Error> = {},
): SWRReturn<Data, Error> {
  return useSWR<AxiosResponse<Data>["data"], AxiosError<Error>>(
    request ? JSON.stringify(request) : null,
    () =>
      createFetcher()
        .request<Data>(request as AxiosRequestConfig<TGetRequest>)
        .then(({ data }) => data as Data),
    config,
  );
}
