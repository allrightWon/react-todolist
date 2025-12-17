import { useContext } from "react";
import { TodosDispatchContext } from "../App";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const TodoItem = ({ todo }) => {
  const { deleteTodo, toggleDone } = useContext(TodosDispatchContext);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: todo.id });

  const onClickDelete = () => {
    deleteTodo(todo.id);
  };

  const onChangeDone = () => {
    toggleDone(todo.id);
  };

  return (
    <li
      className={`todo-item ${todo.isDone ? "done" : ""}`}
      ref={setNodeRef}
      {...attributes}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <div className="todo-date-box">
        <span className="todo-date">{todo.date.toLocaleDateString()}</span>
      </div>
      <div className="todo-content-box">
        <p className="todo-content">{todo.content}</p>
      </div>
      <div className="todo-action-box">
        <input
          className="todo-done-chk"
          onChange={onChangeDone}
          type="checkbox"
          checked={todo.isDone}
        />
        <button className="todo-delete-btn">
          <i className="bi bi-trash" onClick={onClickDelete}></i>
        </button>
        <span className="dnd-handle" {...listeners}>
          <div className="bi bi-list"></div>
        </span>
      </div>
    </li>
  );
};
export default TodoItem;
