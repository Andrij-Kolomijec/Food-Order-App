// import { useEffect, useState } from "react";
import Menu from "./components/Menu";
import { fetchAvailableMeals } from "./http";
import Header from "./components/Header";
import { useFetch } from "./hooks/useFetch.js";

// type Meal = {
//   id: string;
//   name: string;
//   price: string;
//   description: string;
//   image: string;
// };

function App() {
  const {
    isFetching,
    // error,
    fetchedData: meals,
    // setFetchedData: setMeals,
  } = useFetch(fetchAvailableMeals, []);

  // const [meals, setMeals] = useState<Meal[]>([]);
  // const [isFetching, setIsFetching] = useState<boolean>(false);
  // const [error, setError] = useState<object | undefined>();

  // useEffect(() => {
  //   async function fetchMeals() {
  //     setIsFetching(true);
  //     try {
  //       const fetchedMeals = await fetchAvailableMeals();
  //       setMeals(fetchedMeals);
  //     } catch (error) {
  //       setError({
  //         message: error?.message || "Failed to fetch user meals.",
  //       });
  //     }
  //     setIsFetching(false);
  //   }

  //   fetchMeals();
  // }, []);

  return (
    <div>
      <Header />
      {isFetching ? <p>Loading meals...</p> : <Menu meals={meals} />}
    </div>
  );
}

export default App;
