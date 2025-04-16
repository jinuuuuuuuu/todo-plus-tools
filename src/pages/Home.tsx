// 기본 홈 (To-Do + 단위변환기 상태 전환 포함)
//import ConverterApp from "./components/Converter/ConverterApp";
//import TodoApp from "./components/Todo/TodoApp";
//import CoinTrackerApp from "./pages/CoinTrackerApp";
//import MovieList from "./pages/MovieList";
import TodoApp from "../components/Todo/TodoApp";
import SimpleTodoApp from "./SimpleTodoApp";

const Home = () => {
  return (
    <div>
      <h1>📋 My Dashboard</h1>
      <h1 className="text-3xl font-bold text-blue-500">Hello Tailwind!</h1>
      <hr />
      <TodoApp />
      <hr />
      <SimpleTodoApp />
    </div>
  );
};

export default Home;
