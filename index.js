// The store should have four parts
// 1. The state
// 2. Get the state.
// 3. Listen to changes on the state.
// 4. Update the state

//Library code. createStore is a store we created to store app state.
function createStore(reducer) {
  let state;
  let listeners = [];

  //returns an object that publicly exposes the getState() function
  const getState = () => state;

  //takes in functions that will be called when the state changes
  const subscribe = (a_listen_fn) => {
    listeners.push(a_listen_fn);
    return () => {
      listeners = listeners.filter((a_listener) => {
        return a_listener !== a_listen_fn;
      });
    };
  };

  const dispatch = (an_action) => {
    // reducer takes the state and action and modifies app state
    state = reducer(state, an_action);
    //since state likely changed after reducer was called
    //all methods(listeners) registered by the subsribe method are called
    listeners.forEach((a_listener) => a_listener());
  };

  return {
    getState,
    subscribe,
    dispatch,
  };
}

//App code
function todos(state = [], action) {
  if (action.type === "ADD_TODO") {
    // concat returns a new array, so not modifying any state directly, so pure function
    return state.concat([action.todo]);
  }
  return state;
}
