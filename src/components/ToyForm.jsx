import React, { useState } from "react";

function ToyForm({ onAddToy }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newToy = {
      name,
      image,
      likes: 0,
    };

    onAddToy(newToy);

    setName("");
    setImage("");
  }

  return (
    <form className="ToyForm" onSubmit={handleSubmit}>
      <h3>Add a Toy</h3>
      <label>
        Toy Name:
        <input
          type="text"
          placeholder="Enter a toy's name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Image URL:
        <input
          type="text"
          placeholder="Enter a toy's image URL..."
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </label>
      <button type="submit">Create New Toy</button>
    </form>
  );
}

export default ToyForm;