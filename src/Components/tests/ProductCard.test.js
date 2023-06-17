import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { CartContext } from "../store/CartContext";
import { SnackbarProvider } from "notistack";
import ProductCard from "../ProductCard";
import {
  handleAddToCart,
  handleIncrement,
  handleDecrement,
  handleRemove,
} from "../helper";

jest.mock("../helper", () => ({
  handleAddToCart: jest.fn(),
  handleIncrement: jest.fn(),
  handleDecrement: jest.fn(),
  handleRemove: jest.fn(),
}));
describe("ProductCard", () => {
  const product = {
    id: 1,
    name: "Example Product",
    price: 9.99,
    imageURL: "example.jpg",
  };

  test("renders product details correctly", () => {
    const { getByText, getByAltText } = render(
      <ProductCard product={product} />
    );

    const productName = getByText("Example Product");
    const productPrice = getByText("$9.99");
    const productImage = getByAltText("Example Product");

    expect(productName).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
    expect(productImage).toBeInTheDocument();
  });

  test("displays 'ADD TO CART' button when item is not in the cart", () => {
    const { getByText } = render(<ProductCard product={product} />);

    const addToCartButton = getByText("ADD TO CART");

    expect(addToCartButton).toBeInTheDocument();
  });

  test("displays quantity controls when item is in the cart", () => {
    const cartItem = {
      id: 1,
      name: "Example Product",
      price: 9.99,
      imageURL: "example.jpg",
      quantity: 2,
    };

    const dispatch = jest.fn();

    const { getByText } = render(
      <CartContext.Provider value={{ state: { cart: [cartItem] }, dispatch }}>
        <ProductCard product={product} />
      </CartContext.Provider>
    );

    const decrementButton = getByText("-");
    const quantityText = getByText("2");
    const incrementButton = getByText("+");

    expect(decrementButton).toBeInTheDocument();
    expect(quantityText).toBeInTheDocument();
    expect(incrementButton).toBeInTheDocument();
  });

  test("calls handleAddToCart when 'ADD TO CART' button is clicked", () => {
    const dispatch = jest.fn();

    const { getByText } = render(<ProductCard product={product} />);

    const addToCartButton = getByText("ADD TO CART");
    fireEvent.click(addToCartButton);

    expect(handleAddToCart).toHaveBeenCalledWith(dispatch, product);
  });

  test("calls handleDecrement when decrement button is clicked", () => {
    const cartItem = {
      id: 1,
      name: "Example Product",
      price: 9.99,
      imageURL: "example.jpg",
      quantity: 2,
    };

    const dispatch = jest.fn();

    const { getByText } = render(
      <CartContext.Provider value={{ state: { cart: [cartItem] }, dispatch }}>
        <ProductCard product={product} />
      </CartContext.Provider>
    );

    const decrementButton = getByText("-");
    fireEvent.click(decrementButton);

    expect(handleDecrement).toHaveBeenCalledWith(2, dispatch, product);
  });

  test("calls handleIncrement when increment button is clicked", () => {
    const cartItem = {
      id: 1,
      name: "Example Product",
      price: 9.99,
      imageURL: "example.jpg",
      quantity: 2,
    };

    const dispatch = jest.fn();
    const enqueueSnackbar = jest.fn();

    const { getByText } = render(
      <SnackbarProvider>
        <CartContext.Provider value={{ state: { cart: [cartItem] }, dispatch }}>
          <ProductCard product={product} />
        </CartContext.Provider>
      </SnackbarProvider>
    );

    const incrementButton = getByText("+");
    fireEvent.click(incrementButton);

    expect(handleIncrement).toHaveBeenCalledWith(
      2,
      dispatch,
      enqueueSnackbar,
      product
    );
  });
});
