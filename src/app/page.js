"use client";

import React, { useState, useEffect } from "react";
import { calculateHandValue } from "./lib/gameLogic";
import Hand from "./components/Hand";
import GameControls from "./components/GameControls";

export default function Home() {
  const [gameState, setGameState] = useState(null);

  const updateGame = async (action) => {
    try {
      const response = await fetch("/api/game", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, gameState }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newState = await response.json();
      setGameState(newState);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      // Optionally set an error state here to display to the user
    }
  };

  useEffect(() => {
    updateGame("new");
  }, []);

  if (!gameState) return <div>Loading...</div>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="bg-green-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-white">21 Card Game</h1>
        <Hand
          title="Dealer's Hand"
          cards={gameState.dealerHand}
          score={calculateHandValue(gameState.dealerHand)}
        />
        <Hand
          title="Your Hand"
          cards={gameState.playerHand}
          score={calculateHandValue(gameState.playerHand)}
        />
        <GameControls
          onHit={() => updateGame("hit")}
          onStand={() => updateGame("stand")}
          onNewGame={() => updateGame("new")}
          gameOver={gameState.gameOver}
        />
        {gameState.message && (
          <div className="mt-4 text-xl font-bold text-white">
            {gameState.message}
          </div>
        )}
      </div>
    </main>
  );
}
