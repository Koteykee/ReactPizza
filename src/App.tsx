import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Header } from "./components/Header";
import { MainPage } from "./components/MainPage";
import { Footer } from "./components/Footer";
import { PizzaMenu } from "./components/PizzaMenu";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="bg-[#f5f5f5] min-h-screen">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/pizza" element={<PizzaMenu />} />
          {/* <Route path="/desserts" element={<DessertsMenu />} />
            <Route path="/drinks" element={<DrinksMenu />} /> */}
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
