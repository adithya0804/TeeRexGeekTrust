import React, { createContext, useReducer } from "react";
const initialState = {
  productData: [],
};
const productsReducer = (state, action) => {
  if (action.type === "SET_PRODUCT_DATA") {
    return {
      ...state,
      productData: action.payload,
    };
  }
  return state;
};

const ProductsContext = createContext();
const ProductsProvider = ({ children }) => {
  const [productsState, dispatchProduct] = useReducer(
    productsReducer,
    initialState
  );

  return (
    <ProductsContext.Provider value={{ productsState, dispatchProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};
export { ProductsContext, ProductsProvider };
