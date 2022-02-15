import React from "react";
import ProductsContainer from "./ProductsContainer";
import CartContainer from "./CartContainer";

export const ShoppingCart = () => (
  <div>
    <h2>Shopping Cart Example</h2>
    <hr />
    <ProductsContainer />
    <hr />
    <CartContainer />
  </div>
);
