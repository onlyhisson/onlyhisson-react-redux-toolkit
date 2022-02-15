import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCount } from "./counterAPI";

const initialState = {
  value: 0,
  status: "idle",
};

const PREFIX = "counter";

// 아래 함수는 thunk를 호출하여 비동기적 로직을 수행하도록 한다.
// 일반적인 action 과 같이 dispatch 될수 있다. ex) dispatch(incrementAsync(10))
// thunk를 dispatch 함수와 함께 첫번째 인자로 호출한다.
// 그리고 나서 비동기 코드가 실행되고 다른 action 이 dispatch 된다.
// Thunks 는 대개 비동기 요청을 위하 사용된다.
export const incrementAsync = createAsyncThunk(
  `${PREFIX}/fetchCount`,
  async (amount) => {
    const response = await fetchCount(amount);
    return response.data; // return 값은 fulfilled 시 action의 payload 값이 된다. (A)
  }
);

// createAction + createReducer
export const counterSlice = createSlice({
  name: PREFIX, // action type의 prefix, ex) counter/increment...
  initialState,
  reducers: {
    // reducers 필드로 리듀서를 정의하고 관련 action을 생성
    increment: (state, action) => {
      // action = {type: 'counter/increment', payload: undefined}
      state.value += 1;
    },
    decrement: (state, action) => {
      // action = {type: 'counter/decrement', payload: undefined}
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action) => {
      // state.value = 이전 상태값
      // action = {type: 'counter/incrementByAmount', payload: Counter input 값}
      state.value += action.payload;
    },
  },
  // extraReducers field 는 외부에 정의된 action을 참조하기 위함
  // 외부 : createAsyncThunk, createSlice, actions
  extraReducers: (builder) => {
    // Object.keys(incrementAsync) => ['pending', 'rejected', 'fulfilled', 'typePrefix']
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.value += action.payload; // (A)
      });
  },
});

// 실행시 payload 를 입력 받고 순수 자바스크립트 객체로 action 을 리턴하는 함수
// 예) increment() --> {type: 'action name', payload: '입력 받은 값'}
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state) => state.counter.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const incrementIfOdd = (amount) => (dispatch, getState) => {
  // getState() : 애플리케이션의 현재 상태 트리 반환
  // dispatch(action) : 순수 자바스크립트 객체로 액션을 내보냄, 상태 변경할 수 있는 유일한 방법

  const currentValue = selectCount(getState());
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
  }
};

export default counterSlice.reducer;
