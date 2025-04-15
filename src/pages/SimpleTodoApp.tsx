import { useState, useEffect, ChangeEvent } from "react";
import styles from "./SimpleTodoApp.module.scss";

//✅ Step 1: 타입 만들기
type Todo = {
  id: number;
  text: string;
  isDone: boolean;
};

const SimpleTodoApp = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]); // ✅ Step 2: 상태 타입 변경

  // ✅ 로컬스토리지에서 불러오기
  useEffect(() => {
    const myTodos = localStorage.getItem("myTodos");
    if (myTodos) {
      setTodos(JSON.parse(myTodos));
    }
  }, []);

  // ✅ 로컬스토리지 저장
  useEffect(() => {
    localStorage.setItem("myTodos", JSON.stringify(todos));
  }, [todos]);

  const textInputHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setTodo(event?.target.value);

  const todoSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // ✅ 빈 문자열 방지, .trim(): 문자열 양쪽 끝 공백 제거 메소드
    if (todo.trim() === "") {
      return;
    }
    // ✅ Step 3: 할 일 추가 시 객체로 넣기. 할 일 하나를 객체로 만들기 위해 newToDo라는 변수를 추가
    const newTodo: Todo = {
      id: Date.now(), // 고유 ID
      text: todo, // 입력한 텍스트
      isDone: false, // 기본값: 미완료
    };
    // ✅ 기존 배열에 새 할 일 객체를 추가
    setTodos((prevArray) => [...prevArray, newTodo]);
    // ✅ 입력 필드 초기화
    setTodo("");
  };

  // ✅ Step 5: 완료 토글 & 삭제 기능
  // ✅ 삭제 버튼 클릭 시 할 일을 삭제하는 함수
  const onDelete = (id: number) => {
    setTodos((prevArray) => prevArray.filter((item) => item.id !== id));
  };
  // ✅ 할 일을 클릭하면 완료 여부를 토글하는 함수
  const onToggleComplete = (id: number) => {
    setTodos((prevArray) =>
      prevArray.map((item) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item
      )
    );
  };

  return (
    <div>
      <div className={styles.app}>
        <h1>My Tasks ({todos.length})</h1>
        {/*✅ Step 4: 리스트 출력*/}
        <ul>
          {todos.map((item) => (
            <li
              key={item.id}
              className={item.isDone ? styles.done : styles.yet}
              title="Complete"
              onClick={() => onToggleComplete(item.id)}
            >
              {/*SCSS 모듈은 클래스명이 로컬에서 자동으로 바뀌기 때문에 "done"이 아니라 styles.done으로 써야됨 */}
              {/*클릭 시 토글 이벤트핸들러로 id 넘겨주기 => 클릭된 항목의 id가 전달되어 정확하게 해당 항목만 상태 변경됨.*/}
              {item.text}
              <span
                title="Delete"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(item.id);
                }}
              >
                ×
              </span>
            </li>
          ))}
        </ul>
        <hr />
        <form onSubmit={todoSubmitHandler}>
          <input
            onChange={textInputHandler}
            value={todo}
            type="text"
            placeholder="Write your To Do..."
            maxLength={16}
            autoComplete="off"
          />
          <button>Add</button>
        </form>
      </div>
    </div>
  );
};

export default SimpleTodoApp;
