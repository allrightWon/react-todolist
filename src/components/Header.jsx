import "./Header.css";
import { useContext } from "react";
import { TodosStateContext } from "../App";

const Header = ({ title }) => {
  const todos = useContext(TodosStateContext);

  const tasks = todos.filter((todo) => !todo.isDone).length;
  const complete = todos.filter((todo) => todo.isDone).length;

  return (
    <header className="header">
      <h1 className="todo-heading">{title}</h1>
      <div className="current-todo">
        <span>{tasks} Tasks</span>
        <em> · </em>
        <span>{complete} Completed</span>
      </div>
    </header>
  );
};
export default Header;
