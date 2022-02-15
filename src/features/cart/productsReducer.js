import { combineReducers } from "redux";
import { RECEIVE_PRODUCTS, ADD_TO_CART } from "../../constants/ActionTypes";

// 카트 추가시 해당 상품 재고 -1 처리
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

// 상품 목록 저장, 상품의 id를 key 값으로 상품 정보를 value 로 reduce
const byIdReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      // products : { byId: { 1:{...}, 2:{...}, 3:{...} } }
      return {
        ...state,
        ...action.products.reduce((obj, product) => {
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

// 화면에 출력될 상품 id값 목록
const visibleIdsReducer = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      // products { visibleIds: [1, 2, 3] }
      return action.products.map((product) => {
        return product.id;
      });
    default:
      return state;
  }
};

// 액션 분기 처리 타입2
// products: {byId: {…}, visibleIds: Array(3)}
export default combineReducers({
  byId: byIdReducer,
  visibleIds: visibleIdsReducer,
});

export const getProduct = (state, id) => state.byId[id];

export const getVisibleProducts = (state) =>
  state.visibleIds.map((id) => getProduct(state, id));
