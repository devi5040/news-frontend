import { BrowserRouter, Route, Routes } from "react-router-dom";
import Inshorts from "./Inshorts";
import GNews from "./GNews";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inshorts />} />
        <Route path="/g-news" element={<GNews />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
