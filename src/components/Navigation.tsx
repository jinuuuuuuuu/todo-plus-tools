// 네비게이션 바 (홈 + 상태전환 메뉴 + 라우팅 링크)
import { useState } from "react";
import { Link } from "react-router-dom";
import ConverterApp from "./Converter/ConverterApp";

const Navigation = () => {
  const [showConverter, setShowConverter] = useState<boolean>(false);
  return (
    <>
      <nav>
        <Link to="/">🏠 Home</Link> |{" "}
        <span onClick={() => setShowConverter((prev) => !prev)}>
          {showConverter ? "🔽 Hide Converter" : "🔁 Show Converter"}
        </span>{" "}
        | <Link to="/coin">💰 Coin Tracker</Link> |{" "}
        <Link to="/movies">🎬 Movie App</Link>
      </nav>
      {showConverter && <ConverterApp />}
    </>
  );
};

export default Navigation;
