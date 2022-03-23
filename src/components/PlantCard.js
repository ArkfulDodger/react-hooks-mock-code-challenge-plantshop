import React from "react";

function PlantCard({ plant, plant: { name, image, price } }) {
  return (
    <li className="card">
      <img src={image || "https://via.placeholder.com/400"} alt={name || "plant name"} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {true ? (
        <button className="primary">In Stock</button>
      ) : (
        <button>Out of Stock</button>
      )}
    </li>
  );
}

export default PlantCard;
