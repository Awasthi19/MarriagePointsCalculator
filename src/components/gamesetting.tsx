import { faClone, faEye, faEyeSlash, faFlag, faSkullCrossbones, faUserSecret, faWeight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface GameSettingsProps {
  settings: {
    pointRate: number;
    murder: boolean;
    kidnap: boolean;
    seenPoint: number;
    unseenPoint: number;
    dubleeBonus: number;
    foulPoint: number;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleReset: () => void;
  handleSaveAndStart: () => void;
  handleSettingsBack: () => void;
}

const GameSettings: React.FC<GameSettingsProps> = ({
  settings,
  handleChange,
  handleReset,
  handleSaveAndStart,
  handleSettingsBack,
}) => {
  return (
    <>
      <div className="overlay" onClick={handleReset}></div>
      <div className="modal">
        <header className="header">
          <button className="back-button" onClick={handleSettingsBack}>
            ←
          </button>
          <h1>Game Settings</h1>
          <button className="home-button">🏠</button>
        </header>

        {/* Game Settings Form */}
        <div className="settings ">

          <label className="flex gap-8 justify-between">
            <div className="flex flex-col">
              <div className="flex items-center ">
                <FontAwesomeIcon icon={faWeight} />
                <div className="ml-5 font-bold ">Point Rate:</div>
              </div>
              <div className="text-xs text-gray-400">
                A decimal Value, such as 0.5 is also acceptable
              </div>
            </div>
            <input
              className="text-center  text-4xl leading-none h-10"
              style={{ color: "rgb(74,222,128)" }}
              type="number"
              name="pointRate"
              value={settings.pointRate}
              onChange={handleChange}
            />
          </label>


          <label className="flex gap-8 justify-between">
            <div className="flex flex-col">
              <div className="flex items-center ">
                <FontAwesomeIcon icon={faSkullCrossbones} />
                <div className="ml-5 font-bold "> Murder</div>
              </div>
              <div className="text-xs text-gray-400">
                Maal of unseen player will not be counted
              </div>
            </div>
            <div className="checkboxgroup">
            <input
            id="murder-checkbox"
              className="checkbox-input text-center  text-4xl leading-none h-10"
              style={{ color: "rgb(74,222,128)" }}
              type="checkbox"
              name="murder"
              checked={settings.murder}
              onChange={handleChange}
            />
            <label htmlFor="murder-checkbox" className="checkboxlabel"></label>
            </div>
              
          </label>

          <label className="flex gap-8 justify-between">
            <div className="flex flex-col">
              <div className="flex items-center ">
                <FontAwesomeIcon icon={faUserSecret} />
                <div className="ml-5 font-bold "> Kidnap</div>
              </div>
              <div className="text-xs text-gray-400">
                Maal of unseen player will be kidnapped by winner
              </div>
            </div>
            
            <div className="checkboxgroup">
            <input
            id="kidnap-checkbox"
              className=" checkbox-input text-center  text-4xl leading-none h-10"
              style={{ color: "rgb(74,222,128)" }}
              type="checkbox"
              name="kidnap"
              checked={settings.kidnap}
              onChange={handleChange}
            />
            <label htmlFor="kidnap-checkbox" className="checkboxlabel"></label>
            </div>
          </label>


          <label className="flex gap-8 justify-between">
            <div className="flex flex-col">
              <div className="flex items-center ">
                <FontAwesomeIcon icon={faEye} />
                <div className="ml-5 font-bold ">Seen Point</div>
              </div>
              <div className="text-xs text-gray-400">
                The point that winner gets from seen player
              </div>
            </div>
            <input
              className="text-center  text-4xl leading-none h-10"
              style={{ color: "rgb(74,222,128)" }}
              type="number"
              name="seenPoint"
              value={settings.seenPoint}
              onChange={handleChange}
            />
          </label>

          <label className="flex gap-8 justify-between">
            <div className="flex flex-col">
              <div className="flex items-center ">
                <FontAwesomeIcon icon={faEyeSlash} />
                <div className="ml-5 font-bold ">Unseen Point</div>
              </div>
              <div className="text-xs text-gray-400">
                The point that winner gets from unseen player
              </div>
            </div>
            <input
              className="text-center  text-4xl leading-none h-10"
              style={{ color: "rgb(74,222,128)" }}
              type="number"
              name="unseenPoint"
              value={settings.unseenPoint}
              onChange={handleChange}
            />
          </label>

          <label className="flex gap-8 justify-between">
            <div className="flex flex-col">
              <div className="flex items-center ">
                <FontAwesomeIcon icon={faClone} />
                <div className="ml-5 font-bold ">Dublee Point</div>
              </div>
              <div className="text-xs text-gray-400">
                Extra point if the dublee player wins
              </div>
            </div>
            <input
              className="text-center  text-4xl leading-none h-10"
              style={{ color: "rgb(74,222,128)" }}
              type="number"
              name="dubleeBonus"
              value={settings.dubleeBonus}
              onChange={handleChange}
            />
          </label>

          <label className="flex gap-8 justify-between">
            <div className="flex flex-col">
              <div className="flex items-center ">
                <FontAwesomeIcon icon={faFlag} />
                <div className="ml-5 font-bold ">Foul Point</div>
              </div>
              <div className="text-xs text-gray-400">
                The point that fouled player has to pay
              </div>
            </div>
            <input
              className="text-center  text-4xl leading-none h-10"
              style={{ color: "rgb(74,222,128)" }}
              type="number"
              name="foulPoint"
              value={settings.foulPoint}
              onChange={handleChange}
            />
          </label>

        </div>

        <div className="modal-actions">
          <button className="reset-btn" onClick={handleReset}>
            Reset settings
          </button>
          <button className="start-game-btn" onClick={handleSaveAndStart}>
            Save and Start
          </button>
        </div>
      </div>
    </>
  );
};

export default GameSettings;
