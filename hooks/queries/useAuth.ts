import { useMutation, useQuery } from "@tanstack/react-query";
import { getMe, postSignin, postSignup } from "@/api/auth";
import { router } from "expo-router";
import {
  deleteSecureStore,
  getSecureStore,
  saveSecureStore,
} from "@/utils/secureStore";
import { removeHeader, setHeader } from "@/utils/header";
import { useEffect } from "react";
import queryClient from "@/api/queryClient";
import {queryKeys} from "@/constants";

function useGetMe() {
  const { data, isSuccess, isError } = useQuery({
    queryFn: getMe,
    queryKey: [queryKeys.AUTH, queryKeys.GET_ME],
  });

  useEffect(() => {
    (async () => {
      if (isSuccess) {
        const accessToken = await getSecureStore("accessToken");
        setHeader("Authorization", `Bearer ${accessToken}`);
      }
    })();
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      removeHeader("Authorization");
      deleteSecureStore("accessToken");
    }
  }, [isError]);

  return { data };
}

function useSignup() {
  return useMutation({
    mutationFn: postSignup,
    onSuccess: () => router.replace("/auth/login"),
  });
}

function useLogin() {
  return useMutation({
    mutationFn: postSignin,
    onSuccess: async ({ accessToken }) => {
      await saveSecureStore("accessToken", accessToken);
      queryClient.fetchQuery({ queryKey: [queryKeys.AUTH, queryKeys.GET_ME] });
      router.replace("/");
    },
  });
}

function useAuth() {
  const signupMutation = useSignup();
  const loginMutation = useLogin();
  const { data } = useGetMe();

  const logout = () => {
    deleteSecureStore("accessToken");
    removeHeader("Authorization");
    queryClient.resetQueries({ queryKey: ["auth"] });
  };

  return {
    auth: {
      id: data?.id || "",
      nickname: data?.nickname || "",
    },
    signupMutation,
    loginMutation,
    logout,
  };
}

export default useAuth;
