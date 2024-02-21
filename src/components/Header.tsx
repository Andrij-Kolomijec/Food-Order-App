import { useRef, useContext } from "react";
import classes from "./Header.module.css";
import CartContext from "../context/CartContext";
import CartModal from "./CartModal";
import logo from "/logo.jpg";

type Modal = {
  open: () => void;
};

export default function Header() {
  const modal = useRef<Modal>();

  const cart = useContext(CartContext);

  const cartQuantity = cart.items.reduce(
    (acc, item) => acc + item.quantity!,
    0
  );

  function handleOpenCart() {
    modal.current?.open();
  }

  return (
    <>
      <CartModal ref={modal} title="Your Cart" quantity={cartQuantity} />
      <div className={classes.header}>
        <div>
          <img src={logo} alt="React Food Logo" />
          <h2> ReactFood</h2>
        </div>
        <h3 onClick={handleOpenCart}>Cart ({cartQuantity})</h3>
      </div>
    </>
  );
}
