import {
  ADD_TO_CART,
  CHECKOUT_REQUEST,
  CHECKOUT_FAILURE,
} from "../../constants/ActionTypes";

const initialState = {
  addedIds: [],
  quantityById: {},
};

// 카트에 상품 id 값 추가
const addedIdsReducer = (state = initialState.addedIds, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      if (state.indexOf(action.productId) !== -1) {
        return state; // 카트에 이미 해당 상품이 추가된 경우는 처리X
      }
      return [...state, action.productId]; // 카트에 해당 상품이 최초 추가시
    default:
      return state;
  }
};

// 카트에 추가된 상품 id - 상품 개수, key-value 저장
const quantityByIdReducer = (state = initialState.quantityById, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { productId } = action;
      return { ...state, [productId]: (state[productId] || 0) + 1 };
    default:
      return state;
  }
};

export const getQuantity = (state, productId) =>
  state.quantityById[productId] || 0;

export const getAddedIds = (state) => state.addedIds;

// 액션 분기 처리 타입1
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHECKOUT_REQUEST:
      return initialState;
    case CHECKOUT_FAILURE:
      return action.cart;
    default:
      // 위에 선언된 액션 이외의 액션 처리
      return {
        addedIds: addedIdsReducer(state.addedIds, action),
        quantityById: quantityByIdReducer(state.quantityById, action),
      };
  }
};

export default cartReducer;
