import { createStore, combineReducers, applyMiddleware, compose } from "redux";

// 리듀서 import
import loadPostStore from "./modules/loadPostStore";
import user_reducer from "./modules/user_reducer";

import thunk from "redux-thunk";

const middlewares = [thunk];
const rootReducer = combineReducers({ loadPostStore, user_reducer });
const enhancer = applyMiddleware(...middlewares);

const store = createStore(rootReducer, enhancer);

export default store;
