import React from "react";

function ToyCard({ toy, onLike, onDonate }) {
  const { id, name, image, likes } = toy;

  return (
    <div className="ToyCard" data-testid="toy-card">
      <h2>{name}</h2>
      <img src={image} alt={name} />
      <p>{likes} Likes </p>
      <button onClick={() => onLike(toy)}>Like &lt;3</button>
      <button onClick={() => onDonate(id)}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;