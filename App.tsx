import { BrowserRouter, Routes, Route } from "react-router-dom";
import FiveWhyBuilder from "./components/FiveWhyBuilder";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FiveWhyBuilder />} />
      </Routes>
    </BrowserRouter>
  );
}
