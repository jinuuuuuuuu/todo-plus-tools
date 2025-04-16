// 할 일 목록 출력
import TodoItem from "./TodoItem";
import { Todo } from "./Todo.model";

type Props = {
  todos: Todo[];
  onToggleDone: (id: number) => void;
  onDelete: (id: number) => void;
};

const TodoList = ({ todos, onToggleDone, onDelete }: Props) => {
  return (
    <ul>
      {todos.map((item) => (
        <TodoItem
          key={item.id}
          item={item}
          onToggleDone={onToggleDone}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default TodoList;
