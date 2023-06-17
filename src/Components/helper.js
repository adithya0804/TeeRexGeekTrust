export const handleAddToCart = (dispatch, product) => {
  dispatch({
    type: "ADD_TO_CART",
    payload: { ...product, quantity: 1, availableQty: product.quantity },
  });
};
export const handleIncrement = (count, dispatch, enqueueSnackbar, product) => {
  if (count + 1 > product.quantity) {
    enqueueSnackbar(
      `Only ${product.quantity} numbers of ${product.name} available`,
      {
        variant: "warning",
      }
    );
  } else {
    dispatch({ type: "INCREMENT_QUANTITY", payload: product.id });
  }
};
export const handleDecrement = (count, dispatch, product) => {
  if (count - 1 === 0) {
    dispatch({ type: "DELETE_FROM_CART", payload: product.id });
  } else {
    dispatch({ type: "DECREMENT_QUANTITY", payload: product.id });
  }
};
export const handleRemove = (dispatch, id) => {
  dispatch({ type: "DELETE_FROM_CART", payload: id });
};
