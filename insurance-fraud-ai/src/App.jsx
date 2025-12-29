import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Story from "./pages/story";
import Analyze from "./pages/analyze";
import Result from "./pages/result";
import ImageAnalysis from "./pages/imageanalysis";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/story" element={<Story />} />
        <Route path="/analyze" element={<Analyze />} />
        <Route path="/result" element={<Result />} />
        <Route path="/imageanalysis" element={<ImageAnalysis />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
