import * as React from "react";
import { connect } from "react-redux";

import { State, Post } from './apptypes';


import RemoteDataComponent from "./lib/RemoteDataComponent";
import { RemoteData } from "./lib/remotedata";

import { PostWithUserName, postWithAuthorName } from './selector';

type Props = {
    posts : RemoteData<string, PostWithUserName[]>
}

const RemotePostsWithUserName = ({ posts }: Props) => {
    return <RemoteDataComponent remoteData={posts} defaultValue={[]}>
        {({ notAsked, loading, failure, data }) => {
            if (notAsked) return <div>'Not asked yet...'</div>;
            if (loading) return <div>"Loading..."</div>;
            if (failure) return <div>`Error! ${failure}`</div>;
            return (
                <div>{JSON.stringify(data)}</div>
            );
        }}
    </RemoteDataComponent>
}

function mapStateToProps(state: State) {
    return { posts: postWithAuthorName(state) }
}

export default connect(mapStateToProps)(RemotePostsWithUserName);