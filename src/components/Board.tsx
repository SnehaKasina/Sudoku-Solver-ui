import styled from "@emotion/styled";
import React from "react";
import { StyledDiv } from "../Styles";

interface Props {
  squares: Array<Array<number>>;
  onChangeValue: (i: number, j: number, value: number) => void;
}

const StyledCell = styled.div<{ i: number; j: number }>`
  padding: 10px;
  border-color: red;
  border-style: solid;
  border-width: ${(props) => {
    const { i, j } = props;
    // Top Right Bottom Left
    if (i === 0 && j === 0) {
      return "2px 1px 1px 2px";
    } else if (i === 0 && j === 8) {
      return "2px 2px 1px 1px";
    } else if (
      (i === 8 && j === 0) ||
      (i === 2 && j === 0) ||
      (i === 5 && j === 0)
    ) {
      return "1px 1px 2px 2px";
    } else if (
      (i === 8 && j === 8) ||
      (i === 2 && j === 8) ||
      (i === 5 && j === 8)
    ) {
      return "1px 2px 2px 1px";
    } else if (i === 0) {
      return "2px 1px 1px 1px";
    } else if (j === 0 && i !== 2 && i !== 5) {
      return "1px 1px 1px 2px";
    } else if (j === 8) {
      return "1px 2px 1px 1px";
    } else if (i === 8 || i === 2 || i === 5) {
      return "1px 1px 2px 1px";
    } else {
      return "1px 1px 1px 1px";
    }
  }};
`;

const Board = (props: Props) => {
  const { squares, onChangeValue } = props;

  return (
    <div style={{ margin: "20px" }}>
      <StyledDiv direction="column" justifyContent="start">
        {squares.length > 0 &&
          squares.map((row, i) => {
            return (
              <StyledDiv direction="row" justifyContent="center" key={i}>
                {row.map((column, j) => {
                  return (
                    <StyledCell i={i} j={j} key={j}>
                      <input
                        style={{
                          height: "100%",
                          fontWeight: "bolder",
                          fontSize: "large",
                        }}
                        type="number"
                        min="1"
                        max="9"
                        value={column === 0 ? "" : column}
                        onChange={(event) =>
                          onChangeValue(i, j, Number(event.target.value))
                        }
                      ></input>
                    </StyledCell>
                  );
                })}
              </StyledDiv>
            );
          })}
      </StyledDiv>
    </div>
  );
};

export default Board;
