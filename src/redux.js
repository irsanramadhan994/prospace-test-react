const redux = require("redux");

const createStore = redux.createStore;

const initialState = {
  counter: 0,
};

const rootReducer = (state = initialState, action) => {
  if (action.type == "INC") {
    return {
      ...state,
      counter: state.counter + 1,
    };
  }

  if (action.type == "ADD") {
    return {
      ...state,
      counter: state.counter + action.value,
    };
  }
};

const store = createStore(rootReducer);

store.subscribe(()=>{
    console.log('[Subscription]',store.getState())
})

store.dispatch({ type: "INC" });
store.dispatch({ type: "ADD", value: 10 });

console.log(store.getState());
