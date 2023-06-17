import { Routes, Route } from "react-router-dom";
import Cart from "./Components/Cart";
import Products from "./Components/Products";
import { CartProvider } from "./Components/store/CartContext";
import { ProductsProvider } from "./Components/store/ProductsContext";

function App() {
  return (
    <ProductsProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route exact path="/cart" element={<Cart />} />
        </Routes>
      </CartProvider>
    </ProductsProvider>
  );
}

export default App;
