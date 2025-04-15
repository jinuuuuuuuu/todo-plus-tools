// ReactDOM 렌더링
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(<App />);
//null 방지 위해 ! (non-null assertion)
