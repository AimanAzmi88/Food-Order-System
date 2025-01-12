import PropTypes from "prop-types"; // Import PropTypes
import { BsCart2 } from "react-icons/bs";

const Overlay = ({ activeMenu, setActiveMenu, setShowCart, cart }) => {
  return (
    <div className="menu-toggle h-11 text-center flex justify-center items-center fixed top-28 inset-x-0 shadow">
      <button
        onClick={() => setActiveMenu("food")}
        className={`px-6 py-2 ${activeMenu === "food" ? "bg-green-700" : "bg-green-500"} text-white rounded-lg mr-4`}
      >
        Makanan
      </button>
      <button
        onClick={() => setActiveMenu("drink")}
        className={`px-6 py-2 ${activeMenu === "drink" ? "bg-green-700" : "bg-green-500"} text-white rounded-lg`}
      >
        Minuman
      </button>
      <button
        onClick={() => setShowCart(true)} // Show the cart
        className="ml-4 px-6 py-2 bg-green-700 text-white rounded-lg relative text-2xl"
      >
        <BsCart2 />
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {cart.length}
          </span>
        )}
      </button>
    </div>
  );
};

// Props Validation
Overlay.propTypes = {
  activeMenu: PropTypes.string.isRequired, // Must be a string and is required
  setActiveMenu: PropTypes.func.isRequired, // Must be a function and is required
  setShowCart: PropTypes.func.isRequired, // Must be a function and is required
  cart: PropTypes.arrayOf( // Must be an array of objects
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired, // ID can be a number or string and is required
      name: PropTypes.string.isRequired, // Name must be a string and is required
      price: PropTypes.number.isRequired, // Price must be a number and is required
      addons: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired, // Addon ID
          name: PropTypes.string.isRequired, // Addon name
          price: PropTypes.number.isRequired, // Addon price
        })
      ),
      totalPrice: PropTypes.number.isRequired, // Total price must be a number and is required
    })
  ).isRequired,
};

export default Overlay;
