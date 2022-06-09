import { combineReducers } from "redux";

import todos from "./todos";
import loading from "./loading";
import goals from "./goals";

//Note: this is then imported in src/index.js as:
//import reducers from './reducers'

export default combineReducers({
  todos,
  loading,
  goals,
});
