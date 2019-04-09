import * as R from 'ramda';

import { State } from './apptypes';
import { map2, RemoteData } from './lib/remotedata';
import { Post, User } from './apptypes';
import update from 'ramda/es/update';

export type PostWithUserName = Post & { username: string };

const findUserName = (id: number, users: User[]): string => {
    const user = R.find(R.propEq('id', id), users);
    return R.propOr('default', 'username', user);
}

const userName: string = findUserName(1, [{ id: 1, name: "test" }]);
const test = R.assoc('username', { id: 1, userId: 1, title: 'title', body: 'body' }, userName)

export const postWithAuthorName = (state: State): RemoteData<string, PostWithUserName[]> => {
    return map2(state.posts, state.users,
        (posts) => (users) => {
            return R.map(post => {
                const userName = findUserName(post.id, users);
                const updatedPost = R.assoc('username', userName, post);
                return updatedPost;
            }, posts);
        })
}