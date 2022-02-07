//Library code. createStore is a store we created to store app state.

// The store should have four parts
// 1. The state
// 2. Get the state.
// 3. Listen to changes on the state.
// 4. Update the state

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
    // action start here with the app reducer being passed state
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
//todos is our reducer
function todos(state = [], action) {
  if (action.type === "ADD_TODO") {
    // concat returns a new array, so not modifying any state directly, so pure function
    return state.concat([action.todo]);
  } else if (action.type === "REMOVE_TODO") {
    // return new state array
    return state.filter((todo) => todo.id !== action.id);
  } else if (action.type === "TOGGLE_TODO") {
    return state.map((todo) => {
      todo.id !== action.id
        ? todo
        : // return new object with merge properties
          Object.assign({}, todo, { complete: !todo.complete });
    });
  } else {
    // return original state if receive an action type we're not concerned with
    return state;
  }
}

//another reducer. now state also keeeps track of goals
function goals(state = [], action) {
  switch (action.type) {
    case "ADD_GOAL":
      return state.concat([action.goal]);
    case "REMOVE_GOAL":
      return state.filter((goal) => goal.id !== action.id);
    default:
      return state;
  }
}

//root reducer
function app(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action),
  };
}

//Test our store by passing the todos function
const store = createStore(app);

//subsribe will call any listener functions when the state changes
store.subscribe(() => {
  console.log("The app state is now: ", store.getState());
});

//action must have a type property. actions change state.
store.dispatch({
  type: "ADD_TODO",
  todo: {
    id: 0,
    name: "Walk the dog",
    complete: false,
  },
});

store.dispatch({
  type: "ADD_TODO",
  todo: {
    id: 1,
    name: "Wash the car",
    complete: false,
  },
});

store.dispatch({
  type: "ADD_TODO",
  todo: {
    id: 2,
    name: "Go to the gym",
    complete: true,
  },
});

store.dispatch({
  type: "REMOVE_TODO",
  id: 1,
});

store.dispatch({
  type: "TOGGLE_TODO",
  id: 0,
});

store.dispatch({
  type: "ADD_GOAL",
  goal: {
    id: 0,
    name: "Learn Redux",
  },
});

store.dispatch({
  type: "ADD_GOAL",
  goal: {
    id: 1,
    name: "Lose 20 pounds",
  },
});

store.dispatch({
  type: "REMOVE_GOAL",
  id: 0,
});
