import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ScrollToTop } from "./components/ScrollToTop";
import { Header } from "./components/Header/Header";
import { MainPage } from "./components/MainPage/MainPage";
import { Footer } from "./components/Footer";
import { PizzaMenu } from "./components/Menu/PizzaMenu";
import { DessertsMenu } from "./components/Menu/DessertsMenu";
import { DrinksMenu } from "./components/Menu/DrinksMenu";
import { ItemPage } from "./components/ItemPage";
import { FavoritePage } from "./components/FavoritePage";
import { CartPage } from "./components/Cart/CartPage";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <main className="bg-[#f5f5f5] min-h-screen">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/pizza" element={<PizzaMenu />} />
          <Route path="/desserts" element={<DessertsMenu />} />
          <Route path="/drinks" element={<DrinksMenu />} />
          <Route path="/itemPage/:id" element={<ItemPage />} />
          <Route path="/favorite" element={<FavoritePage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
