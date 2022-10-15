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
  //   console.log("outside effect");
  //   if (player1 === "O" && against === "CPU") {
  //     let isCancelled = false;
  //     if (!isCancelled) {
  //       console.log("effect ran");
  //       cpuPlays(xIcon, "X");
  //     }
  //     return () => {
  //       isCancelled = true;
  //     };
  //   }
  // }, [gameStack.length]);

  // useEffect(() => {
  //   const timeout = setTimeout()
  // },[])

  useEffect(() => {
    if (!gameEnding.ended) {
      checkWinner();
    }
  }, [gameStack.length]);

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

  function checkEmpty(r: number, c: number): boolean {
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

  function checkWinner() {
    const ended = gameMatrix.every((row) =>
      row.every((col) => col.value.length > 0),
    );

    const rowOne = checkEmpty(0, 0) && checkEmpty(0, 1) && checkEmpty(0, 2);
    const rowTwo = checkEmpty(1, 0) && checkEmpty(1, 1) && checkEmpty(1, 2);
    const rowThree = checkEmpty(2, 0) && checkEmpty(2, 1) && checkEmpty(2, 2);
    const column1 = checkEmpty(0, 0) && checkEmpty(1, 0) && checkEmpty(2, 0);
    const columnTwo = checkEmpty(0, 1) && checkEmpty(1, 1) && checkEmpty(2, 1);
    const columnThree =
      checkEmpty(0, 2) && checkEmpty(1, 2) && checkEmpty(2, 2);
    const diagonalOne =
      checkEmpty(0, 0) && checkEmpty(1, 1) && checkEmpty(2, 2);
    const diagonalTwo =
      checkEmpty(0, 2) && checkEmpty(1, 1) && checkEmpty(2, 0);

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

    if (against === "HUMAN" && winComb && !gameEnding.ended) {
      setGameEnding({
        ended: true,
        winner: gameStack[gameStack.length - 1].icon,
      });
    }

    if (ended && !winComb) {
      setGameEnding({
        ended: true,
        winner: null,
      });
    }
  }

  function clearMatrix() {
    setGameMatrix(matrix);
    setGameEnding({
      ended: false,
      winner: null,
    });
    setGameStack([]);
  }

  // console.log(gameEnding);

  return { gameMatrix, player1Plays, undoLast, score, gameEnding, clearMatrix };
}
