import Header from "./components/Header";
import Menu, { Meal } from "./components/Menu";
import { fetchAvailableMeals } from "./http";
import { useFetch } from "./hooks/useFetch";
import { CartContextProvider } from "./context/CartContext";

let fetchedData: Meal[];

export default function App() {
  const { isFetching, fetchedData: meals } = useFetch<Meal[]>(
    fetchAvailableMeals,
    []
  );

  fetchedData = meals;

  return (
    <CartContextProvider>
      <Header />
      {isFetching ? <p>Loading meals...</p> : <Menu meals={meals} />}
    </CartContextProvider>
  );
}

export { fetchedData };
