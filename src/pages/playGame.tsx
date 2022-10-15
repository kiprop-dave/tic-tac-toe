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

const EndingNodal = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 2;
  display: flex;
  align-items: center;
  background: rgba(30, 28, 28, 0.8);
  position: fixed;
  top: 0;
`;

const ResultsContainer = styled.div`
  height: 30%;
  background-color: #342c2c;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Results = styled.div`
  width: 35%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  @media screen and (max-width: 600px) {
    width: 95%;
  }
`;

const Title = styled.h3`
  color: white;
`;
const Winner = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const WinnerIcon = styled.img`
  width: 5rem;
  height: 5rem;
`;

const WinOrDraw = styled.h2`
  color: #6ec1f5;
  font-size: 35px;
`;
const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 45%;
`;
type buttonProps = {
  back?: string;
  shadow: string;
};
const Button = styled.button`
  color: #2a2121;
  background-color: ${({ back }: buttonProps) => (back ? back : "white")};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px 8px 12px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  box-shadow: ${({ shadow }) => shadow};
  cursor: pointer;
`;

function PLayGame({ player1, player2, against, quit }: settings) {
  const { gameMatrix, player1Plays, undoLast, score, gameEnding, clearMatrix } =
    useGame({
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
        {gameEnding.ended && (
          <EndingNodal>
            <ResultsContainer>
              <Results>
                <Title>YOU WON</Title>
                <Winner>
                  {gameEnding.winner ? (
                    <>
                      <WinnerIcon src={gameEnding.winner} alt="X or O" />
                      <WinOrDraw>TAKES THE ROUND</WinOrDraw>
                    </>
                  ) : (
                    <WinOrDraw>DRAW</WinOrDraw>
                  )}
                </Winner>
                <ButtonsContainer>
                  <Button back="#6ec1f5" shadow="0 4px #629bbe">
                    QUIT
                  </Button>
                  <Button back="#ee9f0c" shadow="0 4px  #fa6d1d">
                    NEXT ROUND
                  </Button>
                </ButtonsContainer>
              </Results>
            </ResultsContainer>
          </EndingNodal>
        )}
      </Page>
    </>
  );
}

export default PLayGame;
