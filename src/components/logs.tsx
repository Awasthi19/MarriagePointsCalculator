
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare, faLink } from "@fortawesome/free-solid-svg-icons";
import { Player , Round} from "../app/props/props";
import { useState, useEffect } from "react";


interface LogsProps {
  currentGameData: Player[];
  allGameRoundsData: Round[];
  handleBack: () => void;
}

const Logs: React.FC<LogsProps> = ({ currentGameData,allGameRoundsData, handleBack }) => {
  const [totalPoints, setTotalPoints] = useState<number[]>([]);
  const [totalAmount, setTotalAmount] = useState<number[]>([]);

  useEffect(() => {
    // Create maps to accumulate total points and amounts for each player
    const playerPointsMap: { [key: string]: number } = {};
    const playerAmountMap: { [key: string]: number } = {};
  
    // Loop through all rounds and accumulate both total points and amounts for each player
    allGameRoundsData.forEach((round) => {
      round.playerResults.forEach((player: Player) => {
        // If player already exists in the map, accumulate points and amount; otherwise, initialize
        playerPointsMap[player.name] = (playerPointsMap[player.name] || 0) + player.totalPoints;
        playerAmountMap[player.name] = (playerAmountMap[player.name] || 0) + player.amount;
      });
    });
  
    // Convert the playerPointsMap and playerAmountMap to arrays of total points and amounts
    const pointsArray = Object.values(playerPointsMap);
    const amountArray = Object.values(playerAmountMap);
  
    // Update the state with the calculated total points and amounts
    setTotalPoints(pointsArray);
    setTotalAmount(amountArray);
  }, [allGameRoundsData]);
  

  return (
    <div className="statement-result">
      <header className="header">
        <button className="back-button" onClick={handleBack}>
          ←
        </button>
        <h1>Logs</h1>
        <button className="home-button">🏠</button>
      </header>

      <form className="billing-container">
        <div className="w-full text-center">
          <h2 className="text-2xl font-semibold border-b-2 border-gray-400 pb-2">
            Current Game
          </h2>
        </div>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              {currentGameData.map((player, index) => (
                <th key={index}>{player.name.slice(0,3)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Maal</td>
              {currentGameData.map((player, index) => (
                <td key={index}>{player.maalPoints}</td>
              ))}
            </tr>
            <tr>
              <td>Total Points</td>
              {currentGameData.map((player, index) => (
                <td key={index}>{player.totalPoints}</td>
              ))}
            </tr>
            <tr>
              <td>Total amount</td>
              {currentGameData.map((player, index) => (
                <td key={index}>{player.amount}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </form>
      <form className="billing-container mt-6">
        <div className="flex w-full items-center justify-between p-1 border-b-2 border-gray-400">
          <h2 className="text-2xl font-semibold  pb-2">All Games</h2>

          <button className=" text-white py-0.5 px-4 rounded hover:bg-blue-600 flex items-center space-x-2">
            <FontAwesomeIcon icon={faShare} color="red" />
            <FontAwesomeIcon icon={faLink} color="red" />
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Round</th>
              {currentGameData.map((player, index) => (
                <th key={index}>{player.name.slice(0,3)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allGameRoundsData?.map((round, roundIndex) => (
              <tr key={roundIndex}>
                <td>{round.roundNumber}</td>
                {round.playerResults?.map((player, index) => (
                  <td key={index}>{player.totalPoints}</td>
                ))}
              </tr>
            ))}
            <tr>
              <td>Total Points</td>
              {totalPoints.map((point,index) => (
                <td key={index}>{point}</td>
              ))}
            </tr>
            <tr>
              <td>Total amount</td>
              {totalAmount.map((point,index) => (
                <td key={index}>{point}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </form>
      <div className="modal-actions">
        <button className="reset-btn">Edit Previous</button>
        <button className="start-game-btn">Next Game</button>
      </div>
    </div>
  );
};

export default Logs;
