import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import Header from "./components/Header";
import Overlay from "./components/Overlay";

const Page = () => {
  const [cart, setCart] = useState([]);
  const [food, setFood] = useState([]);
  const [drink, setDrink] = useState([]);
  const [addons, setAddons] = useState([]);
  const [activeMenu, setActiveMenu] = useState("food");
  const [showCart, setShowCart] = useState(false);

  // Fetch food items from API
  const fetchFood = async () => {
    const response = await fetch("http://localhost:3000/menu/food");
    const data = await response.json();
    setFood(data.map((item) => ({ ...item, price: Number(item.price) })));
  };

  // Fetch drink items from API
  const fetchDrinks = async () => {
    const response = await fetch("http://localhost:3000/menu/drink");
    const data = await response.json();
    setDrink(data.map((item) => ({ ...item, price: Number(item.price) })));
  };

  // Fetch addons from API
  const fetchAddons = async () => {
    const response = await fetch("http://localhost:3000/menu/addon");
    const data = await response.json();
    setAddons(data.map((addon) => ({ ...addon, price: Number(addon.price) })));
  };

  useEffect(() => {
    fetchFood();
    fetchDrinks();
    fetchAddons();
  }, []);

  // Add item to the cart with unique ID
  const addToCart = (item, selectedAddons) => {
    const newItem = {
      ...item,
      id: `${item.id}-${Date.now()}`, // Creating a new unique ID by combining item ID and current timestamp
      addons: selectedAddons,
      totalPrice: item.price + selectedAddons.reduce((total, addon) => total + addon.price, 0),
    };
    setCart((prevCart) => [...prevCart, newItem]);
  };

  // Remove item from the cart by ID
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const place = queryParams.get("tempat");

  // Calculate total price of the cart
  const totalPrice = cart.reduce((total, item) => total + item.totalPrice, 0);

  // Place the order and send data to the server
  const placeOrder = async (userName) => {
    if (!userName.trim()) {
      alert("Please enter your name before placing the order.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order: cart, 
          place,
          userName,
          totalPrice, // Send the total price
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Order placed successfully!");
        setCart([]); // Clear the cart after placing the order
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order. Please try again later.");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col relative bg-gray-300">
      <Header />
      <Overlay
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        setShowCart={setShowCart}
        cart={cart}
      />
      <div className="mt-40 flex-1 overflow-y-auto px-4">
        {activeMenu === "food" && <Menu menuItems={food} addons={addons} addToCart={addToCart} />}
        {activeMenu === "drink" && <Menu menuItems={drink} addons={[]} addToCart={addToCart} />}
      </div>
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-4/5 md:w-1/2 lg:w-1/3 rounded-lg shadow-lg p-6 relative">
            <button
              onClick={() => setShowCart(false)} // Hide the cart
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            <Cart cartItems={cart} removeFromCart={removeFromCart} placeOrder={placeOrder} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
