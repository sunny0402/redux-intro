import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import reducer from "./reducers";
import middleware from "./middleware";
import { Provider } from "react-redux";
import { createStore } from "redux";

//Note:
// the exported App is already processed by the connect function
// and therefore a connected component.
// export default connect((state) => ({
//   loading: state.loading,
// }))(App);

const store = createStore(reducer, middleware);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)(App);
