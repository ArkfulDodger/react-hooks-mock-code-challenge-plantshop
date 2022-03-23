import React, { useState } from "react";

function PlantCard({ plant, plant: { name, image, price }, updatePlant, removePlant }) {
  const [isInEdit, setIsInEdit] = useState(false);
  const [priceEditInput, setPriceEditInput] = useState("");

  function toggleInStock () {
    !plant.soldOut ? updatePlant({...plant, soldOut: true }) : updatePlant({...plant, soldOut: false })
  }

  function handleDeleteClick () {
    removePlant(plant);
  }

  function handlePriceClick() {
    setPriceEditInput(plant.price);
    setIsInEdit(isInEdit => !isInEdit);
  }

  function onPriceChange({ target: { value }}) {
    setPriceEditInput(value);
  }

  function onPriceSubmit(e) {
    e.preventDefault();
    const updatedPlant = {...plant, price: priceEditInput};
    updatePlant(updatedPlant);
    setIsInEdit(isInEdit => !isInEdit);
  }

  const priceSection = !isInEdit
    ? <p className="clickable" onClick={handlePriceClick}>Price: {price}</p>
    : (<form onSubmit={onPriceSubmit}>
        <input type="number" step="0.01" value={priceEditInput} onChange={onPriceChange}/>
        <button type="submit">Set New Price</button>
      </form>)

  return (
    <li className="card">
      <img src={image || "https://via.placeholder.com/400"} alt={name || "plant name"} />
      <h4>{name}</h4>
      {priceSection}
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
