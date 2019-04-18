import * as React from "react";
import { connect } from "react-redux";

import { State } from '../apptypes';


import RemoteDataComponent from "../lib/RemoteDataComponent";
import * as RemoteData from "../lib/remotedata";
import { postCount } from '../selector';

type Props = {
    postCount : RemoteData.RemoteData<string, number>
}

const RemotePostCount = ({ postCount }: Props) => {
    return <RemoteDataComponent remoteData={postCount} defaultValue={0} >
        {({ notAsked, loading, failure, data }) => {
            if (notAsked) return <div>"Not asked yet..."</div>;
            if (loading) return <div>"Loading..."</div>;
            if (failure) return <div>`Error! ${failure}`</div>;
            return (
                <div>{JSON.stringify(data)} Post have been loaded</div>
            );
        }}
    </RemoteDataComponent>
}

function mapStateToProps(state: State) {
    const count = postCount(state);
    console.error(count.inspect())
    return { postCount: count }
}

export default connect(mapStateToProps)(RemotePostCount);