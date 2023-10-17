import React, { useState, useEffect } from "react";
import axios from "axios";

const CapreseSandwichRecipeComponent = ({
  addIngredientsToCart,
  nameOfIngredients,
}) => {
  const [message, setMessage] = useState("");
  const [allItems, setAllItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    // Fetch all items from your API
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/products`)
      .then((response) => {
        setAllItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching all items:", error);
      });
  }, []);

  useEffect(() => {
    if (nameOfIngredients && nameOfIngredients.length > 0) {
      const filtered = allItems.filter((item) =>
        nameOfIngredients.includes(item.product_name)
      );
      setFilteredItems(filtered);
    }
  }, [nameOfIngredients, allItems]);

  const handleAddToCartClick = () => {
    try {
      const newItemAddedToFood = [];
      if (addIngredientsToCart && filteredItems.length > 0) {
        filteredItems.forEach((product) => {
          const food = {
            name: product.product_name,
            image: product.product_image,
            id: product.product_id,
            length: 1,
          };
          newItemAddedToFood.push(food);
        });

        addIngredientsToCart(newItemAddedToFood);

        setMessage("Ingredients have been added to your cart.");
      } else {
        setMessage("No specific ingredients selected to add to the cart.");
      }
    } catch (error) {
      console.error("Error adding ingredients to cart:", error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white p-4 shadow-md rounded-lg">
      <div className="grid grid-cols-2">
        <div>
          <h3 className="text-2xl font-extrabold mb-8 text-center">Caprese Sandwich</h3>
      <img
        src="https://www.eatingwell.com/thmb/uAo_rveXpw6wB0j01eOstQoLS9A=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/caprese-sandwich-e0bb2b846cf14cd7a0eb2d3f4d4b6aa2.jpg"
        alt="Caprese Sandwich"
        className="w-full h-60 object-contain"
        />
      </div>
      <div>
        <h3 className="text-xl font-bold mb-8">Ingredients</h3>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-4">2 slices of ciabatta or baguette</li>
          <li className="mb-4">2 slices of fresh mozzarella cheese</li>
          <li className="mb-4">2 slices of ripe tomatoes</li>
          <li className="mb-4">Fresh basil leaves</li>
          <li className="mb-4">1 tablespoon extra-virgin olive oil</li>
          <li className="mb-4">Balsamic glaze (optional)</li>
          <li className="mb-4">Salt and pepper to taste</li>
          </ul>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-8">Directions</h3>
        <ol className="pl-6 mb-4">
          <li className="mb-4">
            <strong className="text-xl">Step 1:</strong> Drizzle olive oil on one side of each bread
            slice.
          </li>
          <li className="mb-4">
            <strong className="text-xl">Step 2:</strong> Layer one slice of mozzarella, tomato
            slices, and fresh basil leaves on one slice of bread.
          </li>
          <li className="mb-4">
            <strong className="text-xl">Step 3:</strong> Season with salt and pepper to taste.
          </li>
          <li className="mb-4">
            <strong className="text-xl">Step 4:</strong> Place the second slice of bread on top to
            form a sandwich.
          </li>
          <li className="mb-4">
            <strong className="text-xl">Step 5:</strong> Optionally, drizzle balsamic glaze over the
            sandwich.
          </li>
          <li className="mb-4">
            <strong className="text-xl">Step 6:</strong> Serve the Caprese Sandwich immediately.
          </li>
        </ol>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleAddToCartClick}
          className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
        >
          Add All Ingredients To Cart
        </button>
      </div>

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default CapreseSandwichRecipeComponent;
