// src/components/Menu.jsx
import PropTypes from 'prop-types';
import MenuItem from './MenuItem';

const Menu = ({ menuItems, addons, addToCart }) => {
  if (!Array.isArray(menuItems) || menuItems.length === 0) {
    return <p>No items available.</p>; // Handle empty or invalid menuItems
  }

  return (
    <div className="menu">
      {menuItems.map((item) => (
        <MenuItem
          key={item.id}
          item={item}
          addons={addons}
          addToCart={addToCart}
        />
      ))}
    </div>
  );
};

Menu.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  addons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default Menu;
