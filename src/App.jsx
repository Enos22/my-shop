import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
import { Route, Routes } from 'react-router-dom';

import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Admin from './pages/Admin';

function App() {
  // Stores the category selected by the user
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Stores the cart notification message
  const [cartMessage, setCartMessage] = useState('');

  // Stores products added to the cart
  const [cart, setCart] = useState([]);

  const [currentUser, setCurrentUser] = useState(null);


  // Add product to the cart
  function addToCart(product) {
    setCart((currentCart) => {

      // Check if product already exists
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {

        // Increase quantity if it already exists
        return currentCart.map((item) =>
          item.id === product.id
            ? {
              ...item,
              quantity: item.quantity + 1
            }
            : item
        );

      } else {

        // Add new product with quantity 1
        return [
          ...currentCart,
          {
            ...product,
            quantity: 1
          }
        ];
      }
    });

    // Display message when product is added
    setCartMessage(
      `${product.name} has been added to the cart.`
    );

    // Clear message after 3 seconds
    setTimeout(() => {
      setCartMessage('');
    }, 3000);
  }

  // Remove product from cart
  function removeFromCart(productId) {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.id !== productId
      )
    );
  }

  // Increase or decrease product quantity
  function updateQuantity(productId, change) {
    setCart((currentCart) =>
      currentCart
        .map((item) => {

          if (item.id === productId) {
            return {
              ...item,
              quantity: item.quantity + change
            };
          }

          return item;
        })

        // Remove item if quantity reaches 0
        .filter((item) => item.quantity > 0)
    );
  }

  return (
    <>
      <main className="main-layouts">

        <Header cartCount={cart.length} />

        {/* Cart notification */}
        {cartMessage && (
          <div className="cart-message">
            {cartMessage}
          </div>
        )}

        <Routes>

          {/* Home */}
          <Route
            path="/"
            element={
              <Home
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                addToCart={addToCart}
              />
            }
          />

          {/* About */}
          <Route
            path="/about"
            element={<About />}
          />

          {/* Contact */}
          <Route
            path="/contact"
            element={<Contact />}
          />

          {/* Login */}
          <Route
            path="/login"
            element={<Login onLogin={setCurrentUser} />}
          />

          {/* Cart */}
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
              />
            }
          />

          {/* Checkout */}
          <Route
            path="/checkout"
            element={
              <Checkout
                cart={cart}
                clearCart={() => setCart([])}
              />
            }
          />
          {/* Login */}
          <Route
            path="/login"
            element={
              <Login onLogin={setCurrentUser} />
            }
          />
          {/* Admin */}

          <Route
            path='/admin'
            element={
              currentUser?.role ==="admin"? <Admin /> : <Login onLogin={setCurrentUser} />
            }

          />

        </Routes>

      </main>

      <Footer />
    </>
  );
}

export default App;