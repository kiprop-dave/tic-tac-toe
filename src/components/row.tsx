import Tile from "./tile";
import styled from "styled-components";

type rowProps = {
  rowIndex: number;
  columns: column[];
  play: (r: number, c: number) => void;
};

type column = {
  value: string;
  icon: string;
};

const Container = styled.div`
  width: 100%;
  height: 7rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* border: solid 1px yellow; */
`;
function Row({ columns, rowIndex, play }: rowProps) {
  const columnElements = columns.map((col, index) => {
    return (
      <Tile
        key={index}
        icon={col.icon}
        rowIndex={rowIndex}
        columnIndex={index}
        play={play}
      />
    );
  });

  return (
    <>
      <Container>{columnElements}</Container>
    </>
  );
}

export default Row;
