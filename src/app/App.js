import React from "react";
import logo from "./logo.svg";
import { Counter } from "../features/counter/Counter";
import { Home } from "../features/home/Home";
import { Todos } from "../features/todos/Todos";
import { ShoppingCart } from "../features/cart/ShoppingCart";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/*
        <img
          src="https://images.unsplash.com/photo-1644377598632-78b99859d2ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=649&q=80"
          className="App-logo"
          alt="logo"
        />
        */}
        <ShoppingCart />
      </header>
    </div>
  );
}

export default App;
