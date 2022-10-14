import styled from "styled-components";
import Header from "../components/header";
import Score from "../components/score";
import Row from "../components/row";
import useGame from "../hooks/useGame";
import { settings } from "../App";

const Page = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #2a2121;
`;
const MyApp = styled.div`
  width: 30%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* border: solid 1px yellow; */

  @media screen and (max-width: 600px) {
    width: 95%;
  }
`;
const MatrixContainer = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* border: solid 1px yellow; */
`;

function PLayGame({ player1, player2, against }: settings) {
  const { gameMatrix, player1Plays, undoLast, score } = useGame({
    player1,
    player2,
    against,
  });

  const rowElements = gameMatrix.map((row, index) => {
    return (
      <Row key={index} columns={row} rowIndex={index} play={player1Plays} />
    );
  });

  return (
    <>
      <Page>
        <MyApp>
          <Header undo={undoLast} />
          <MatrixContainer>{rowElements}</MatrixContainer>
          <Score {...score} />
        </MyApp>
      </Page>
    </>
  );
}

export default PLayGame;
