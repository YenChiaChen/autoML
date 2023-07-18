import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { store } from "./store";
import { Provider } from "react-redux";
import NavBar from "./refactor/components/NavBar";
import DataExplorePage from "./refactor/DataExplorePage";
import LifeCyclePage from "./refactor/LifeCyclePage";
import AutoMLPage from "./refactor/AutoMLPage";
import PreprocessingPage from "./refactor/PreprocessingPage";

const App: React.FC = () => (
  <Router>
    <NavBar />
    <Routes>
      <Route path="/" element={<DataExplorePage />} />
      <Route path="/lifecycle" element={<LifeCyclePage />} />
      <Route path="/autoML" element={<AutoMLPage />} />
      <Route path="/preprocess" element={<PreprocessingPage />} />
    </Routes>
  </Router>
);

export default App;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
