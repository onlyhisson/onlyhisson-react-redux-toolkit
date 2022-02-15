import React from "react";
import TodosFooter from "./TodosFooter";
import TodosAdd from "./TodosAdd";
import TodosVisibleList from "./TodosVisibleList";

export function Todos() {
  return (
    <div>
      <TodosAdd />
      <TodosVisibleList def={"ownProps test"} />
      <TodosFooter />
    </div>
  );
}
