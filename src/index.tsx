import ReactDOM from "react-dom/client";
import 'bulma';
import '@fortawesome/fontawesome-free/css/all.css';
import "./index.css";
import { App } from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
