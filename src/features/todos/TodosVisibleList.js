import { connect } from "react-redux";
import { toggleTodo, VisibilityFilters } from "./todosAction";
import TodosList from "./TodosList";

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos;
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter((t) => t.completed);
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter((t) => !t.completed);
    default:
      throw new Error("Unknown filter: " + filter);
  }
};

// ownProps 변수로 TodosList의 부모 컴포넌트 props를 받을 수 있다.
const mapStateToProps = (state, ownProps) => {
  //console.log("mapStateToProps ownProps : ", ownProps);
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter),
  };
};

// ownProps 변수로 TodosList의 부모 컴포넌트 props를 받을 수 있다.
const mapDispatchToProps = (dispatch, ownProps) => {
  //console.log("mapDispatchToProps ownProps : ", ownProps);
  return {
    toggleTodo: (id) => dispatch(toggleTodo(id)),
    // 여기에 key-value로 액션을 디스패치하는 함수 추가
    // dispatch, // dispatch 자체도 재전달 가능
  };
};

/*
// sample
const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return Object.assign({}, ownProps, {
    todos: stateProps.todos[ownProps.userId],
    addTodo: (text) => dispatchProps.addTodo(ownProps.userId, text),
  });
};
*/

/**
 * state 와 dispatch는 각각
 * mapStateToProps 와 mapDispatchToProps 함수의 첫번재 인자로 전달됨
 * mapStateToProps 와 mapDispatchToProps 결과를 병합한 하나의 객체로
 * TodosList 컴포넌트에 전달 {...ownProps, ...stateProps, ...dispatchProps}
 */
export default connect(
  mapStateToProps,
  mapDispatchToProps
  /*, mergeProps */
)(TodosList);
