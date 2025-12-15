import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Hotels from "./pages/Hotels";
import AddHotel from "./pages/addHotels";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/" element={<AddHotel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
