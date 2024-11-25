import { BrowserRouter, Route, Routes } from "react-router-dom";
import Inshorts from "./Inshorts";
import GNews from "./GNews";
import CurretsApi from "./CurretsApi";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inshorts />} />
        <Route path="/g-news" element={<GNews />} />
        <Route path="/currents" element={<CurretsApi />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
