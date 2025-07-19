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

function useGetMe() {
  const { data, isSuccess, isError } = useQuery({
    queryFn: getMe,
    queryKey: ["auth", "getMe"],
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

function useAuth() {
  const signupMutation = useMutation({
    mutationFn: postSignup,
    onSuccess: () => router.replace("/auth/login"),
  });

  const loginMutation = useMutation({
    mutationFn: postSignin,
    onSuccess: async ({ accessToken }) => {
      await saveSecureStore("accessToken", accessToken);
      queryClient.fetchQuery({ queryKey: ["auth", "getMe"] });
      router.replace("/");
    },
  });

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
