import React from "react";

const Card = ({ card }) => (
  <div className="bg-white border border-gray-300 rounded-lg p-2 m-1 inline-block">
    <span
      className={
        card.suit === "♥" || card.suit === "♦" ? "text-red-500" : "text-black"
      }
    >
      {card.value}
      {card.suit}
    </span>
  </div>
);

export default Card;
