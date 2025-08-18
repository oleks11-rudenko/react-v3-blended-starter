import axios from 'axios';
import type { NewPost, Post } from '../types/post';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

interface PostsHttpRequest {
  posts: Post[];
  totalPosts: number;
}

export const fetchPosts = async (
  searchText: string,
  page: number,
  LIMIT: number
): Promise<PostsHttpRequest> => {
  const response = await axios.get<Post[]>('posts/', {
    params: {
      ...(searchText !== '' && { q: searchText }),
      _page: page,
      _limit: LIMIT,
    },
  });
  return {
    posts: response.data,
    totalPosts: Number(response.headers['x-total-count']),
  };
};

export const createPost = async (newPost: NewPost) => {
  const response = await axios.post<Post>('posts/', newPost);
  console.log('post', response.data);
  return response.data;
};

export const editPost = async (newDataPost: Post) => {
  const response = await axios.patch<Post>(`posts/${newDataPost.id}`, newDataPost);
  console.log('patch', response.data);
  return response.data;
};

export const deletePost = async (postId: number) => {
  const response = await axios.delete<Post>(`posts/${postId}`);
  console.log('delete', response.data);
  return response.data;
};
