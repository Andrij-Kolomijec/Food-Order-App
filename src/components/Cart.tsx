import { useContext } from "react";
import classes from "./CartModal.module.css";
import CartContext from "../context/CartContext";

export default function Cart() {
  const { items, updateCartItemQuantity } = useContext(CartContext);

  const totalPrice = items.reduce(
    (acc, item) => acc + +item.price * item.quantity!,
    0
  );
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  return (
    <div className={classes.cart}>
      {items.length === 0 ? (
        <p>No items in the cart!</p>
      ) : (
        <>
          <ul>
            {items.map((item) => {
              return (
                <li key={item.name} className={classes.item}>
                  <div>
                    <p>
                      {item.name} - {item.quantity} x {item.price}€
                    </p>
                  </div>
                  <div className={classes.actions}>
                    <button
                      onClick={() => updateCartItemQuantity!(item.id, -1)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateCartItemQuantity!(item.id, +1)}
                    >
                      +
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <h4>Total: {formattedTotalPrice} €</h4>
        </>
      )}
    </div>
  );
}
