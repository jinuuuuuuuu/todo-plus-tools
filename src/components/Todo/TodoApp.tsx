// 메인 컨테이너, 홈에서 바로 렌더링
import { ChangeEvent, useEffect, useState } from "react";
import { Todo } from "./Todo.model";
//import styles from "./TodoApp.module.scss";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

const TodoApp = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]); // todo.model.ts로 타입 분리

  // 로컬스토리지에서 불러오기
  useEffect(() => {
    const myTodos = localStorage.getItem("myTodos");
    if (myTodos) {
      setTodos(JSON.parse(myTodos));
    }
  }, []);
  // 로컬스토리지 저장
  useEffect(() => {
    localStorage.setItem("myTodos", JSON.stringify(todos));
  }, [todos]);

  const textInputHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setTodo(event.target.value);

  const todoSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 빈 문자열 방지
    if (todo.trim() === "") return;
    // todo 추가 시 객체로 넣기.
    const newTodo: Todo = {
      id: Date.now(), // 고유ID
      text: todo, // 입력한 텍스트
      done: false, // 기본값: 미완료
    };
    // 기존 배열에 새 할일 추가
    setTodos((prevArray) => [...prevArray, newTodo]);
    // 입력 필드 초기화
    setTodo("");
  };
  // 삭제 버튼
  const onDelete = (id: number) =>
    setTodos((prevArray) => prevArray.filter((item) => item.id !== id));
  // 완료 여부 토글
  const onToggleDone = (id: number) => {
    setTodos((prevArray) =>
      prevArray.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  return (
    <div>
      <h1>My Tasks ({todos.length})</h1>
      <TodoList todos={todos} onToggleDone={onToggleDone} onDelete={onDelete} />

      <TodoInput
        todo={todo}
        onChange={textInputHandler}
        onSubmit={todoSubmitHandler}
      />
    </div>
  );
};

export default TodoApp;
