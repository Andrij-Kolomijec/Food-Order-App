import classes from "./CartModal.module.css";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Cart from "./Cart";
import CheckoutForm, { FormEvent } from "./CheckoutForm";

type CartModalProps = {
  title: string;
  quantity: number;
};

const CartModal = forwardRef(({ title, quantity }: CartModalProps, ref) => {
  const [showForm, setShowForm] = useState(false);

  const dialog = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current?.showModal();
      },
    };
  });

  function handleClose(e: FormEvent) {
    e.preventDefault();
    dialog.current!.close();
    setShowForm(false);
  }

  let modalActions = <button onClick={handleClose}>Close</button>;

  if (quantity > 0) {
    modalActions = (
      <>
        <button onClick={handleClose}>Close</button>
        <button type="submit">Checkout</button>
      </>
    );
  }

  return createPortal(
    <dialog
      ref={dialog}
      className={classes.modal}
      onClose={() => setShowForm(false)}
    >
      {!showForm ? (
        <>
          <h2>{title}</h2>
          <Cart />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setShowForm(true);
            }}
            method="dialog"
            id="modal-actions"
            className={classes.buttons}
          >
            {modalActions}
          </form>
        </>
      ) : (
        <CheckoutForm onClose={handleClose} />
      )}
    </dialog>,
    document.getElementById("modal")!
  );
});

export default CartModal;
