import classes from "./CartModal.module.css";
import { ReactNode, forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import Cart from "./Cart";

type CartModalProps = {
  title: string;
  actions: ReactNode;
};

const CartModal = forwardRef(({ title, actions }: CartModalProps, ref) => {
  const dialog = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current?.showModal();
      },
    };
  });

  return createPortal(
    <dialog ref={dialog} className={classes.modal}>
      <h2>{title}</h2>
      <Cart />
      <form method="dialog" id="modal-actions" className={classes.buttons}>
        {actions}
      </form>
    </dialog>,
    document.getElementById("modal")!
  );
});

export default CartModal;
