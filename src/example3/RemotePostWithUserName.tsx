import * as React from "react";
import { connect } from "react-redux";

import { State, Post } from '../apptypes';


import RemoteDataComponent from "../lib/RemoteDataComponent";
import * as RemoteData from "../lib/remotedata";

import { PostWithUserName, postWithAuthorName } from '../selector';

type Props = {
    posts : RemoteData.RemoteData<string, PostWithUserName[]>
}

const RemotePostsWithUserName = ({ posts }: Props) => {
    return <RemoteDataComponent remoteData={posts} defaultValue={[]}>
        {({ notAsked, loading, failure, data }) => {
            if (notAsked) return <div>'Not asked yet...'</div>;
            if (loading) return <div>"Loading..."</div>;
            if (failure) return <div>`Error! ${failure}`</div>;
            return (
                <table>
                    <thead>
                        <tr><td>ID</td><td>USERID</td><td>TITLE</td></tr>
                    </thead>
                    <tbody>
                        {data.map(post => <tr>
                            <td>{post.id}</td>
                            <td>{post.username}</td>
                            <td>{post.title}</td>
                        </tr>)}
                    </tbody>
                </table>
            );
        }}
    </RemoteDataComponent>
}

function mapStateToProps(state: State) {
    return { posts: postWithAuthorName(state) }
}

export default connect(mapStateToProps)(RemotePostsWithUserName);