import React from "react";
import { connect } from "react-redux";
import { addTodo } from "./todosAction";

const AddTodo = ({ dispatch }) => {
  let input;

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }
          dispatch(addTodo(input.value));
          input.value = "";
        }}
      >
        <input ref={(node) => (input = node)} />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};

/**
 *  connect() 함수의 두번째 인자로 mapDispatchToProps를 입력하지 않으면
 *  디폴트로 dispatch를 받는다. 예) const AddTodo = ({ dispatch }) => {...}
 */
export default connect()(AddTodo);
