import { useContext } from "react";
import styled from "styled-components";
import { Context } from "../context/appContext";

const Container = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* border: solid 1px yellow; */
`;
const Logo = styled.div`
  width: 30%;
  display: flex;
  height: 3rem;
  align-items: center;
`;
const Icon = styled.img`
  width: 2rem;
  height: 2rem;
`;

const Turn = styled.div`
  width: 30%;
  height: 3rem;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px #130f0f;
  background-color: #342c2c;

  .turn {
    color: #6ec1f5;
    margin-left: 0.4rem;
  }
`;
const RedoContainer = styled.div`
  width: 30%;
  height: 3rem;
  display: flex;
  align-items: center;
`;
const Redo = styled.div`
  height: 3rem;
  width: 4rem;
  border-radius: 5px;
  margin-left: auto;
  background-color: #6ec1f5;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px #629bbe;
  cursor: pointer;
`;

function Header() {
  const appContex = useContext(Context);
  if (!appContex) return null;
  const { undoLast, gameConfig, nextTurn } = appContex;

  return (
    <>
      <Container>
        <Logo>
          <Icon src="/icons/x-icon.svg" alt="x" />
          <Icon src="/icons/O-icon.svg" alt="O" />
        </Logo>
        {gameConfig.against === "HUMAN" && (
          <Turn>
            <Icon src={nextTurn?.icon} alt="x or o" />
            <h4 className="turn">TURN</h4>
          </Turn>
        )}
        <RedoContainer>
          <Redo onClick={() => undoLast()}>
            <Icon src="/icons/redo-icon.svg" alt="undo last move" />
          </Redo>
        </RedoContainer>
      </Container>
    </>
  );
}

export default Header;
