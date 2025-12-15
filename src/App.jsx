import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Hotels from "./pages/hotels";
import AddHotel from "./pages/addHotels";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/add-hotel" element={<AddHotel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
