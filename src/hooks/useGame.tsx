import { useState, useEffect } from "react";
import { settings } from "../App";

const matrix = [
  [
    {
      value: "",
      icon: "",
    },
    {
      value: "",
      icon: "",
    },
    {
      value: "",
      icon: "",
    },
  ],
  [
    {
      value: "",
      icon: "",
    },
    {
      value: "",
      icon: "",
    },
    {
      value: "",
      icon: "",
    },
  ],
  [
    {
      value: "",
      icon: "",
    },
    {
      value: "",
      icon: "",
    },
    {
      value: "",
      icon: "",
    },
  ],
];

let first = false;

type play = {
  row: number;
  column: number;
  value: string;
  icon: string;
};

export type score = {
  playerWins: number;
  ties: number;
  cpuWins: number;
};

type gameEnd = {
  ended: boolean;
  winner: string | null;
};

export default function useGame({ player1, player2, against }: settings) {
  const [gameMatrix, setGameMatrix] = useState(matrix);
  const [justPlayed, setJustPlayed] = useState(false);
  const [gameStack, setGameStack] = useState<play[]>([]);
  const [score, setScore] = useState<score>({
    playerWins: 0,
    ties: 0,
    cpuWins: 0,
  });
  const [gameEnding, setGameEnding] = useState<gameEnd>({
    ended: false,
    winner: null,
  });

  const xIcon = "/icons/x-icon.svg";
  const oIcon = "/icons/O-icon.svg";

  // useEffect(() => {
  //   if (player1 === "O" && against === "CPU") {
  //     cpuPlays(xIcon, "X");
  //   }
  // }, []);

  // useEffect(() => {
  //   const timeout = setTimeout()
  // },[])

  // useEffect(() => {
  //   checkWinner();
  // }, [gameMatrix]);

  function player1Plays(rowIndex: number, columnIndex: number): void {
    if (against === "CPU") {
      if (player1 === "X") {
        setMatrix(rowIndex, columnIndex, "X", xIcon);
        play();
      } else if (player1 === "O") {
        if (gameMatrix[rowIndex][columnIndex].icon.length === 0) {
          setMatrix(rowIndex, columnIndex, "O", oIcon);
          play();
        }
      }
    }
    if (against === "HUMAN") {
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
    const _matrix = [...gameMatrix];
    _matrix[r][c] = { value: value, icon: icon };
    setGameMatrix(_matrix);
    setGameStack((prev) => [
      ...prev,
      { row: r, column: c, value: value, icon: icon },
    ]);
  }

  function getRandomIndex() {
    let rowIndex = Math.ceil(Math.random() * 2);
    let columnIndex = Math.ceil(Math.random() * 2);
    return { rowIndex, columnIndex };
  }

  function cpuPlays(icon: string, value: string) {
    let { rowIndex, columnIndex } = getRandomIndex();

    while (gameMatrix[rowIndex][columnIndex].icon.length > 0) {
      rowIndex = getRandomIndex().rowIndex;
      columnIndex = getRandomIndex().columnIndex;
    }

    // return setTimeout(() => {
    //   setMatrix(rowIndex, columnIndex, value, icon);
    // }, 500);
    setMatrix(rowIndex, columnIndex, value, icon);
  }

  function checkWinner() {
    const ended = gameMatrix.every((row) =>
      row.every((col) => col.value.length > 0),
    );

    const winComb1 =
      gameMatrix[0][0].value === gameMatrix[0][1].value &&
      gameMatrix[0][1].value === gameMatrix[0][2].value;
    const winComb2 =
      gameMatrix[1][0].value === gameMatrix[1][1].value &&
      gameMatrix[1][1].value === gameMatrix[1][2].value;
    const winComb3 =
      gameMatrix[2][0].value === gameMatrix[2][1].value &&
      gameMatrix[2][1].value === gameMatrix[2][2].value;
    const winComb4 =
      gameMatrix[0][0].value === gameMatrix[1][0].value &&
      gameMatrix[1][0].value === gameMatrix[2][0].value;
    const winComb5 =
      gameMatrix[0][1].value === gameMatrix[1][1].value &&
      gameMatrix[1][1].value === gameMatrix[2][1].value;
    const winComb6 =
      gameMatrix[0][2].value === gameMatrix[1][2].value &&
      gameMatrix[1][2].value === gameMatrix[2][2].value;
    const winComb7 =
      gameMatrix[0][0].value === gameMatrix[1][1].value &&
      gameMatrix[1][1].value === gameMatrix[2][2].value;
    const winComb8 =
      gameMatrix[0][2].value === gameMatrix[1][1].value &&
      gameMatrix[1][1].value === gameMatrix[2][0].value;

    if (
      winComb1 ||
      winComb2 ||
      winComb3 ||
      winComb4 ||
      winComb5 ||
      winComb6 ||
      winComb7 ||
      winComb8
    ) {
      console.log("game won");
    }
  }

  return { gameMatrix, player1Plays, undoLast, score };
}
