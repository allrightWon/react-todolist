import "./App.css";
import { useReducer, createContext, useRef, useEffect } from "react";
import Container from "./components/Container";
import Header from "./components/Header";
import TodoEditor from "./components/TodoEditor";
import TodoList from "./components/TodoList";
import { arrayMove } from "@dnd-kit/sortable";

// const mockData = [
//   {
//     id: 0,
//     date: new Date(),
//     content: "임시 데이터 1번이요",
//     isDone: false,
//   },
//   {
//     id: 1,
//     date: new Date(),
//     content: "임시 데이터 2번이요",
//     isDone: false,
//   },
//   {
//     id: 2,
//     date: new Date(),
//     content: "임시 데이터 3번이요",
//     isDone: false,
//   },
//   {
//     id: 3,
//     date: new Date(),
//     content: "임시 데이터 4번이요",
//     isDone: false,
//   },
// ];

// Reducer
const todoReducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return action.data;
    case "CREATE":
      return [action.newTodo, ...state];
    case "DELETE":
      return state.filter((todo) => todo.id !== action.id);
    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, isDone: !todo.isDone } : todo
      );
    case "DRAG": {
      const oldIndex = state.findIndex((todo) => todo.id === action.activeId);
      const newIndex = state.findIndex((todo) => todo.id === action.overId);

      return arrayMove(state, oldIndex, newIndex);
    }
    default:
      return state;
  }
};

// Context
export const TodosStateContext = createContext();
export const TodosDispatchContext = createContext();

function App() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const idRef = useRef(6);

  // LocalStorage Get
  useEffect(() => {
    const storedData = localStorage.getItem("todos");
    if (!storedData) return;

    const parsedData = JSON.parse(storedData).map((todo) => ({
      ...todo,
      date: new Date(todo.date),
    }));

    dispatch({
      type: "INIT",
      data: parsedData,
    });

    if (parsedData.length > 0) {
      idRef.current = Math.max(...parsedData.map((todo) => todo.id)) + 1;
    }
  }, []);

  // LocalStorage Set
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // CREATE Function
  const createTodo = (content) => {
    dispatch({
      type: "CREATE",
      newTodo: {
        id: idRef.current++,
        content: content,
        date: new Date(),
        isDone: false,
      },
    });
  };

  // DELETE Function
  const deleteTodo = (id) => {
    dispatch({
      type: "DELETE",
      id,
    });
  };

  // TOGGLE Function
  const toggleDone = (id) => {
    dispatch({
      type: "TOGGLE",
      id,
    });
  };

  return (
    <div className="app-container">
      <TodosStateContext.Provider value={todos}>
        <TodosDispatchContext.Provider
          value={{ dispatch, createTodo, deleteTodo, toggleDone }}
        >
          <Container>
            <Header title={"TodoList"}></Header>
            <TodoEditor></TodoEditor>
            <TodoList></TodoList>
          </Container>
        </TodosDispatchContext.Provider>
      </TodosStateContext.Provider>
    </div>
  );
}

export default App;
