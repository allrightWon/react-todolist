import "./TodoEditor.css";
import { useState, useContext } from "react";
import { TodosDispatchContext } from "../App";

const TodoEditor = () => {
  const { createTodo } = useContext(TodosDispatchContext);
  const [input, setInput] = useState("");

  const onChangeInput = (e) => {
    setInput(e.target.value);
  };

  const onClickAdd = () => {
    if (input !== "") {
      createTodo(input);
      setInput("");
    }
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      onClickAdd();
    }
  };

  return (
    <div className="todo-editor">
      <div className="todo-input-box">
        <input
          value={input}
          className="todo-input"
          type="text"
          onChange={onChangeInput}
          onKeyDown={onKeyDown}
          placeholder="오늘 할 일을 입력하세요"
        />
        <button className="todo-add-btn" onClick={onClickAdd}>
          <i className="bi bi-plus"></i>
        </button>
      </div>
    </div>
  );
};
export default TodoEditor;
