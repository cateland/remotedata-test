import {
    PostActionTypes,
    State,
    LOAD_POSTS,
    LOAD_POSTS_FAILURE,
    LOAD_POSTS_SUCCESS,
    LOAD_USERS,
    LOAD_USERS_FAILURE,
    LOAD_USERS_SUCCESS,
    UserActionTypes
} from "./apptypes";

import * as RemoteData from "./lib/remotedata";

const initialState = (): State => ({
    posts: RemoteData.of(),
    users: RemoteData.of(),
});

export default function appReducer(
    state = initialState(),
    action: PostActionTypes | UserActionTypes
): State {
    switch (action.type) {
        case LOAD_POSTS:
            return {
                ...state,
                posts: RemoteData.loading(),
            }

        case LOAD_POSTS_FAILURE:
            return  {
                ...state,
                posts: RemoteData.failure(action.payload),
            }

        case LOAD_POSTS_SUCCESS:
            return {
                ...state,
                posts: RemoteData.success(action.payload),
            }
        case LOAD_USERS:
            return {
                ...state,
                users: RemoteData.loading(),
            }

        case LOAD_USERS_FAILURE:
            return  {
                ...state,
                users: RemoteData.failure(action.payload),
            }

        case LOAD_USERS_SUCCESS:
            return {
                ...state,
                users: RemoteData.success(action.payload),
            }
    }
    return state;
}
