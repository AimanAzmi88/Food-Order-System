// src/components/MenuItem.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaPlus } from "react-icons/fa6";

const MenuItem = ({ item, addons, addToCart }) => {
  const [selectedAddons, setSelectedAddons] = useState([]);

  const handleAddonChange = (addon) => {
    setSelectedAddons((prevSelected) =>
      prevSelected.includes(addon)
        ? prevSelected.filter((a) => a.id !== addon.id) // Deselect
        : [...prevSelected, addon] // Select
    );
  };

  return (
    <div className="menu-item border-b pb-4 mb-4 mx-2 flex flex-row justify-between">
      <div>
      <h3 className="text-xl font-bold">{item.name}</h3>
      <p className="text-gray-600">RM{item.price}</p>

      {addons.length > 0 && (
        <div className="addons mt-2">
          <h4 className="text-lg font-semibold">Tambahan</h4>
          <ul className="pl-2">
            {addons.map((addon) => (
              <li key={addon.id}>
                <label>
                  <input
                    type="checkbox"
                    value={addon.id}
                    onChange={() => handleAddonChange(addon)}
                    checked={selectedAddons.includes(addon)}
                  />
                  {addon.name} - RM{addon.price}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
      </div>

      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded h-10"
        onClick={() => addToCart(item, selectedAddons)}
      >
        <FaPlus />
      </button>
    </div>
  );
};

MenuItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  addons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default MenuItem;
