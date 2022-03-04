import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import productsReducer from "./product/reducer";
import category from "./categories/reducer";
import UsersReducer from "./users/reducer";

const middleware = [thunk];

export const store = createStore(
  combineReducers({
    product: productsReducer,
    categories: category,
    users: UsersReducer
  }),
  composeWithDevTools(applyMiddleware(...middleware))
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
