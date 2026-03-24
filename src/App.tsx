import { Header } from "./components/Header";
import { MainPage } from "./components/MainPage";
import { PizzaList } from "./components/PizzaList";
import { DessertsList } from "./components/DessertsList";
import { SodaList } from "./components/SodaList";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="bg-[#f5f5f5] min-h-screen">
      <Header />
      <MainPage />
      <PizzaList />
      <DessertsList />
      <SodaList />
      <Footer />
    </div>
  );
}

export default App;
