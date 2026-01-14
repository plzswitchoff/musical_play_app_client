import axiosInstance from "@/api/axios";
import { CreatePostDto, CreateVoteDto, Post, VoteOption } from "@/types";
import { getSecureStore } from "@/utils/secureStore";

async function createPost(body: CreatePostDto) {
  const accessToken = await getSecureStore("accessToken");
  const { data } = await axiosInstance.post("/posts", body, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
}

async function getPosts(page = 1) {
  const { data } = await axiosInstance.get(`/posts?page=${page}`);
  return data;
}

async function getPost(id: number) {
  const { data } = await axiosInstance.get(`/posts/${id}`);
  return data;
}

type RequestUpdatePost = {
  id: number;
  body: CreatePostDto;
};

async function updatePost({ id, body }: RequestUpdatePost) {
  const { data } = await axiosInstance.patch(`/posts/${id}`, body);
  return data;
}

async function deletePost(id: number) {
  const { data } = await axiosInstance.delete(`/posts/${id}`);
  return data;
}

async function createVote({
  postId,
  voteOptionId,
}: CreateVoteDto): Promise<{ postId: number; voteOption: VoteOption }> {
  const { data } = await axiosInstance.post(
    `/posts/${postId}/vote/${voteOptionId}`,
  );

  return data;
}

async function likePost(id: number): Promise<number> {
  const { data } = await axiosInstance.post(`/likes/${id}`);
  return data;
}

async function getMyPosts(page = 1): Promise<Post[]> {
  const { data } = await axiosInstance.get(`/posts/my?page=${page}`);
  return data;
}

async function getLikedPosts(page = 1): Promise<Post[]> {
  const { data } = await axiosInstance.get(`/likes?page=${page}`);
  return data;
}

export {
  createPost,
  getPosts,
  updatePost,
  getPost,
  deletePost,
  createVote,
  likePost,
  getMyPosts,
  getLikedPosts,
};
