import React from "react";
import Card from "./Card";

const Hand = ({ title, cards, score }) => (
  <div className="mb-4">
    <h2 className="text-xl font-bold mb-2">
      {title}: {score}
    </h2>
    <div>
      {cards.map((card, index) => (
        <Card key={index} card={card} />
      ))}
    </div>
  </div>
);

export default Hand;
