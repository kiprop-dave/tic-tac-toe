import { useContext } from "react";
import styled from "styled-components";
import { Context } from "../context/appContext";
const Container = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
type scoreProps = {
  background: string;
};

const ScoreTally = styled.div`
  width: 30%;
  height: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #6ec1f5;
  background-color: ${({ background }: scoreProps) => background};
  border-radius: 10px;
`;
const Label = styled.h4`
  color: #342c2c;
`;
const Number = styled.h3`
  color: #342c2c;
`;

function Score() {
  const appContext = useContext(Context);
  if (!appContext) return null;

  const { score, gameConfig } = appContext;

  return (
    <>
      <Container>
        {gameConfig.against === "CPU" && (
          <>
            <ScoreTally background="#6ec1f5">
              <Label>X(YOU)</Label>
              <Number>{score.playerWins}</Number>
            </ScoreTally>
            <ScoreTally background=" #f7f9f9">
              <Label>TIES</Label>
              <Number>{score.ties}</Number>
            </ScoreTally>
            <ScoreTally background="#ee9f0c">
              <Label>O(CPU)</Label>
              <Number>{score.cpuWins}</Number>
            </ScoreTally>
          </>
        )}
      </Container>
    </>
  );
}

export default Score;
