import { useContext } from "react";
import styled from "styled-components";
import Header from "../components/header";
import Score from "../components/score";
import Row from "../components/row";
import { settings } from "../App";
import { Context } from "../context/appContext";
import EndingNodal from "../components/endingNodal";

const Page = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: inherit;
  background-color: #2a2121;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    justify-content: flex-start;
    /* border: solid 1px yellow; */
  }
`;
const MyApp = styled.div`
  width: 30%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* border: solid 1px yellow; */

  @media screen and (max-width: 600px) {
    margin-top: 10vh;
  }

  @media screen and (max-width: 600px) {
    width: 95%;
    height: 70%;
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

function PLayGame() {
  const appContext = useContext(Context);
  if (!appContext) return null;

  const { gameMatrix, gameEnd } = appContext;

  const rowElements = gameMatrix.map((row, index) => {
    return <Row key={index} columns={row} rowIndex={index} />;
  });

  return (
    <>
      <Page>
        <MyApp>
          <Header />
          <MatrixContainer>{rowElements}</MatrixContainer>
          <Score />
        </MyApp>
        {gameEnd && <EndingNodal />}
      </Page>
    </>
  );
}

export default PLayGame;
