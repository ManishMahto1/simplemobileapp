import {apiClient} from './apiClient';
import {Post, User, Comment, Album, Photo} from '../types/api.types';

/**
 * Fetch all posts with pagination
 */
export const fetchPosts = async (
  page: number = 1,
  limit: number = 20,
): Promise<Post[]> => {
  const params = {
    _page: page.toString(),
    _limit: limit.toString(),
  };
  return apiClient.get<Post[]>('/posts', params);
};

/**
 * Fetch single post by ID
 */
export const fetchPostById = async (id: number): Promise<Post> => {
  return apiClient.get<Post>(`/posts/${id}`);
};

/**
 * Fetch all users
 */
export const fetchUsers = async (): Promise<User[]> => {
  return apiClient.get<User[]>('/users');
};

/**
 * Fetch single user by ID
 */
export const fetchUserById = async (id: number): Promise<User> => {
  return apiClient.get<User>(`/users/${id}`);
};

/**
 * Fetch posts by user ID
 */
export const fetchPostsByUserId = async (userId: number): Promise<Post[]> => {
  return apiClient.get<Post[]>('/posts', {userId: userId.toString()});
};

/**
 * Fetch comments for a post
 */
export const fetchCommentsByPostId = async (
  postId: number,
): Promise<Comment[]> => {
  return apiClient.get<Comment[]>('/comments', {postId: postId.toString()});
};

/**
 * Fetch albums
 */
export const fetchAlbums = async (): Promise<Album[]> => {
  return apiClient.get<Album[]>('/albums');
};

/**
 * Fetch photos from an album
 */
export const fetchPhotosByAlbumId = async (
  albumId: number,
): Promise<Photo[]> => {
  return apiClient.get<Photo[]>('/photos', {albumId: albumId.toString()});
};

/**
 * Search posts by title or body
 */
export const searchPosts = async (query: string): Promise<Post[]> => {
  const allPosts = await apiClient.get<Post[]>('/posts');
  const lowerQuery = query.toLowerCase();
  
  return allPosts.filter(
    post =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.body.toLowerCase().includes(lowerQuery),
  );
};
