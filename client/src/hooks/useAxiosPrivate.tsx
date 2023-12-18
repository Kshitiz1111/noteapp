import { useEffect } from "react";
import axios, { axiosPrivate } from "../api/axios";
import { useRefreshToken } from "./useRefresh";
import { setAuth } from "../features/userAuth/SliceAuth";
import { useAppDispatch, useAppSelector } from "../app/hooks";

export const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const getAuth = useAppSelector((state) => state.userAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${getAuth.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.response.eject(responseIntercept);
      axiosPrivate.interceptors.request.eject(requestIntercept);
    };
  }, [getAuth, refresh]);

  return axiosPrivate;
};
