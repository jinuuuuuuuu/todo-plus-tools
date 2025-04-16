// 라우터 설정
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// BrowserRouter를 Router라는 별칭(alias) 으로 사용
// import "./App.scss";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
//import ConverterApp from "./components/Converter/ConverterApp";
//import TodoApp from "./components/Todo/TodoApp";
import CoinTrackerApp from "./pages/CoinTrackerApp";
import MovieApp from "./pages/MovieApp";
//import SimpleTodoApp from "./pages/SimpleTodoApp";
import MovieDetail from "./pages/MovieDetail";

const App = () => (
  <Router basename="/todo-plus-tools">
    <Navigation />
    <hr />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<MovieApp />} />
      <Route path="/movies/:id" element={<MovieDetail />} />
      <Route path="/coin" element={<CoinTrackerApp />} />
    </Routes>
  </Router>
);
export default App;
