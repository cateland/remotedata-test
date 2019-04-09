import * as React from "react";
import { connect } from "react-redux";

import { State, Post } from './apptypes';


import RemoteDataComponent from "./lib/RemoteDataComponent";
import { RemoteData } from "./lib/remotedata";

type Props = {
    postCount : RemoteData<string, number>
}

const RemotePostCount = ({ postCount }: Props) => {
    return <RemoteDataComponent remoteData={postCount} defaultValue={0}>
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
    return { postCount: state.posts.map(posts => posts.length) }
}

export default connect(mapStateToProps)(RemotePostCount);