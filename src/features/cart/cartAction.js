import shop from "../../api/shop";
import * as types from "../../constants/ActionTypes";

/**
 * redux-thunk를 미들웨어로 삽입함으로 액션 실행시
 * dispatch, getState 함수 사용 가능
 */

// (1) 상품 목록 key-value 저장, (2) 화면에 출력될 상품 id값 목록
const receiveProducts = (products) => ({
  type: types.RECEIVE_PRODUCTS,
  products,
});

// 상품옥록조회, API 요청후 저장
export const getAllProducts = () => (dispatch) => {
  shop.getProducts((products) => {
    dispatch(receiveProducts(products));
  });
};

// (1) 카트에 상품 id 값 추가(cartReducer -> addedIdsReducer)
// (2) 카트에 추가된 상품 id - 상품 개수, key-value 저장(cartReducer -> addedIdsReducer, quantityByIdReducer)
// (3) 카트에 추가된 상품 재고 -1 처리(productsReducer -> byIdReducer)
const addToCartUnsafe = (productId) => ({
  type: types.ADD_TO_CART,
  productId,
});

// 카트에 상품 추가
// redux-thunk를 미들웨어로 store 를 생성했기 때문에
// dispatch(), getState() 함수 사용 가능
export const addToCart = (productId) => (dispatch, getState) => {
  if (getState().products.byId[productId].inventory > 0) {
    dispatch(addToCartUnsafe(productId));
  }
};

export const checkout = (products) => (dispatch, getState) => {
  const { cart } = getState();

  dispatch({
    type: types.CHECKOUT_REQUEST,
  });
  shop.buyProducts(products, () => {
    dispatch({
      type: types.CHECKOUT_SUCCESS,
      cart,
    });
    // Replace the line above with line below to rollback on failure:
    // dispatch({ type: types.CHECKOUT_FAILURE, cart })
  });
};
