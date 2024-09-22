import React from "react";
import { PlayersObject , Player} from "../app/props/props";

interface PlayerFormProps {
  players: PlayersObject;
  handleInputChange: (index: number, field: keyof Player, value: string | number | boolean) => void;
  handleDelete: (index: number) => void;
  clearPlayers: () => void;
  handleStart: () => void;
  handleBack: () => void;
}

const PlayerForm: React.FC<PlayerFormProps> = ({
  players,
  handleInputChange,
  handleDelete,
  clearPlayers,
  handleStart,
  handleBack,
}) => {
  return (
    <div className="overlay">
      <div className="modal">
        <header className="header">
          <button className="back-button" onClick={handleBack}>←</button>
          <h1>Add Players</h1>
          <button className="home-button">🏠</button>
        </header>
        <div className="players-list">
          {Object.keys(players).map((playerKey) => {
            const playerIndex = Number(playerKey); // Convert string to number for consistency
            return (
              <div className="player-input" key={playerIndex}>
                <label htmlFor={`player-${playerIndex}`}>
                  Player {playerIndex}:
                </label>
                <input
                  type="text"
                  id={`player-${playerIndex}`}
                  value={players[playerIndex].name}
                  onChange={(e) => handleInputChange(playerIndex, 'name', e.target.value)}
                  placeholder={`Player ${playerIndex}`}
                />
                <button
                  className="delete-button"
                  onClick={() => handleDelete(playerIndex)}
                >
                  🗑
                </button>
              </div>
            );
          })}
        </div>
        <div className="footer">
          <button className="reset-btn" onClick={clearPlayers}>
            Clear Players
          </button>
          <button className="start-game-btn" onClick={handleStart}>
            Start Game
          </button>
        </div>
        <p className="note">
          The dublee option is available for four or more players only.
        </p>
      </div>
    </div>
  );
};

export default PlayerForm;
