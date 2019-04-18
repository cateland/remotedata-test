import * as RemoteData from "./lib/remotedata";

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type User = {
  id: number,
  name: string
}

export type State = {
  posts: RemoteData.RemoteData<string, Post[]>;
  users: RemoteData.RemoteData<string, User[]>
};

export const LOAD_POSTS = "LOAD_POSTS";
export const LOAD_POSTS_FAILURE = "LOAD_POSTS_FAILURE";
export const LOAD_POSTS_SUCCESS = "LOAD_POSTS_SUCCESS";

export type LoadPosts = {
  type: typeof LOAD_POSTS;
};

export type LoadPostsFailure = {
  type: typeof LOAD_POSTS_FAILURE;
  payload: string;
};

export type LoadPostsSuccess = {
  type: typeof LOAD_POSTS_SUCCESS;
  payload: Post[];
};

export type PostActionTypes = LoadPosts | LoadPostsFailure | LoadPostsSuccess;

export const LOAD_USERS = "LOAD_USERS";
export const LOAD_USERS_FAILURE = "LOAD_USERS_FAILURE";
export const LOAD_USERS_SUCCESS = "LOAD_USERS_SUCCESS";

export type LoadUsers = {
  type: typeof LOAD_USERS;
};

export type LoadUsersFailure = {
  type: typeof LOAD_USERS_FAILURE;
  payload: string;
};

export type LoadUsersSuccess = {
  type: typeof LOAD_USERS_SUCCESS;
  payload: User[];
};

export type UserActionTypes = LoadUsers | LoadUsersFailure | LoadUsersSuccess;
