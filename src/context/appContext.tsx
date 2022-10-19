import { useState, useEffect, createContext } from "react";
import data from "../utils/matrix";
import { gameSettings, move, play, score, tile } from "../types/types";

interface AppContext {
  gameMatrix: tile[][];
  player1Plays: (r: number, c: number) => void;
  score: score;
  undoLast: () => void;
  gameEnd: boolean;
  gameStart: boolean;
  startGame: (par: string) => void;
  choosePlayer: (par1: string, par2: string) => void;
  gameConfig: gameSettings;
  winner: string | null;
  quitGame: () => void;
  endRound: () => void;
  xIcon: string;
  oIcon: string;
  nextTurn: tile | undefined;
}

const Context = createContext<AppContext | null>(null);

interface contextProps {
  children: React.ReactNode;
}

let first = false;

function ContextProvider({ children }: contextProps) {
  const [gameStart, setGameStart] = useState(false);
  const [gameEnd, setGameEnd] = useState(false);
  const [gameConfig, setGameConfig] = useState<gameSettings>({
    player1: "",
    player2: "",
    against: "",
  });
  const [winner, setWinner] = useState<string | null>(null);

  const [gameMatrix, setGameMatrix] = useState(data);
  const [justPlayed, setJustPlayed] = useState(false);
  const [gameStack, setGameStack] = useState<play[]>([]);
  const getLocalStorage = (): score => {
    const storedScore = localStorage.getItem("tic-tac-toe-score");
    if (storedScore) {
      return JSON.parse(storedScore);
    }
    return {
      playerWins: 0,
      ties: 0,
      cpuWins: 0,
    };
  };
  const [score, setScore] = useState<score>(() => getLocalStorage());
  const [nextTurn, setNextTurn] = useState<tile>();

  const xIcon = "/icons/x-icon.svg";
  const oIcon = "/icons/O-icon.svg";

  useEffect(() => {
    if (gameConfig.against === "HUMAN") {
      if (gameStack.length === 0) {
        setNextTurn({
          icon: xIcon,
          value: "X",
        });
      } else if (gameStack.length > 0) {
        if (nextTurn?.value === "X") {
          setNextTurn({
            icon: oIcon,
            value: "O",
          });
        } else if (nextTurn?.value === "O") {
          setNextTurn({
            icon: xIcon,
            value: "X",
          });
        }
      }
    }
  }, [gameStack.length, gameConfig.against]);

  useEffect(() => {
    localStorage.setItem("tic-tac-toe-score", JSON.stringify(score));
  }, [gameEnd]);

  useEffect(() => {
    if (gameConfig.player1 === "O" && gameConfig.against === "CPU") {
      cpuPlays(xIcon, "X");
    }

    if (gameConfig.player1 === "X" && gameConfig.against === "CPU") {
      if (!first) {
        first = true;
        return;
      }
      cpuPlays(oIcon, "O");
    }
  }, [gameConfig.against, justPlayed]);

  useEffect(() => {
    if (!gameEnd && gameStart) {
      checkWinner();
    }
  }, [gameStack.length]);

  function choosePlayer(player1: string, player2: string) {
    setGameConfig((prev) => ({
      ...prev,
      player1: player1,
      player2: player2,
    }));
  }

  function startGame(opponent: string) {
    setGameConfig((prev) => ({
      ...prev,
      against: opponent,
    }));
    setGameStart(true);
  }

  function player1Plays(rowIndex: number, columnIndex: number): void {
    if (gameConfig.against === "CPU") {
      if (gameConfig.player1 === "X") {
        setMatrix(rowIndex, columnIndex, "X", xIcon);
        play();
      } else if (gameConfig.player1 === "O") {
        setMatrix(rowIndex, columnIndex, "O", oIcon);
        play();
      }
    }
    if (gameConfig.against === "HUMAN") {
      if (gameStack.length === 0) {
        setMatrix(rowIndex, columnIndex, "X", xIcon);
        play();
      } else {
        const { value } = gameStack[gameStack.length - 1]; // check last play
        if (value === "X") {
          setMatrix(rowIndex, columnIndex, "O", oIcon);
          play();
        } else {
          setMatrix(rowIndex, columnIndex, "X", xIcon);
          play();
        }
      }
    }
  }

  function undoLast() {
    if (gameStack.length > 0) {
      const { row, column } = gameStack[gameStack.length - 1];
      const _matrix = [...gameMatrix];
      const _stack = [...gameStack];
      _stack.pop();
      _matrix[row][column] = { value: "", icon: "" };
      setGameMatrix(_matrix);
      setGameStack(_stack);
    }
  }

  const play = () => setJustPlayed((prev) => !prev);

  function setMatrix(r: number, c: number, value: string, icon: string) {
    const isFilled = checkFilled(r, c);
    if (!isFilled) {
      const _matrix = [...gameMatrix];
      _matrix[r][c] = { value: value, icon: icon };
      setGameMatrix(_matrix);
      setGameStack((prev) => [
        ...prev,
        { row: r, column: c, value: value, icon: icon },
      ]);
    }
  }

  function getRandomIndex(range: number) {
    let rowIndex = Math.floor(Math.random() * range);
    let columnIndex = Math.floor(Math.random() * range);
    return { rowIndex, columnIndex };
  }

  function cpuPlays(icon: string, value: string) {
    let { rowIndex, columnIndex } = getRandomIndex(3);

    const { winComb, ended } = checkGameStatus();

    if (!ended) {
      while (gameMatrix[rowIndex][columnIndex].icon.length !== 0) {
        rowIndex = getRandomIndex(3).rowIndex;
        columnIndex = getRandomIndex(3).columnIndex;
      }
    }

    // const firstPlay = gameStack.length === 0;
    // if (firstPlay) {
    //   let { rowIndex, columnIndex } = getRandomIndex(3);
    //   setMatrix(rowIndex, columnIndex, value, icon);
    // } else {
    //   const { row, column } = gameStack[gameStack.length - 1];
    //   const { row: bestRow, column: bestCol } = findBestMove(row, column);
    //   if (bestRow < 3 && bestCol < 3) {
    //     setMatrix(bestRow, bestCol, value, icon);
    //   }
    // }
    if (!winComb) {
      // setMatrix(rowIndex, columnIndex, value, icon);
      setTimeout(() => {
        setMatrix(rowIndex, columnIndex, value, icon);
      }, 50);
    }
  }

  function findBestMove(row: number, col: number): move {
    let r = row;
    let c = col;

    if (r === 0 && c === 0) {
      const right = checkFilled(r, c + 1);
      const down = checkFilled(r + 1, c);
      const diag = checkFilled(r + 1, c + 1);
      if (right && down && !diag) {
        r += 1;
        c += 1;
      } else if (!right && !diag && !down) {
        r += 1;
      }
    }

    return { row: r, column: c };
  }

  function checkFilled(r: number, c: number): boolean {
    let isFilled = false;
    if (gameMatrix[r][c].value.length > 0) {
      isFilled = true;
    }
    return isFilled;
  }

  function checkEqual(r1: number, c1: number, r2: number, c2: number): boolean {
    let isEqual = false;
    if (gameMatrix[r1][c1].value === gameMatrix[r2][c2].value) {
      isEqual = true;
    }
    return isEqual;
  }

  function checkGameStatus() {
    const ended = gameMatrix.every((row) =>
      row.every((col) => col.value.length > 0),
    );

    const rowOne = checkFilled(0, 0) && checkFilled(0, 1) && checkFilled(0, 2);
    const rowTwo = checkFilled(1, 0) && checkFilled(1, 1) && checkFilled(1, 2);
    const rowThree =
      checkFilled(2, 0) && checkFilled(2, 1) && checkFilled(2, 2);
    const column1 = checkFilled(0, 0) && checkFilled(1, 0) && checkFilled(2, 0);
    const columnTwo =
      checkFilled(0, 1) && checkFilled(1, 1) && checkFilled(2, 1);
    const columnThree =
      checkFilled(0, 2) && checkFilled(1, 2) && checkFilled(2, 2);
    const diagonalOne =
      checkFilled(0, 0) && checkFilled(1, 1) && checkFilled(2, 2);
    const diagonalTwo =
      checkFilled(0, 2) && checkFilled(1, 1) && checkFilled(2, 0);

    const row1 = checkEqual(0, 0, 0, 1) && checkEqual(0, 1, 0, 2);
    const row2 = checkEqual(1, 0, 1, 1) && checkEqual(1, 1, 1, 2);
    const row3 = checkEqual(2, 0, 2, 1) && checkEqual(2, 1, 2, 2);
    const col1 = checkEqual(0, 0, 1, 0) && checkEqual(1, 0, 2, 0);
    const col2 = checkEqual(0, 1, 1, 1) && checkEqual(1, 1, 2, 1);
    const col3 = checkEqual(0, 2, 1, 2) && checkEqual(1, 2, 2, 2);
    const diag1 = checkEqual(0, 0, 1, 1) && checkEqual(1, 1, 2, 2);
    const diag2 = checkEqual(0, 2, 1, 1) && checkEqual(1, 1, 2, 0);

    const winComb =
      (row1 && rowOne) ||
      (row2 && rowTwo) ||
      (row3 && rowThree) ||
      (col1 && column1) ||
      (col2 && columnTwo) ||
      (col3 && columnThree) ||
      (diag1 && diagonalOne) ||
      (diag2 && diagonalTwo);
    return { ended, winComb };
  }

  function checkWinner() {
    const { ended, winComb } = checkGameStatus();

    if (gameConfig.against === "HUMAN" && winComb && gameStack.length > 0) {
      setGameEnd(true);
      setWinner(gameStack[gameStack.length - 1].icon);
    }

    if (gameConfig.against === "CPU" && winComb && gameStack.length > 0) {
      setGameEnd(true);
      setWinner(gameStack[gameStack.length - 1].icon);

      const player1Value = gameConfig.player1; // X or O

      const winnerValue = gameStack[gameStack.length - 1].value;

      const userWins =
        (player1Value === "X" && winnerValue === "X") ||
        (player1Value === "O" && winnerValue === "O");

      if (userWins) {
        setScore((prev) => ({
          ...prev,
          playerWins: prev.playerWins + 1,
        }));
      } else if (!userWins && !ended) {
        setScore((prev) => ({
          ...prev,
          cpuWins: prev.cpuWins + 1,
        }));
      }
    }

    if (ended && !winComb && gameStack.length > 0) {
      setGameEnd(true);
      setWinner(null);
      if (gameConfig.against === "CPU") {
        setScore((prev) => ({
          ...prev,
          ties: prev.ties + 1,
        }));
      }
    }
  }

  function clearMatrix() {
    setGameStack([]);
    setGameMatrix((prev) => {
      const _matrix = prev.map((row) =>
        row.map((col) => ({ value: "", icon: "" })),
      );
      return _matrix;
    });
  }

  function quitGame() {
    setGameEnd(false);
    setGameStart(false);
    setGameConfig({
      player1: "",
      player2: "",
      against: "",
    });
    clearMatrix();
  }

  function endRound() {
    clearMatrix();
    setGameEnd(false);
  }

  const values: AppContext = {
    gameMatrix,
    player1Plays,
    score,
    undoLast,
    gameEnd,
    gameStart,
    startGame,
    choosePlayer,
    gameConfig,
    winner,
    quitGame,
    endRound,
    xIcon,
    oIcon,
    nextTurn,
  };
  return <Context.Provider value={values}>{children}</Context.Provider>;
}

export { ContextProvider, Context };
