import { createStore, combineReducers } from "redux";
import { Temp1Reducer } from "./Temp1Reducer";
const rootReducer = combineReducers({
  temp1: Temp1Reducer,
});
export const store = createStore(rootReducer);
