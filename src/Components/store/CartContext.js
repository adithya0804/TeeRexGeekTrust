import React, { createContext, useReducer } from "react";

const CartContext = createContext();
const initialState = {
  cart: [],
  cartTotal: 0,
  qty: 0,
};
const findtotalQuantity = (data) => {
  let sum = 0;
  data.forEach((item) => {
    sum += item.quantity;
  });
  return sum;
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const newItem = action.payload;
      const newTotal = newItem.price + state.cartTotal;
      const updateCartData = state.cart.concat(newItem);
      return {
        cart: updateCartData,
        cartTotal: newTotal,
        qty: findtotalQuantity(updateCartData),
      };
    }
    case "DELETE_FROM_CART": {
      const delItemId = action.payload;
      const delItemIndex = state.cart.findIndex(
        (item) => item.id === delItemId
      );
      const delItem = state.cart[delItemIndex];
      const newTotal = state.cartTotal - delItem.price * delItem.quantity;
      const updateCartData = state.cart.filter((item) => {
        return item.id !== delItemId;
      });
      return {
        cart: updateCartData,
        cartTotal: newTotal,
        qty: findtotalQuantity(updateCartData),
      };
    }
    case "INCREMENT_QUANTITY": {
      const itemId = action.payload;
      const updateCartData = state.cart.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
      const totalCost = updateCartData.reduce((acc, item) => {
        const itemCost = item.quantity * item.price;
        return acc + itemCost;
      }, 0);

      return {
        cart: updateCartData,
        cartTotal: totalCost,
        qty: findtotalQuantity(updateCartData),
      };
    }
    case "DECREMENT_QUANTITY": {
      const itemId = action.payload;
      const updateCartData = state.cart.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      });
      const totalCost = updateCartData.reduce((acc, item) => {
        const itemCost = item.quantity * item.price;
        return acc + itemCost;
      }, 0);
      return {
        cart: updateCartData,
        cartTotal: totalCost,
        qty: findtotalQuantity(updateCartData),
      };
    }
    case "CHECKOUT": {
      return {
        cart: [],
        cartTotal: 0,
        qrt: 0,
      };
    }
    default:
      return state;
  }
};
const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
