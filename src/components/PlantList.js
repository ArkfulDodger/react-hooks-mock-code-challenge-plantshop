import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, updatePlant, removePlant }) {
  const plantCards = plants.map( plant => (
    <PlantCard key={plant.id} plant={plant} updatePlant={updatePlant} removePlant={removePlant} />
  )) 

  return (
    <ul className="cards">{plantCards}</ul>
  );
}

export default PlantList;
