import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const filteredPlants = plants.filter( plant => plant.name.toLowerCase().includes(searchInput.toLowerCase()));

  useEffect(() => {
    fetch(`http://localhost:6001/plants`)
      .then( res => res.json())
      .then( data => setPlants(data))
      .catch( error => alert(error.message));
  }, [])

  const addPlant = (newPlantData) => {
    fetch(`http://localhost:6001/plants`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newPlantData)
    })
      .then( res => res.json())
      .then( newPlant => setPlants([...plants, newPlant]))
      .catch( error => alert(error.message));
  }
  
  const updatePlant = (updatedPlantData) => {
    fetch(`http://localhost:6001/plants/${updatedPlantData.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(updatedPlantData)
    })
      .then( res => res.json())
      .then( updatedPlant => {
        const updatedPlants = plants.map( plant => {
          return plant.id === updatedPlant.id ? updatedPlant : plant;
        })
        setPlants(updatedPlants);
      })
      .catch( error => alert(error.message));
  }
  
  const removePlant = (plantToRemove) => {
    fetch(`http://localhost:6001/plants/${plantToRemove.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then( res => {
        if (res.ok) {
          const updatedPlants = plants.filter( plant => {
            return plant.id !== plantToRemove.id;
          })
          setPlants(updatedPlants);
        } else {
          alert('something went wrong');
        }
      })
      .catch( error => alert(error.message))
  }

  return (
    <main>
      <NewPlantForm addPlant={addPlant} />
      <Search searchInput={searchInput} setSearchInput={setSearchInput} />
      <PlantList plants={filteredPlants} updatePlant={updatePlant} removePlant={removePlant} />
    </main>
  );
}

export default PlantPage;
