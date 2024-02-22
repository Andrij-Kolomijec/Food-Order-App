import classes from "./Menu.module.css";
import { useContext } from "react";
import CartContext from "../context/CartContext";
import { currencyFormatter } from "../util/formatter";

export type Meal = {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  quantity?: number;
};

type MenuProps = {
  meals: Meal[];
};

export default function Menu({ meals }: MenuProps) {
  const { addItemToCart } = useContext(CartContext);

  return (
    <div className={classes.menu}>
      {meals.map((meal: Meal) => {
        return (
          <div className={classes.meal} key={meal.id}>
            <img
              title={meal.name}
              draggable={false}
              src={import.meta.env.VITE_PORT_MAIN + meal.image}
              alt={meal.name + " photo"}
            />
            <div className={classes.info}>
              <h2>{meal.name}</h2>
              <p>{currencyFormatter.format(+meal.price)}</p>
              <p>{meal.description}</p>
              <button onClick={() => addItemToCart!(meal.id)}>
                Add to Cart
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
