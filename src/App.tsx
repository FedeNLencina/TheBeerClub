import { Navbar } from "./components/navBar/Navbar";
import { TableListContainer } from "./components/containers/tableListContainer/TableListContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Hero } from "./components/hero/Hero";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/tables" element={<TableListContainer />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
