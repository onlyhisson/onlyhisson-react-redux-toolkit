import { combineReducers } from "redux";
import { RECEIVE_PRODUCTS, ADD_TO_CART } from "../../constants/ActionTypes";

const products = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        inventory: state.inventory - 1,
      };
    default:
      return state;
  }
};

const byIdReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return {
        ...state,
        ...action.products.reduce((obj, product) => {
          console.log("11111111111111111111");
          obj[product.id] = product;
          return obj;
        }, {}),
      };
    default:
      const { productId } = action;
      if (productId) {
        return {
          ...state,
          [productId]: products(state[productId], action),
        };
      }
      return state;
  }
};

// 상품 목록 저장
const visibleIdsReducer = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return action.products.map((product) => {
        console.log("22222222222222222222222222222");
        return product.id;
      });
    default:
      return state;
  }
};

// products: {byId: {…}, visibleIds: Array(3)}
export default combineReducers({
  byId: byIdReducer,
  visibleIds: visibleIdsReducer,
});

export const getProduct = (state, id) => state.byId[id];

export const getVisibleProducts = (state) =>
  state.visibleIds.map((id) => getProduct(state, id));
