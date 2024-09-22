import React from "react"; 
import { PlayersObject, Player } from "../app/props/props";

interface MaalCalculationProps {
  players: PlayersObject;
  handleInputChange: (index: number, field: keyof Player, value: string | number | boolean) => void;
  handleCalculate: () => void;
  gameNumber: number;
  handleBack: () => void;
}

const MaalCalculation: React.FC<MaalCalculationProps> = ({
  players,
  handleInputChange,
  handleCalculate,
  gameNumber,
  handleBack,
}) => {
  return (
    <div className="overlay">
      <div className="calculate-container">
        <header className="header">
          <button className="back-button" onClick={handleBack}>←</button>
          <h1>Maal Calculation</h1>
          <button className="home-button">🏠</button>
        </header>

        <div className="game-info">
          <h2 className="text-center font-bold text-red-400">Game number: {gameNumber}</h2>
          <p className="text-center text-gray-400">Please input only Maal Points</p>
          <p className="text-center text-gray-400">Please select a winner.</p>
        </div>

        <div className="players-points-list">
          {Object.keys(players).map((playerKey) => {
            const playerIndex = Number(playerKey);
            return (
              <div className="player-row" key={playerIndex}>
                <div className="player-number">{playerIndex + 1}</div>
                
                <button
                  className={`set-winner-button ${players[playerIndex].isWinner ? "selected" : ""}`}
                  onClick={() => handleInputChange(playerIndex, 'isWinner', !players[playerIndex].isWinner)}
                >
                  Set Winner
                </button>
                
                <input
                  type="number"
                  className="maal-points-input text-center text-4xl leading-none h-10"
                  value={players[playerIndex].maalPoints}
                  onChange={(e) => handleInputChange(playerIndex, 'maalPoints', parseInt(e.target.value, 10))}
                  placeholder="0"
                />
                
                <select
                  className="player-status"
                  value={players[playerIndex].status}
                  onChange={(e) => handleInputChange(playerIndex, 'status', e.target.value)}
                >
                  <option value="Seen">Seen</option>
                  <option value="Unseen">Unseen</option>
                  <option value="Hold">Hold</option>
                  <option value="Foul">Foul</option>
                </select>
              </div>
            );
          })}
        </div>

        <div className="info-notes">
          <p>
            If a player is not participating in this round, change their status to hold.
          </p>
          <p>A foul player will only pay maal points, not winning points.</p>
        </div>

        <div className="footer">
          <button className="calculate-button" onClick={handleCalculate}>
            Calculate
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaalCalculation;
