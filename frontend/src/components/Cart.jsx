import PropTypes from "prop-types";
import { useState } from "react";
import { MdRemove } from "react-icons/md";

const Cart = ({ cartItems, removeFromCart, placeOrder }) => {
  const [userName, setUserName] = useState(""); // State to hold the user's name
  const totalPrice = cartItems.reduce((total, item) => total + item.totalPrice, 0);

  // Handle name input change
  const handleNameChange = (event) => {
    setUserName(event.target.value);
  };

  // Handle form submission
  const handlePlaceOrder = () => {
    if (userName.trim() === "") {
      alert("Please enter your name before placing the order.");
      return;
    }

    placeOrder(userName); // Pass the user's name when placing the order
  };

  return (
    <div className="cart mt-8">
      <h2 className="text-3xl font-semibold">Bakul Pesanan</h2>
      {cartItems.length === 0 ? (
        <p>Bakul anda kosong</p>
      ) : (
        <div>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li key={item.id} className="border p-4 rounded flex justify-between">
                <div>
                  <strong>{item.name}</strong> - RM{item.totalPrice.toFixed(2)}
                  <ul className="mt-2">
                    {item.addons.map((addon) => (
                      <li key={addon.id}>
                        {addon.name} (+RM{addon.price.toFixed(2)})
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => removeFromCart(item.id)} // Call removeFromCart on button click
                >
                  <MdRemove />
                </button>
              </li>
            ))}
          </ul>

          <h3 className="mt-4">Jumlah: RM{totalPrice.toFixed(2)}</h3>

          {/* Name input field */}
          <div className="mt-4">
            <label htmlFor="userName" className="block text-lg font-semibold">
              Nama:
            </label>
            <input
              id="userName"
              type="text"
              value={userName}
              onChange={handleNameChange}
              className="w-full p-2 mt-2 border rounded"
              placeholder="Masukkan nama anda"
            />
          </div>

          {/* Place Order Button */}
          <button
            className="mt-4 bg-green-500 text-white px-6 py-2 rounded"
            onClick={handlePlaceOrder} // Place order with the name
          >
            Buat Pesanan
          </button>
        </div>
      )}
    </div>
  );
};

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,  // Assuming ID is string
      name: PropTypes.string.isRequired,
      totalPrice: PropTypes.number.isRequired,
      addons: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
          price: PropTypes.number.isRequired,
        })
      ),
    })
  ).isRequired,
  removeFromCart: PropTypes.func.isRequired,
  placeOrder: PropTypes.func.isRequired,
};

export default Cart;
