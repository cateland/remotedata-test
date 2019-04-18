import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from 'redux-logger'
import rootReducer from "./reducer";

export default createStore(rootReducer, applyMiddleware(thunk, logger));
