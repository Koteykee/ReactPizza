import { Header } from "./components/Header";
import { MainPage } from "./components/MainPage";
import { PizzaList } from "./components/PizzaList";
import { DessertsList } from "./components/DessertsList";
import { SodaList } from "./components/SodaList";
import { Footer } from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="bg-[#f5f5f5] min-h-screen">
      <Header />
      <div className="my-10">
        <MainPage />
      </div>
      <PizzaList />
      <DessertsList />
      <SodaList />
      <Footer />
    </div>
  );
}

export default App;
