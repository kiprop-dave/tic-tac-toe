import Tile from "./tile";
import styled from "styled-components";

type rowProps = {
  rowIndex: number;
  columns: column[];
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

  @media screen and (max-width: 600px) {
    height: 8rem;
  }
`;
function Row({ columns, rowIndex }: rowProps) {
  const columnElements = columns.map((col, index) => {
    return (
      <Tile
        key={index}
        icon={col.icon}
        rowIndex={rowIndex}
        columnIndex={index}
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
