import { useContext } from "react";
import styled from "styled-components";
import { Context } from "../context/appContext";

const Container = styled.div`
  width: 30%;
  height: 100%;
  border-radius: 8px;
  box-shadow: 0 5px #130f0f;
  background-color: #342c2c;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const Choice = styled.img`
  width: 5rem;
  height: 5rem;
`;
interface TileProps {
  icon: string;
  rowIndex: number;
  columnIndex: number;
}

function Tile({ icon, rowIndex, columnIndex }: TileProps) {
  const appContext = useContext(Context);
  if (!appContext) return null;

  const { player1Plays } = appContext;

  const hasPicked = icon.length > 0;

  return (
    <>
      <Container
        onClick={() => !hasPicked && player1Plays(rowIndex, columnIndex)}
      >
        {hasPicked && <Choice src={icon} alt="x or o" />}
      </Container>
    </>
  );
}

export default Tile;
