import { Navbar } from "./components/navBar/Navbar";
import { TableListContainer } from "./components/containers/tableListContainer/TableListContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Hero } from "./components/hero/Hero";
import { TableProvider } from "./context/TableProvider";

function App() {
  return (
    <>
      <TableProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/tables" element={<TableListContainer />} />
          </Routes>
        </BrowserRouter>
      </TableProvider>
    </>
  );
}

export default App;
