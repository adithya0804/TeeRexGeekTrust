import React, { useContext } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { CartContext } from "./store/CartContext";
import { useSnackbar } from "notistack";
import { handleIncrement, handleDecrement, handleRemove } from "./helper";
import styles from "./styles/cartItem.module.css";
const CartItem = ({ cartItem, product }) => {
  const { dispatch } = useContext(CartContext);
  const { enqueueSnackbar } = useSnackbar();
  return (
    <Card className={styles.card}>
      <div className={styles.imageContainer}>
        <CardMedia
          component="img"
          image={cartItem.imageURL}
          alt={cartItem.name}
          className={styles.cardImage}
        />
      </div>

      <CardContent className={styles.cardContent}>
        <Typography varaint="h5" component="div">
          {cartItem.name}
        </Typography>
        <Typography varaint="h6" component="div">
          ${cartItem.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Box className={styles.buttonPanel}>
          <Button
            size="small"
            variant="contained"
            className={styles.panelButton}
            onClick={() =>
              handleDecrement(cartItem.quantity, dispatch, product)
            }
          >
            -
          </Button>
          <Box className={styles.quantity}>{cartItem.quantity}</Box>

          <Button
            variant="contained"
            size="small"
            className={styles.panelButton}
            onClick={() =>
              handleIncrement(
                cartItem.quantity,
                dispatch,
                enqueueSnackbar,
                product
              )
            }
          >
            +
          </Button>
        </Box>
        <IconButton
          className={styles.delete}
          onClick={() => {
            handleRemove(dispatch, cartItem.id);
          }}
        >
          <DeleteForeverIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default CartItem;
