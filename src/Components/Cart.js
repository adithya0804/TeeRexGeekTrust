import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { Box, Button } from "@mui/material";
import { CartContext } from "./store/CartContext";
import { ProductsContext } from "./store/ProductsContext";
import styles from "./styles/cart.module.css";
import { SentimentVeryDissatisfied } from "@mui/icons-material";
import CartItem from "./CartItem";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { enqueueSnackbar } from "notistack";

const Cart = () => {
  const findProduct = (item) => {
    const itemIndex = productsState.productData.findIndex((prod) => {
      return prod.id === item.id;
    });
    return productsState.productData[itemIndex];
  };
  const handleCheckout = () => {
    dispatch({ type: "CHECKOUT" });
    navigate("/");
    enqueueSnackbar("Order Placed Successfully", { variant: "success" });
  };
  const navigate = useNavigate();
  const { state, dispatch } = useContext(CartContext);
  const { productsState } = useContext(ProductsContext);
  return (
    <div className={styles.body}>
      <Header />
      {state.cart.length === 0 ? (
        <Box className={styles.empty}>
          No Items In Cart
          <SentimentVeryDissatisfied className={styles.icon} fontSize="large" />
          <Link className={styles.link} to="/">
            Continue Shopping
          </Link>
        </Box>
      ) : (
        <Box className={styles.cartGrid}>
          <Box className={styles.cartPanel}>
            {state.cart.map((item) => {
              return (
                <Box className={styles.cartItem} key={item.id}>
                  <CartItem cartItem={item} product={findProduct(item)} />
                </Box>
              );
            })}
          </Box>

          <Box className={styles.costPanel}>
            <h2>Order Details</h2>
            <div className={styles.orderItem}>
              {" "}
              <span>Products </span>
              <span>{state.qty}</span>
            </div>
            <div className={styles.orderItem}>
              {" "}
              <span>Subtotal</span> <span> ${state.cartTotal}</span>
            </div>
            <div className={styles.orderItem}>
              {" "}
              <span>Shipping Charges</span>
              <span> ${0}</span>
            </div>
            <div className={styles.orderItem}>
              {" "}
              <h3>Total </h3>
              <h3>${state.cartTotal}</h3>
            </div>
            <Button
              className={styles.checkoutButton}
              variant="contained"
              onClick={handleCheckout}
            >
              <ShoppingCartCheckoutIcon />
              CHECKOUT
            </Button>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default Cart;
