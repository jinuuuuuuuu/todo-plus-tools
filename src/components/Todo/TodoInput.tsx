//할 일 입력 폼
import { ChangeEvent, FormEvent } from "react";

type Props = {
  todo: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

const TodoInput = ({ todo, onChange, onSubmit }: Props) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={todo}
          type="text"
          placeholder="To do..."
          maxLength={24}
          autoComplete="off"
        />
        <button>Add</button>
      </form>
    </div>
  );
};

export default TodoInput;
