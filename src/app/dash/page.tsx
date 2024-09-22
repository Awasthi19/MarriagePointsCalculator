"use client"

import React, { useState, useEffect } from "react";
import Image from "next/image";
import History from "@/components/history";
import Logs from "@/components/logs";
import MaalCalculation from "@/components/maalcalc";
import PlayerForm from "@/components/playerform";
import GameSettings from "@/components/gamesetting";
import SignIn from "@/components/sign-in";
import { useSession } from "next-auth/react";
import axios from "axios";
import { PlayersObject, Player,Round } from "@/app/props/props";

const GameUI = () => {

  const [gameNames, setGameName] = useState<string[]>([]);

  useEffect(() => {


    const fetchGameName = async () => {
      try {
        const response = await axios.post("http://localhost:3000/api/gamenames");
        
        // Map through the response data and extract only the gameName
        const gameNamesArray = response.data.map((game: { gameName: string }) => game.gameName);
        const newGameNamesArray = gameNamesArray.map((name:string) => {
          // Extract created and updated timestamps
          const createdMatch = name.match(/created on (.+?) GMT/);
          const updatedMatch = name.match(/last updated on (.+?) GMT/);
        
          if (createdMatch && updatedMatch) {
            const createdDate = createdMatch[1].slice(4, 21); // Extracting "Sep 22 2024 10:04"
            const updatedDate = updatedMatch[1].slice(4, 21); // Extracting "Sep 22 2024 10:11"
            return `created on ${createdDate} - last updated on ${updatedDate}`;
          }
        
          return name; // Return the original name if there's no match
        });
        // Set the gameName array to state
        setGameName(newGameNamesArray);
      } catch (error) {
        console.error("Error fetching game names:", error);
      }
    };
    
    fetchGameName();
  }, []);
  


  const { data: session } = useSession();
  const isUserLoggedIn = Boolean(session?.user);
  const [showMessage, setShowMessage] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [settings, setSettings] = useState({
    pointRate: 5,
    murder: true,
    kidnap: false,
    seenPoint: 3,
    unseenPoint: 10,
    dubleeBonus: 5,
    foulPoint: 15,
  });

  const [showPlayers, setShowPlayers] = useState(false);
  const [showCalculate, setShowCalculate] = useState(false);
  const [gameNumber, setGameNumber] = useState(1);
  const [logShow, setLogShow] = useState(false);

  const initializePlayers = (): PlayersObject => {
    const players: PlayersObject = {};
    for (let i = 1; i <= 8; i++) {
      players[i] = {
        name: '',
        maalPoints: 0,
        status: 'active',
        isWinner: false,
        totalPoints: 0,
        amount: 0,
      };
    }
    return players;
  };

  const [players, setPlayers] = useState<PlayersObject>(initializePlayers());



  const handleInputChange = (index: number, field: keyof Player, value: string | number | boolean) => {
    setPlayers((prevPlayers) => ({
      ...prevPlayers,
      [index]: {
        ...prevPlayers[index],
        [field]: value,
      },
    }));
  };

  const handleStart = () => {
    const filteredPlayers = Object.keys(players).reduce((acc, key) => {
      if (players[+key].name.trim() !== "") {
        acc[+key] = players[+key];
      }
      return acc;
    }, {} as PlayersObject);

    if (Object.keys(filteredPlayers).length < 2) {
      alert("Please enter at least 2 players to start the game.");
      return;
    }

    setPlayers(filteredPlayers);
    setShowPlayers(false);
    setShowCalculate(true);
    console.log(players);
  };

  const handleDelete = (index: number) => {
    setPlayers((prevPlayers) => {
      const updatedPlayers = { ...prevPlayers };
      delete updatedPlayers[index];
      return updatedPlayers;
    });
  };

  const clearPlayers = () => {
    setPlayers({});
  };



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleReset = () => {
    setSettings({
      pointRate: 5,
      murder: true,
      kidnap: false,
      seenPoint: 3,
      unseenPoint: 10,
      dubleeBonus: 5,
      foulPoint: 15,
    });
  };

  const handleSaveAndStart = () => {
    setShowModal(false);
    setShowPlayers(true);
  };

  const handleLogBack = () => {
    setLogShow(false);
    setShowCalculate(true);
  };

  const handleCalculationBack = async () => {
    setShowCalculate(false);
    
  };

  const [currentGameData, setCurrentGameData] = useState<Player[]>([]);
  const [allGameRoundsData, setAllGameRoundsData] = useState<Round[]>([]);

  const handleCalculate = async () => {
    setShowCalculate(false);
    setGameNumber(gameNumber + 1);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/maalcalc",
        {
          players, // Pass players data
          settings, // Pass settings data
        },
        { headers: { "Content-Type": "application/json" } }
      );
      setCurrentGameData(response.data.currentRoundResult);
      setAllGameRoundsData(response.data.allRounds);
    } catch (error) {
      console.error("Error calculating game:", error);
    }
  };

  useEffect(() => {
    if (allGameRoundsData.length > 0) { // Adjust the condition as needed
      console.log(allGameRoundsData);
      setLogShow(true);
    }
  }, [allGameRoundsData]);
  

  const handleStartNewGame = async () => {
    if (!isUserLoggedIn) {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
    } else {
      setShowModal(!showModal);
      try {
        const response = await axios.post(
          "http://localhost:3000/api/newgame",
          { headers: { "Content-Type": "application/json" } }
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error creating game:", error);
      }
    } 
  };

  return (
    <div className="container">
      <div className="logo">
        <Image
          src="/icon.svg"
          alt="Game Logo"
          width={300}
          height={80}
          layout="intrinsic"
        />
      </div>
      <div className="outer-div">
        <SignIn />
        <div
          className={`${
            showMessage ? "text-red-500 scale-100 opacity-100" : "text-sm text-gray-400"
          }`}
        >
          Continue with Google before starting the game
        </div>

        <div className="center-content">
          <button className="start-game-btn " onClick={handleStartNewGame}>
            Start New Game
          </button>
        </div>
        
        <History gameNames={gameNames} />
      </div>

      {showModal && (
        <GameSettings
          settings={settings}
          handleChange={handleChange}
          handleReset={handleReset}
          handleSaveAndStart={handleSaveAndStart}
          handleSettingsBack={() => setShowModal(false)}
        />
      )}

      {showPlayers && (
        <PlayerForm
          players={players}
          handleInputChange={handleInputChange}
          handleDelete={handleDelete}
          clearPlayers={clearPlayers}
          handleStart={handleStart}
          handleBack={() => setShowPlayers(false)}
        />
      )}

      {showCalculate && (
        <MaalCalculation
          players={players}
          handleInputChange={handleInputChange}
          handleCalculate={handleCalculate}
          gameNumber={gameNumber}
          handleBack={handleCalculationBack}
        />
      )}

      {logShow && <Logs currentGameData={currentGameData} allGameRoundsData={allGameRoundsData} handleBack={handleLogBack} />}
    </div>
  );
};

export default GameUI;
