import styled from "styled-components";
import { useState, useContext } from "react";
import GameOptions from "./pages/gameOptions";
import PLayGame from "./pages/playGame";
import { Context } from "./context/appContext";

const Page = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #2a2121;
`;

export type players = {
  player1: string;
  player2: string;
};

export type settings = {
  player1?: string;
  player2?: string;
  against?: string;
  quit?: () => void;
};

function App() {
  const appContext = useContext(Context);
  if (!appContext) return null;

  const { gameStart } = appContext;

  const [gameReady, setGameReady] = useState(false);
  const [gameSettings, setGameSettings] = useState<settings>();

  function startGame(players: players, opponent: string) {
    setGameSettings({
      player1: players.player1,
      player2: players.player2,
      against: opponent,
    });
    setGameReady(true);
  }

  const quit = () => setGameReady(false);

  return (
    <>
      <Page>{gameStart ? <PLayGame /> : <GameOptions />}</Page>
    </>
  );
}

export default App;
