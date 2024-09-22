export interface Player {
    name: string;
    maalPoints: number;
    status: string;
    isWinner: boolean;
    totalPoints: number;
    amount: number;
  }
  
  export interface PlayersObject {
    [key: number]: Player; // key is the player's name
  }
  
  export interface Round {
    roundNumber: number;
    playerResults: Player[]; // Array of PlayerResult
  }