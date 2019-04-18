import React, { Component } from 'react';
import { Provider } from "react-redux";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

import RemotePost from './example1/RemotePosts';
import RemotePostCount from './example2/RemotePostCount';
import RemotePostWithUserName from './example3/RemotePostWithUserName';
import store from "./store";
import Load from "./loadbutton";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <div className="App">
            <h2>Start editing to see some magic happen!</h2>
            <Load />
            <Tabs>
              <TabList>
                <Tab>Example 1</Tab>
                <Tab>Example 2</Tab>
                <Tab>Example 3</Tab>
              </TabList>
              <TabPanel><RemotePost /></TabPanel>
              <TabPanel><RemotePostCount /></TabPanel>
              <TabPanel><RemotePostWithUserName /></TabPanel>
            </Tabs>
          </div>
        </Provider>
      </div>
    );
  }
}

export default App;
