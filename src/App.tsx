import Header from "./components/Header";
import Menu, { Meal } from "./components/Menu";
import { fetchAvailableMeals } from "./util/http";
import { useFetch } from "./hooks/useFetch";
import { CartContextProvider } from "./context/CartContext";

let fetchedData: Meal[];

export default function App() {
  const {
    isFetching,
    fetchedData: meals,
    error,
  } = useFetch<Meal[]>(fetchAvailableMeals, []);

  fetchedData = meals;

  return (
    <CartContextProvider>
      <Header />
      {error || isFetching ? (
        <h1 className="void">{error ? error.message : "Loading meals..."}</h1>
      ) : (
        <Menu meals={meals} />
      )}
    </CartContextProvider>
  );
}

export { fetchedData };
