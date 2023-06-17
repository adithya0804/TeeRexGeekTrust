import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "../Header";
import { CartContext } from "../store/CartContext";
jest.mock("../Header.js", () => {
  const MockHeader = () => {
    return null;
  };
  return MockHeader;
});

describe("Header", () => {
  test("renders the header title", () => {
    render(<Header />, { wrapper: MemoryRouter });
    const headerTitle = screen.getByText("TeeRex");
    expect(headerTitle).toBeInTheDocument();
  });

  test("renders the 'Products' link", () => {
    render(<Header />, { wrapper: MemoryRouter });
    const productsLink = screen.getByText("Products");
    expect(productsLink).toBeInTheDocument();
  });

  //   test("renders the cart icon with quantity", () => {
  //     const mockCartContext = {
  //       state: {
  //         qty: 5, // Replace with desired quantity value for testing
  //       },
  //     };

  //     render(
  //       <CartContext.Provider value={mockCartContext}>
  //         <Header />
  //       </CartContext.Provider>,
  //       { wrapper: MemoryRouter }
  //     );

  //     const cartIcon = screen.getByTestId("cart-icon");
  //     const quantity = screen.getByText("5"); // Replace with the expected quantity text

  //     expect(cartIcon).toBeInTheDocument();
  //     expect(quantity).toBeInTheDocument();
  //   });
});
