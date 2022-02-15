import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk"; // dispatch, getState
import { createLogger } from "redux-logger";
/* Reducer */
import counterReducer from "../features/counter/counterSlice";
import todosReducer from "../features/todos/todosReducer";
import visibilityFilter from "../features/todos/visibilityFilter";
import cartReducer from "../features/cart/cartReducer";
import productsReducer from "../features/cart/productsReducer";
/* Action */
import { getAllProducts } from "../features/cart/cartAction";

const middleware = [thunk];
if (process.env.NODE_ENV !== "production") {
  middleware.push(createLogger());
}

const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosReducer,
    visibilityFilter: visibilityFilter, // todos 조회 조건
    cart: cartReducer,
    products: productsReducer, // combineReducers
  },
  middleware: middleware,
});

/* store 초기화 직후 액션 호출 부분 */
store.dispatch(getAllProducts()); // 상품옥록조회

export default store;
