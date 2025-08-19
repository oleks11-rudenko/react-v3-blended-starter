import axios from 'axios';
import type { NewPost, Post } from '../types/post';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

// GET

interface PostsHttpResponse {
  posts: Post[];
  totalPosts: number;
}

export async function fetchPosts(searchText: string, page: number): Promise<PostsHttpResponse> {
  const { data, headers } = await axios.get<Post[]>('posts/', {
    params: {
      ...(searchText !== '' && { q: searchText }),
      _page: page,
      _limit: 8,
    },
  });
  return {
    posts: data,
    totalPosts: Number(headers['x-total-count']),
  };
}

// CREATE

export async function createPost(newPost: NewPost): Promise<Post> {
  const { data } = await axios.post<Post>('posts/', newPost);
  return data;
}

// PATCH

export async function editPost(newDataPost: Post): Promise<Post> {
  const { data } = await axios.patch<Post>(`posts/${newDataPost.id}`, newDataPost);
  return data;
}

// DELETE

export async function deletePost(postId: number): Promise<Post> {
  const { data } = await axios.delete<Post>(`posts/${postId}`);
  return data;
}
