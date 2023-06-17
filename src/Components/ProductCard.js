import React, { useCallback, useContext, useEffect, useState } from "react";
import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import styles from "./styles/productCard.module.css";
import { CartContext } from "./store/CartContext";
import { useSnackbar } from "notistack";
import { handleAddToCart, handleIncrement, handleDecrement } from "./helper";

const ProductCard = ({ product }) => {
  const [itemInCart, setItemInCart] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [count, setCount] = useState(0);
  const { state, dispatch } = useContext(CartContext);
  const findCartItem = useCallback(() => {
    const index = state.cart.findIndex((item) => item.id === product.id);
    const item = state.cart[index];
    if (item) {
      setItemInCart(true);
      setCount(item.quantity);
    } else {
      setItemInCart(false);
      setCount(0);
    }
  }, [state, product.id]);
  useEffect(() => {
    findCartItem();
  }, [findCartItem]);
  return (
    <Card className={styles.card}>
      <div className={styles.imageContainer}>
        <CardMedia
          component="img"
          image={product.imageURL}
          alt={product.name}
          className={styles.cardImage}
        />
      </div>

      <CardContent className={styles.cardContent}>
        <Typography varaint="h5" component="div">
          {product.name}
        </Typography>
        <Typography varaint="h5" component="div">
          ${product.price}
        </Typography>
      </CardContent>
      <CardActions>
        {itemInCart ? (
          <Box className={styles.buttonPanel}>
            <Button
              variant="contained"
              size="small"
              className={styles.panelButton}
              onClick={() => handleDecrement(count, dispatch, product)}
            >
              -
            </Button>
            <Box className={styles.quantity}>{count}</Box>
            <Button
              size="small"
              variant="contained"
              className={styles.panelButton}
              onClick={() =>
                handleIncrement(count, dispatch, enqueueSnackbar, product)
              }
            >
              +
            </Button>
          </Box>
        ) : (
          <Button
            size="small"
            variant="contained"
            className={styles.cardButton}
            onClick={() => handleAddToCart(dispatch, product)}
          >
            <AddShoppingCartOutlined />
            ADD TO CART
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default ProductCard;
