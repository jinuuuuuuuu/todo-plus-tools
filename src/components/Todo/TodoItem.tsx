// 개별 할 일 항목
//import styles from "./TodoApp.module.scss";
import { Todo } from "./Todo.model";

interface Props {
  item: Todo;
  onToggleDone: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItem = ({ item, onToggleDone, onDelete }: Props) => {
  return (
    <li
      key={item.id}
      className="flex justify-between items-center px-4 py-2 border-b hover:bg-gray-100 cursor-pointer"
      title="Complete"
      onClick={() => onToggleDone(item.id)}
    >
      <span
        className={
          item.done ? "text-gray-400 line-through" : "text-black font-bold"
        }
      >
        {item.text}
      </span>
      <span
        title="Delete"
        className="ml-4 text-red-500 hover:text-red-700 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(item.id);
        }}
      >
        ×
      </span>
    </li>
  );
};

export default TodoItem;
