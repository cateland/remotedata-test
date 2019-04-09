import * as React from "react";
import { render } from "react-dom";

import { isNotAsked, isLoading, isFailure, RemoteData, isSuccess } from "./remotedata";

type Whatever<E, T> = { notAsked: boolean, loading: boolean, failure: E | null, data: T }
type Props<E, T> = { remoteData: RemoteData<E, T>, defaultValue: T, children: (params: Whatever<E, T>) => JSX.Element };

const RemoteDataComponent = <E, T>({ remoteData, defaultValue, children }: Props<E, T>) => {
    let notAsked: boolean, loading: boolean, failure: E | null, data: T;
    notAsked = true;
    loading = false;
    failure = remoteData.fold(
        null,
        null,
        (failure) => failure,
        () => null
    );
    data = remoteData.getOrElse(defaultValue);
    if (isLoading(remoteData)) {
        notAsked = false;
        loading = true;
        failure = null;
    }
    if (isFailure(remoteData)) {
        notAsked = false;
        loading = false;
    }
    if (isSuccess(remoteData)) {
        notAsked = false;
        loading = false;
        failure = null;
    }
    return children({ notAsked, loading, failure, data })
}

export default RemoteDataComponent;