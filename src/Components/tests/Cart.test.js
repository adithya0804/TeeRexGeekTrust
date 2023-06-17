import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { CartContext } from "../store/CartContext";
import { ProductsContext } from "../store/ProductsContext";
import { enqueueSnackbar } from "notistack";
import Cart from "../Cart";

jest.mock("notistack", () => ({
  enqueueSnackbar: jest.fn(),
}));

describe("Cart", () => {
  const cartItems = [
    {
      id: 1,
      name: "Example Product 1",
      price: 9.99,
      imageURL: "example1.jpg",
      quantity: 2,
    },
    {
      id: 2,
      name: "Example Product 2",
      price: 19.99,
      imageURL: "example2.jpg",
      quantity: 1,
    },
  ];

  const productsState = {
    productData: [
      {
        id: 1,
        name: "Example Product 1",
        price: 9.99,
        imageURL: "example1.jpg",
      },
      {
        id: 2,
        name: "Example Product 2",
        price: 19.99,
        imageURL: "example2.jpg",
      },
    ],
  };

  const cartTotal = 39.97;

  test("displays 'No Items In Cart' message when cart is empty", () => {
    const { getByText } = render(
      <CartContext.Provider value={{ state: { cart: [] } }}>
        <Cart />
      </CartContext.Provider>
    );

    const emptyMessage = getByText("No Items In Cart");
    const continueShoppingLink = getByText("Continue Shopping");

    expect(emptyMessage).toBeInTheDocument();
    expect(continueShoppingLink).toBeInTheDocument();
  });

  test("displays cart items and order details when cart is not empty", () => {
    const { getByText } = render(
      <Router>
        <CartContext.Provider
          value={{ state: { cart: cartItems, qty: 3, cartTotal } }}
        >
          <ProductsContext.Provider value={{ productsState }}>
            <Cart />
          </ProductsContext.Provider>
        </CartContext.Provider>
      </Router>
    );

    const product1Name = getByText("Example Product 1");
    const product2Name = getByText("Example Product 2");
    const subtotal = getByText("$39.97");
    const total = getByText("$39.97");
    const checkoutButton = getByText("CHECKOUT");

    expect(product1Name).toBeInTheDocument();
    expect(product2Name).toBeInTheDocument();
    expect(subtotal).toBeInTheDocument();
    expect(total).toBeInTheDocument();
    expect(checkoutButton).toBeInTheDocument();
  });

  test("calls handleCheckout, reloads page, and shows snackbar message when checkout button is clicked", () => {
    const handleCheckout = jest.fn();
    const navigate = jest.fn();
    const reload = jest.fn();

    global.window.location.reload = reload;

    const { getByText } = render(
      <Router>
        <CartContext.Provider value={{ state: { cart: cartItems, cartTotal } }}>
          <ProductsContext.Provider value={{ productsState }}>
            <Cart navigate={navigate} />
          </ProductsContext.Provider>
        </CartContext.Provider>
      </Router>
    );

    const checkoutButton = getByText("CHECKOUT");
    fireEvent.click(checkoutButton);

    expect(handleCheckout).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith("/");
    expect(reload).toHaveBeenCalled();
    expect(enqueueSnackbar).toHaveBeenCalledWith("Order Placed Successfully", {
      variant: "success",
    });
  });
});
