import { useContext } from "react";
import styled from "styled-components";
import { Context } from "../context/appContext";

const Nodal = styled.div`
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

type colorProps = {
  textColor: string;
};

const WinOrDraw = styled.h2`
  color: ${({ textColor }: colorProps) => textColor};
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

function EndingNodal() {
  const appContext = useContext(Context);
  if (!appContext) return null;
  const { winner, quitGame, endRound, xIcon, oIcon } = appContext;

  const getwinnerState = () => {
    if (winner === xIcon) {
      return "X WON";
    } else if (winner === oIcon) {
      return "O WON";
    } else {
      return "DRAW";
    }
  };

  const getColor = () => {
    let color = "white";
    if (winner === xIcon) {
      color = "#6ec1f5";
    } else if (winner === oIcon) {
      color = "#ee9f0c";
    }
    return color;
  };

  return (
    <>
      <Nodal>
        <ResultsContainer>
          <Results>
            <Title>{getwinnerState()}</Title>
            <Winner>
              {winner ? (
                <>
                  <WinnerIcon src={winner} alt="X or O" />
                  <WinOrDraw textColor={getColor()}>TAKES THE ROUND</WinOrDraw>
                </>
              ) : (
                <WinOrDraw textColor={getColor()}>DRAW</WinOrDraw>
              )}
            </Winner>
            <ButtonsContainer>
              <Button
                back="#6ec1f5"
                shadow="0 4px #629bbe"
                onClick={() => quitGame()}
              >
                QUIT
              </Button>
              <Button
                back="#ee9f0c"
                shadow="0 4px  #fa6d1d"
                onClick={() => endRound()}
              >
                NEXT ROUND
              </Button>
            </ButtonsContainer>
          </Results>
        </ResultsContainer>
      </Nodal>
    </>
  );
}

export default EndingNodal;
