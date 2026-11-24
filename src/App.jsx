import { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import About from "./components/About";
import Banner from "./components/Banner";
import Blog from "./components/Blog";
import Categories from "./components/Categories";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Checkout from "./components/Checkout";
import Products from "./components/Products";

import "./App.css";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cartOpen, setCartOpen] = useState(false);
  const location = useLocation();
  const addToCart = (product) => {
    setCartItems((items) => [...items, product]);
    setCartOpen(true);
  };

  const addToWishlist = (product) => {
    setWishlistItems((prev) => {
      const alreadyAdded = prev.some(
        (item) => item.name === product.name
      );

      if (alreadyAdded) {
        return prev.filter(
          (item) => item.name !== product.name
        );
      }

      return [...prev, product];
    });
  };

  const removeFromCart = (index) => {
    setCartItems((items) =>
      items.filter(
        (_, itemIndex) => itemIndex !== index
      )
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
  };

  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true";

  return (
    <>
      <Header
        cartItems={cartItems}
        wishlistItems={wishlistItems}
        addToWishlist={addToWishlist}
        removeFromCart={removeFromCart}
        showCart={cartOpen}
        setShowCart={setCartOpen}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Banner />
              <Categories
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
              <Products
                addToCart={addToCart}
                addToWishlist={addToWishlist}
                wishlistItems={wishlistItems}
                searchTerm={searchTerm}
                selectedCategory={selectedCategory}
                clearFilters={clearFilters}
              />
              <Blog />
              <Footer />
            </>
          }
        />

        <Route
          path="/products"
          element={
            <>
              <Products
                addToCart={addToCart}
                addToWishlist={addToWishlist}
                wishlistItems={wishlistItems}
                searchTerm={searchTerm}
                selectedCategory={selectedCategory}
                clearFilters={clearFilters}
              />
              <Footer />
            </>
          }
        />

        <Route
          path="/about"
  element={<About />}
        />

        <Route
          path="/contact"
          element={
            <>
              <Contact />
              <Footer />
            </>
          }
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/checkout"
          element={
            isLoggedIn ? (
              <Checkout cartItems={cartItems} />
            ) : (
              <Navigate
                to="/login"
                state={{ from: "/checkout" }}
                replace
              />
            )
          }
        />

        <Route
          path="/blog"
          element={
            <>
              <Blog />
              <Footer />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;