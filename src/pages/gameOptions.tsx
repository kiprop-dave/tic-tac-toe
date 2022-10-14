import { useState } from "react";
import styled from "styled-components";
import { players } from "../App";

const Container = styled.div`
  width: 30%;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 600px) {
    width: 95%;
  }
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
`;
const Icon = styled.img`
  width: 2rem;
  height: 2rem;
`;
const ChoiceContainer = styled.div`
  background-color: #342c2c;
  width: 100%;
  height: 50%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 5px #130f0f;
  padding: 3%;
`;
const H3Label = styled.h3`
  color: ${({ color }) => (color ? color : "white")};
`;
const XOContainer = styled.div`
  background-color: #2a2121;
  border-radius: 10px;
  display: flex;
  align-items: center;
  width: 100%;
  height: 3.5rem;
  padding: 1%;
`;
type ElementProps = {
  background?: string;
  shadow?: string;
};
const IconContainer = styled.div`
  width: 50%;
  background-color: ${({ background }: ElementProps) =>
    background ? background : "#2a2121"};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  cursor: pointer;
`;
const StartButton = styled.button`
  background-color: ${({ background }: ElementProps) =>
    background ? background : "#2a2121"};
  box-shadow: ${({ shadow }) => (shadow ? shadow : "none")};
  width: 100%;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  cursor: pointer;
  font-weight: 500;
  color: #2a2121;
  border: none;
`;

type optionsProps = {
  start: (players: players, opp: string) => any;
};

function GameOptions({ start }: optionsProps) {
  const [players, setPlayers] = useState({
    player1: "",
    player2: "",
  });

  function chooseX() {
    setPlayers({
      player1: "X",
      player2: "O",
    });
  }

  function chooseO() {
    setPlayers({
      player1: "O",
      player2: "X",
    });
  }

  function playAgainstCpu() {
    if (players.player1.length > 0) {
      let opponent = "CPU";
      start(players, opponent);
    }
  }

  function playAgainstPlayer() {
    if (players.player1.length > 0) {
      let opponent = "HUMAN";
      start(players, opponent);
    }
  }

  return (
    <>
      <Container>
        <Logo>
          <Icon src="/icons/x-icon.svg" alt="cross icon" />
          <Icon src="/icons/O-icon.svg" alt="O icon" />
        </Logo>
        <ChoiceContainer>
          <H3Label color="#6ec1f5">PICK PLAYER 1'S MARK</H3Label>
          <XOContainer>
            <IconContainer onClick={() => chooseX()}>
              <Icon src="/icons/x-icon.svg" alt="cross icon" />
            </IconContainer>
            <IconContainer background="#6ec1f5" onClick={() => chooseO()}>
              <Icon src="/icons/O-icon.svg" alt="O icon" />
            </IconContainer>
          </XOContainer>
          <H3Label color="gray">REMEMBER : X GOES FIRST</H3Label>
        </ChoiceContainer>
        <StartButton
          background="#ee9f0c"
          shadow="0 4px  #fa6d1d"
          onClick={() => playAgainstCpu()}
        >
          NEW GAME (VS CPU)
        </StartButton>
        <StartButton
          background="#6ec1f5"
          shadow="0 4px #629bbe"
          onClick={() => playAgainstPlayer()}
        >
          NEW GAME (VS PLAYER)
        </StartButton>
      </Container>
    </>
  );
}

export default GameOptions;
