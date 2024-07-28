import React from "react";

const GameControls = ({ onHit, onStand, onNewGame, gameOver }) => (
  <div className="flex justify-between mt-4">
    <button
      onClick={onHit}
      disabled={gameOver}
      className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
    >
      Hit
    </button>
    <button
      onClick={onStand}
      disabled={gameOver}
      className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
    >
      Stand
    </button>
    <button
      onClick={onNewGame}
      className="bg-gray-500 text-white px-4 py-2 rounded"
    >
      New Game
    </button>
  </div>
);

export default GameControls;
