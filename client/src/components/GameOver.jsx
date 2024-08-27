import React from "react";

function GameOver({ winner }) {
  return (
    <div>
      <h2>Game Over</h2>
      {winner ? (
        <p>Player {winner} wins!</p>
      ) : (
        <p>It's a draw!</p>
      )}
    </div>
  );
}

export default GameOver;
