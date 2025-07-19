import axiosInstance from "@/api/axios";
import { getSecureStore } from "@/utils/secureStore";
import { Profile } from "@/types";

type RequestUser = {
  email: string;
  password: string;
};

async function postSignup(body: RequestUser) {
  const { data } = await axiosInstance.post("/auth/signup", body);
  return data;
}

async function postSignin(body: RequestUser) {
  const { data } = await axiosInstance.post("/auth/signin", body);
  return data;
}

async function getMe(): Promise<Profile> {
  const accessToken = await getSecureStore("accessToken");
  const { data } = await axiosInstance.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
}
export { postSignup, postSignin, getMe };
