import { useState, useEffect } from "react";

const Menu = () => {
  const [foodItem, setFoodItem] = useState([]);
  const [drinkItem, setDrinkItem] = useState([]);
  const [addonItem, setAddonItem] = useState([]);

  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    type: "food", // Type can be "food", "drink", or "addon"
  });

  useEffect(() => {
    // Fetch food items
    fetch("https://food-order-system-0fho.onrender.com/menu/food")
      .then((response) => response.json())
      .then((data) => setFoodItem(data))
      .catch((error) => console.log("Error fetching food items:", error));

    // Fetch drink items
    fetch("https://food-order-system-0fho.onrender.com/menu/drink")
      .then((response) => response.json())
      .then((data) => setDrinkItem(data))
      .catch((error) => console.log("Error fetching drink items:", error));

    // Fetch add-on items
    fetch("https://food-order-system-0fho.onrender.com/menu/addon")
      .then((response) => response.json())
      .then((data) => setAddonItem(data))
      .catch((error) => console.log("Error fetching add-on items:", error));
  }, []);

  const handleDelete = (itemId, itemType) => {
    const url = `https://food-order-system-0fho.onrender.com/menu/${itemType}/${itemId}`;

    fetch(url, {                      
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // Update state to remove the item from the list
          if (itemType === "food") {
            setFoodItem(foodItem.filter((item) => item.id !== itemId));
          } else if (itemType === "drink") {
            setDrinkItem(drinkItem.filter((item) => item.id !== itemId));
          } else if (itemType === "addon") {
            setAddonItem(addonItem.filter((item) => item.id !== itemId));
          }
        } else {
          console.error("Failed to delete item");
        }
      })
      .catch((error) => console.log("Error deleting item:", error));
  };

  const handleAddItem = (event) => {
    event.preventDefault();

    const newItemData = {
      name: newItem.name,
      price: parseFloat(newItem.price),
    };

    const url = `http://localhost:3000/menu/${newItem.type}`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItemData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Add the newly added item to the correct list
        if (newItem.type === "food") {
          setFoodItem([...foodItem, data]);
        } else if (newItem.type === "drink") {
          setDrinkItem([...drinkItem, data]);
        } else if (newItem.type === "addon") {
          setAddonItem([...addonItem, data]);
        }

        // Clear the form fields after the item is added
        setNewItem({
          name: "",
          price: "",
          type: "food",
        });
      })
      .catch((error) => console.log("Error adding item:", error));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-6">

        {/* Add Item Form */}
        <section className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Item</h2>
          <form onSubmit={handleAddItem}>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700">Item Name</label>
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Price</label>
                <input
                  type="number"
                  value={newItem.price}
                  onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Item Type</label>
                <select
                  value={newItem.type}
                  onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="food">Food</option>
                  <option value="drink">Drink</option>
                  <option value="addon">Add-on</option>
                </select>
              </div>
              <div className="text-right">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
                >
                  Add Item
                </button>
              </div>
            </div>
          </form>
        </section>

        {/* Main Content */}
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Food Items */}
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Food Items</h2>
            {foodItem.length > 0 ? (
              <ul className="space-y-4">
                {foodItem.map((item) => (
                  <li key={item.id} className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">{item.name}</span>
                    <span className="text-gray-900 font-bold">${item.price}</span>
                    <button
                      onClick={() => handleDelete(item.id, "food")}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Loading food items...</p>
            )}
          </section>

          {/* Drink Items */}
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Drink Items</h2>
            {drinkItem.length > 0 ? (
              <ul className="space-y-4">
                {drinkItem.map((item) => (
                  <li key={item.id} className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">{item.name}</span>
                    <span className="text-gray-900 font-bold">${item.price}</span>
                    <button
                      onClick={() => handleDelete(item.id, "drink")}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Loading drink items...</p>
            )}
          </section>

          {/* Add-on Items */}
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add-on Items</h2>
            {addonItem.length > 0 ? (
              <ul className="space-y-4">
                {addonItem.map((item) => (
                  <li key={item.id} className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">{item.name}</span>
                    <span className="text-gray-900 font-bold">${item.price}</span>
                    <button
                      onClick={() => handleDelete(item.id, "addon")}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Loading add-on items...</p>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default Menu;
