import * as R from 'ramda';

import { State } from './apptypes';
import * as RemoteData from './lib/remotedata';
import { Post, User } from './apptypes';

export type PostWithUserName = Post & { username: string };

const findUserName = (id: number, users: User[]): string => {
    const user = R.find(R.propEq('id', id), users);
    return R.propOr('default', 'username', user);
}

const userName: string = findUserName(1, [{ id: 1, name: "test" }]);

export const postCount = (state : State): RemoteData.RemoteData<string, number> => state.posts.map(posts => posts.length);

export const postWithAuthorName = (state: State): RemoteData.RemoteData<string, PostWithUserName[]> => {
    return RemoteData.map2(state.posts, state.users,
        (posts) => (users) => {
            return R.map(post => {
                const userName = findUserName(post.id, users);
                const updatedPost = R.assoc('username', userName, post);
                return updatedPost;
            }, posts);
        })
}