import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TopBar from "./components/TopBar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<TopBar />} path="/*" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
