import { ReactNode, createContext, useReducer } from "react";
import { fetchedData } from "../App";
import { Meal } from "../components/Menu";

export type Cart = {
  items: Meal[];
  addItemToCart?: (id: string) => void;
  updateCartItemQuantity?: (id: string, amount: number) => void;
  resetCart?: () => void;
};

type CartProps = {
  children: ReactNode;
};

type Action = {
  type: "ADD_ITEM" | "UPDATE_ITEM" | "RESET_CART";
  payload?: { id: string; amount?: number };
};

const CartContext = createContext<Cart>({
  items: [],
  addItemToCart: () => {},
  updateCartItemQuantity: () => {},
  resetCart: () => {},
});

export default CartContext;

function reducer(state: Cart, action: Action) {
  if (action.type === "ADD_ITEM") {
    const updatedItems = [...state.items];

    // find out the index of the clicked item in cart
    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.payload!.id
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    // if there is already same item in cart
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity! + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
      // otherwise if not
    } else {
      const meal = fetchedData.find((meal) => meal.id === action.payload!.id);
      updatedItems.push({
        id: action.payload!.id,
        name: meal!.name,
        price: meal!.price,
        description: meal!.description,
        image: meal!.image,
        quantity: 1,
      });
    }

    return {
      ...state,
      items: updatedItems,
    };
  }
  if (action.type === "UPDATE_ITEM") {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.payload!.id
    );

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity! += action.payload!.amount!;

    if (updatedItem.quantity! <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return {
      ...state,
      items: updatedItems,
    };
  }

  if (action.type === "RESET_CART") {
    return {
      ...state,
      items: [],
    };
  }

  return state;
}

export function CartContextProvider({ children }: CartProps) {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  function handleAddItemToCart(id: string) {
    dispatch({ type: "ADD_ITEM", payload: { id } });
  }

  function handleUpdateCartItemQuantity(id: string, amount: number) {
    dispatch({ type: "UPDATE_ITEM", payload: { id, amount } });
  }

  function handleResetCart() {
    dispatch({ type: "RESET_CART" });
  }

  const contextValue = {
    items: state.items,
    addItemToCart: handleAddItemToCart,
    updateCartItemQuantity: handleUpdateCartItemQuantity,
    resetCart: handleResetCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}
