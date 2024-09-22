import React from "react";

interface HistoryProps {
  gameNames: string[];
}

const History: React.FC<HistoryProps> = ({ gameNames }) => {
  console.log(JSON.stringify(gameNames,null,2));
  return (
    <form className="billing-container">
      <div className="w-full text-center">
        <h2 className="text-2xl font-semibold border-b-2 border-gray-400 pb-2">
          History
        </h2>
      </div>

      <table>
        <thead>
          <tr>
            <th> Game Name</th>
          </tr>
        </thead>
        <tbody>
            {gameNames.map((gameName, index) => (
              <tr key={index} className="p-0">
                <td className="text-sm px-0 " >{gameName}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </form>
  );
};

export default History;
