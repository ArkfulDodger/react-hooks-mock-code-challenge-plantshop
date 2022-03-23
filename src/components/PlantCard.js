import React, { useState } from "react";

function PlantCard({ plant, plant: { name, image, price }, updatePlant, removePlant }) {
  const [isInEdit, setIsInEdit] = useState(false);

  function toggleInStock () {
    !plant.soldOut ? updatePlant({...plant, soldOut: true }) : updatePlant({...plant, soldOut: false })
  }

  function handleDeleteClick () {
    removePlant(plant);
  }

  function onPriceChange({ target: { value }}) {
    const updatedPlant = {...plant, price: value};
    updatePlant(updatedPlant);
  }

  function clickPrice() {
    setIsInEdit(isInEdit => !isInEdit);
  }

  function validatePrice() {
    const numAsPrice = parseFloat(plant.price).toFixed(2);
    const updatedPlant = {...plant, price: numAsPrice};
    updatePlant(updatedPlant);
  }

  function onPriceSubmit(e) {
    e.preventDefault();
    validatePrice();
    setIsInEdit(isInEdit => !isInEdit);
  }

  return (
    <li className="card">
      <img src={image || "https://via.placeholder.com/400"} alt={name || "plant name"} />
      <h4>{name}</h4>
      {!isInEdit
        ? <p onClick={clickPrice}>Price: {price}</p>
        : (<form onSubmit={onPriceSubmit}>
            <input type="number" step="0.01" value={plant.price} onChange={onPriceChange}/>
            <button type="submit">Set New Price</button>
          </form>)
      }
      
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
