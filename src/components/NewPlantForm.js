import React, { useState } from "react";

// Default Form Values
const defaultForm = {
  name: "",
  image: "",
  price: ""
}

function NewPlantForm({ addPlant }) {
  // State and Variable Declaration
  const [formData, setFormData] = useState(defaultForm);
  const { name, image, price } = formData;

  // Reset formData to default values
  const resetForm = () => setFormData(defaultForm);

  // Handles form onSubmit event
  const handleSubmit = (e) => {
    e.preventDefault();
    addPlant(formData);
    resetForm();
  }

  // Handles input onChange events: input name attributes must match formData keys
  const handleFormChange = ({ target: { name: inputName, value: inputValue } }) => {
    const updatedFormData = { ...formData, [inputName]: inputValue };

    setFormData(updatedFormData);
  }


  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Plant name"
          value={name}
          onChange={handleFormChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={image}
          onChange={handleFormChange}
        />
        <input
          type="number"
          name="price"
          step="0.01"
          placeholder="Price"
          value={price}
          onChange={handleFormChange} />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
