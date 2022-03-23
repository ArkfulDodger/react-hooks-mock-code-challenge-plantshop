import React from "react";

function PlantCard({ plant, plant: { name, image, price }, updatePlant, removePlant }) {
  function toggleInStock () {
    !plant.soldOut ? updatePlant({...plant, soldOut: true }) : updatePlant({...plant, soldOut: false })
  }

  function handleDeleteClick () {
    removePlant(plant);
  }

  return (
    <li className="card">
      <img src={image || "https://via.placeholder.com/400"} alt={name || "plant name"} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {!plant.soldOut ? (
        <button className="primary" onClick={toggleInStock}>In Stock</button>
      ) : (
        <button onClick={toggleInStock}>Out of Stock</button>
      )}
      <button className="delete" onClick={handleDeleteClick}>Delete</button>
    </li>
  );
}

export default PlantCard;
