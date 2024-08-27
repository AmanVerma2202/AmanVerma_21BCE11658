import React, { useState } from "react";

function CharacterSelect({ onSelect }) {
  const [characters, setCharacters] = useState(["Pawn", "Pawn", "Pawn", "Hero1", "Hero2"]);

  const handleCharacterChange = (index, newCharacter) => {
    const updatedCharacters = [...characters];
    updatedCharacters[index] = newCharacter;
    setCharacters(updatedCharacters);
  };

  const handleSubmit = () => {
    onSelect(characters);
  };

  return (
    <div>
      <h2>Select Your Characters</h2>
      {characters.map((character, index) => (
        <select key={index} value={character} onChange={(e) => handleCharacterChange(index, e.target.value)}>
          <option value="Pawn">Pawn</option>
          <option value="Hero1">Hero1</option>
          <option value="Hero2">Hero2</option>
        </select>
      ))}
      <button onClick={handleSubmit}>Start Game</button>
    </div>
  );
}

export default CharacterSelect;


