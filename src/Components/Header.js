import React, { useContext } from "react";
import { Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import styles from "./styles/header.module.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { CartContext } from "./store/CartContext";

const Header = ({ children }) => {
  const location = useLocation();
  const { state } = useContext(CartContext);
  const isCartPage = location.pathname === "/cart";
  const isProductPage = location.pathname === "/";
  return (
    <div>
      <Box className={styles.header}>
        <Box>
          <Link to="/" className={styles.link}>
            <h3 className={styles.headerTitle}>TeeRex</h3>
          </Link>
        </Box>
        <Box>{children}</Box>
        <Box className={styles.headerItems}>
          <Box>
            <Link to="/" className={styles.link}>
              <h4 className={isProductPage ? styles.active : styles.inactive}>
                Products
              </h4>
            </Link>
          </Box>
          <Box className={isCartPage ? styles.active : styles.inactive}>
            <Link className={styles.link} to="/cart">
              <ShoppingCartOutlinedIcon className={styles.cartIcon} />
              <span className={styles.quantity}>{state.qty}</span>
            </Link>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Header;
