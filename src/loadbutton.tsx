import * as React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";

import { pleaseLoadPosts } from "./actions";

const Button = ({ load } : { load: typeof pleaseLoadPosts}) => {
  return <button onClick={() => load()}>Load</button>;
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    load: pleaseLoadPosts,
  }, dispatch);


export default connect(
  undefined,
  mapDispatchToProps
)(Button);
