import { useContext, useState } from "react";
import classes from "./CheckoutForm.module.css";
import CartContext from "../context/CartContext";
import { sendUserOrder } from "../util/http";
import { currencyFormatter } from "../util/formatter";

export type FormEvent =
  | React.MouseEvent<HTMLButtonElement, MouseEvent>
  | React.FormEvent<HTMLFormElement>;

type Form = {
  onClose: (e: FormEvent) => void;
};

type Error = {
  message: string;
};

export default function CheckoutForm({ onClose }: Form) {
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<Error>();
  const { items, resetCart } = useContext(CartContext);

  const totalPrice = items
    .reduce((acc, item) => acc + +item.price * item.quantity!, 0)
    .toFixed(2);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const extras = formData.getAll("extras");
    const data = Object.fromEntries(formData.entries());
    data.extras = extras;

    try {
      const responseData = JSON.stringify({
        items: items,
        customer: data,
        total: totalPrice,
      });
      setIsSending(true);
      await sendUserOrder(responseData);
      setIsSending(false);
      console.log("Order submitted:", responseData);
      alert("Order submitted successfully!");
      onClose(e);
      resetCart!();
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
        console.error("Error submitting order:", error.message);
      }
      alert("Failed to submit order. Please try again later.");
    }
  }

  return (
    <>
      <form
        method="dialog"
        className={classes.submitForm}
        onSubmit={handleSubmit}
      >
        <h2>Checkout</h2>
        <p>Total amount {currencyFormatter.format(+totalPrice)}</p>
        <label htmlFor="name">Full Name</label>
        <input type="text" name="name" id="name" required />
        <label htmlFor="email">E-Mail Address</label>
        <input type="email" name="email" id="email" required />
        <label htmlFor="street">Street</label>
        <input type="text" name="street" id="street" required />
        <label htmlFor="postal">Postal Code</label>
        <input type="number" name="postal" id="postal" required />
        <label htmlFor="city">City</label>
        <input type="text" name="city" id="city" required />
        <fieldset>
          <legend>Extras</legend>
          <div className={classes.option}>
            <input type="checkbox" name="extras" id="fries" value="fries" />
            <label htmlFor="fries">Fries</label>
          </div>
          <div className={classes.option}>
            <input type="checkbox" name="extras" id="dip" value="dip" />
            <label htmlFor="dip">Dip</label>
          </div>
          <div className={classes.option}>
            <input type="checkbox" name="extras" id="napkins" value="napkins" />
            <label htmlFor="napkins">Napkins</label>
          </div>
        </fieldset>
        <div className={classes.buttons}>
          {isSending || error ? (
            <>
              <h3>
                {error ? "Failed to submit order." : "Submitting order..."}
              </h3>
              <button onClick={onClose}>Close</button>
            </>
          ) : (
            <>
              <button onClick={onClose}>Close</button>
              <button type="submit">Submit Order</button>
            </>
          )}
        </div>
      </form>
    </>
  );
}
