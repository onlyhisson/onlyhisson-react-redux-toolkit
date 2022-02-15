import React from "react";
import FilterLink from "../../components/FilterLink";
import { VisibilityFilters } from "./todosAction";

const TodosFooter = () => (
  <div>
    <span>Show: </span>
    <FilterLink filter={VisibilityFilters.SHOW_ALL}>All</FilterLink>
    <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>Active</FilterLink>
    <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>Completed</FilterLink>
  </div>
);

export default TodosFooter;
