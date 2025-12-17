import "./TodoList.css";
import { useState, useContext } from "react";
import { TodosStateContext } from "../App";
import { TodosDispatchContext } from "../App";
import TodoItem from "./TodoItem";
import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

const TodoList = () => {
  const todos = useContext(TodosStateContext);
  const { dispatch } = useContext(TodosDispatchContext);
  const [filterInput, setFilterInput] = useState("");
  const [filterType, setFilterType] = useState("ALL");
  const [sortType, setSortType] = useState("LATEST");

  // DnD
  const isSortable = filterType === "ALL" && sortType === "LATEST";

  const onDragEnd = (e) => {
    const { active, over } = e;

    if (!over) return;
    if (active.id === over.id) return;

    dispatch({
      type: "DRAG",
      activeId: active.id,
      overId: over.id,
    });
  };

  // Todo Search Filter
  const onChangeFilter = (e) => {
    setFilterInput(e.target.value);
  };

  const filteredTodos = [...todos]
    .filter((todo) =>
      todo.content.toLowerCase().includes(filterInput.toLowerCase())
    )
    .filter((todo) => {
      if (filterType === "ALL") return true;
      if (filterType === "ACTIVE") return !todo.isDone;
      if (filterType === "DONE") return todo.isDone;
    })
    .sort((a, b) => {
      if (isSortable) return 0;
      if (sortType === "LATEST") {
        return b.date - a.date;
      }
      if (sortType === "OLDEST") {
        return a.date - b.date;
      }
    });

  // Todo Sort Button Function
  const onClickSortBtn = (e) => {
    setSortType(e.target.value);
  };

  // Todo Filter Button Function
  const onClickFilterBtn = (e) => {
    setFilterType(e.target.value);
  };

  return (
    <div className="todo-list">
      <div className="todo-search-box">
        <input
          className="todo-search"
          onChange={onChangeFilter}
          type="text"
          placeholder="검색어를 입력하세요"
        />
      </div>
      <div className="todo-control-box">
        <div className="todo-sort">
          <button
            className={`sort-latest ${sortType === "LATEST" ? "active" : ""}`}
            onClick={onClickSortBtn}
            value="LATEST"
          >
            최신순
          </button>
          <span>|</span>
          <button
            className={`sort-oldest ${sortType === "OLDEST" ? "active" : ""}`}
            onClick={onClickSortBtn}
            value="OLDEST"
          >
            오래된순
          </button>
        </div>
        <div className="todo-filter">
          <button
            className={`filter-all ${filterType === "ALL" ? "active" : ""}`}
            onClick={onClickFilterBtn}
            value="ALL"
          >
            전체
          </button>
          <span>|</span>
          <button
            className={`filter-active ${
              filterType === "ACTIVE" ? "active" : ""
            }`}
            onClick={onClickFilterBtn}
            value="ACTIVE"
          >
            진행중
          </button>
          <span>|</span>
          <button
            className={`filter-done ${filterType === "DONE" ? "active" : ""}`}
            onClick={onClickFilterBtn}
            value="DONE"
          >
            완료
          </button>
        </div>
      </div>
      {filteredTodos.length === 0 ? (
        <div className="todo-empty">
          등록된 할 일이 없습니다.
          <br />할 일을 추가해보세요.
        </div>
      ) : isSortable ? (
        <DndContext onDragEnd={onDragEnd}>
          <ul className="todo-items">
            <SortableContext items={filteredTodos.map((todo) => todo.id)}>
              {filteredTodos.map((todo) => (
                <TodoItem todo={todo} key={todo.id}></TodoItem>
              ))}
            </SortableContext>
          </ul>
        </DndContext>
      ) : (
        <ul className="todo-items">
          {filteredTodos.map((todo) => (
            <TodoItem todo={todo} key={todo.id}></TodoItem>
          ))}
        </ul>
      )}
    </div>
  );
};
export default TodoList;
