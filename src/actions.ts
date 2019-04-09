import { Dispatch } from 'redux';

import {
  Post,
  LoadPosts,
  LoadPostsFailure,
  LoadPostsSuccess,
  LOAD_POSTS,
  LOAD_POSTS_FAILURE,
  LOAD_POSTS_SUCCESS,
  User,
  LoadUsers,
  LoadUsersFailure,
  LoadUsersSuccess,
  LOAD_USERS,
  LOAD_USERS_FAILURE,
  LOAD_USERS_SUCCESS,
} from "./apptypes";
import { reject } from 'q';


export const pleaseLoadPosts = () => async (dispatch: Dispatch): Promise<void> => {
  dispatch(loadPosts());
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return reject(`Request rejected with status ${response.status}`);
      }
    })
    .then(json => dispatch(loadPostsSuccess(json)))
    .catch(error => dispatch(loadPostsFailure(error)));
  dispatch(loadUsers());
  setTimeout(() => {
    fetch("https://jsonplaceholder.typicode.com/users1")
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return reject(`Request rejected with status ${response.status}`);
        }
      })
      .then(json => dispatch(loadUsersSuccess(json)))
      .catch(error => dispatch(loadUsersFailure(error)));
  }, 1000);
}

export function loadPosts(): LoadPosts {
  return {
    type: LOAD_POSTS
  };
}

export function loadPostsFailure(error: string): LoadPostsFailure {
  return {
    type: LOAD_POSTS_FAILURE,
    payload: error
  };
}

export function loadPostsSuccess(messages: Post[]): LoadPostsSuccess {
  return {
    type: LOAD_POSTS_SUCCESS,
    payload: messages
  };
}

export function loadUsers(): LoadUsers {
  return {
    type: LOAD_USERS
  };
}

export function loadUsersFailure(error: string): LoadUsersFailure {
  return {
    type: LOAD_USERS_FAILURE,
    payload: error
  };
}

export function loadUsersSuccess(messages: User[]): LoadUsersSuccess {
  return {
    type: LOAD_USERS_SUCCESS,
    payload: messages
  };
}
