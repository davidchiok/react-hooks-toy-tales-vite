import React, { useState, useEffect } from "react";
import ToyForm from "./ToyForm";
import ToyCard from "./ToyCard";

function App() {
  // Holds the full list of toys fetched from the backend
  const [toys, setToys] = useState([]);

  // Fetch all toys once on initial page load
  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((res) => res.json())
      .then((data) => setToys(data));
  }, []);

  // POST a new toy to the backend, then add the server's response
  // (which includes the generated id) to state
  function handleAddToy(newToy) {
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newToy),
    })
      .then((res) => res.json())
      .then((addedToy) => setToys((prevToys) => [...prevToys, addedToy]));
  }

  // PATCH a toy's likes count, then replace that toy in state
  // using map() so the original array order is preserved
  function handleLikeToy(toy) {
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: toy.likes + 1 }),
    })
      .then((res) => res.json())
      .then((updatedToy) => {
        setToys((prevToys) =>
          prevToys.map((t) => (t.id === updatedToy.id ? updatedToy : t))
        );
      });
  }

  // DELETE a toy from the backend, then filter it out of state
  function handleDonateToy(toyId) {
    fetch(`http://localhost:3001/toys/${toyId}`, {
      method: "DELETE",
    }).then(() => {
      setToys((prevToys) => prevToys.filter((t) => t.id !== toyId));
    });
  }

  return (
    <div className="App">
      <ToyForm onAddToy={handleAddToy} />
      <div className="ToyContainer">
        {toys.map((toy) => (
          <ToyCard
            key={toy.id}
            toy={toy}
            onLike={handleLikeToy}
            onDonate={handleDonateToy}
          />
        ))}
      </div>
    </div>
  );
}

export default App;