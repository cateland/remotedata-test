import React, { Component } from 'react';
import { Provider } from "react-redux";

import RemotePost from './RemotePosts';
import RemotePostCount from './RemotePostCount';
import RemotePostWithUserName from './RemotePostWithUserName';
import store from "./store";
import Load from "./loadbutton";
import './App.css';
import findLastIndex from 'ramda/es/findLastIndex';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <div className="App">
            <h2>Start editing to see some magic happen!</h2>
            <Load />
            <div style={{display: 'flex'}}>
              <RemotePost />
              <hr />
              <RemotePostCount />
              <hr />
              <RemotePostWithUserName />
            </div>
          </div>
        </Provider>
      </div>
    );
  }
}

export default App;
