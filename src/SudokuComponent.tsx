import { ChangeEvent, useCallback, useState } from "react";
import Board from "./components/Board";
import { StyledDiv } from "./Styles";

const grid: Array<Array<number>> = [
  [8, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 3, 6, 0, 0, 0, 0, 0],
  [0, 7, 0, 0, 9, 0, 2, 0, 0],
  [0, 5, 0, 0, 0, 7, 0, 0, 0],
  [0, 0, 0, 0, 4, 5, 7, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 3, 0],
  [0, 0, 1, 0, 0, 0, 0, 6, 8],
  [0, 0, 8, 5, 0, 0, 0, 1, 0],
  [0, 9, 0, 0, 0, 0, 4, 0, 0],
];


const SudokuComponent = () => {
  const [inputValue, setInputValue] = useState("bkasina@leomail.tamuc.edu");
  const [squares, setSquares] = useState<Array<Array<number>>>(grid);

  const solveSuduko = useCallback(async (value: Array<Array<number>>) => {
    try {
      const response = await fetch("/api/solve", {
        method: "POST",
        body: JSON.stringify(value),
        headers: {
          "Content-type": "application/json",
        },
      });

      console.log("status code: ", response.status); // 👉️ 200

      if (!response.ok) {
        console.log(response);
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();
      setSquares(result);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const sendEmail = useCallback(async (value: Array<Array<number>>) => {
    try {
      const obj = {
        toEmailAddress: inputValue,
        solvedPuzzle: squares,
      };
      const response = await fetch("/api/email", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-type": "application/json",
        },
      });

      console.log("status code: ", response.status); // 👉️ 200

      if (!response.ok) {
        console.log(response);
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();
      setSquares(result);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }, [inputValue,squares]);

  const resetSuduko = useCallback(() => {
    setSquares([
      [8, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 3, 6, 0, 0, 0, 0, 0],
      [0, 7, 0, 0, 9, 0, 2, 0, 0],
      [0, 5, 0, 0, 0, 7, 0, 0, 0],
      [0, 0, 0, 0, 4, 5, 7, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 3, 0],
      [0, 0, 1, 0, 0, 0, 0, 6, 8],
      [0, 0, 8, 5, 0, 0, 0, 1, 0],
      [0, 9, 0, 0, 0, 0, 4, 0, 0],
    ]);
  }, []);

  const onChangeValue = useCallback(
    (changeI: number, changeJ: number, value: number) => {
      const newSquares: Array<Array<number>> = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
      ];
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (i === changeI && j === changeJ) {
            newSquares[i][j] = value;
          } else {
            newSquares[i][j] = grid[i][j];
          }
        }
      }
      setSquares(newSquares);
    },
    []
  );
 
  return (
    <StyledDiv direction="column" justifyContent="start">
      <StyledDiv direction="row" justifyContent="center">
        Suduko Solver
      </StyledDiv>
      <StyledDiv direction="row" justifyContent="center">
        <StyledDiv direction="row" justifyContent="space-between">
          <div></div>
          <button
            onClick={() => {
              solveSuduko(squares);
            }}
          >
            Solve
          </button>
          <form>
            <input
              value={inputValue}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setInputValue(e.target.value)
              }
              placeholder="Enter the email address"
            />
            <button
              onClick={() => {
                sendEmail(squares);
              }}
            >
              Send Email
            </button>
          </form>
          <button
            onClick={() => {
              resetSuduko();
            }}
          >
            Reset
          </button>
          <div></div>
        </StyledDiv>
      </StyledDiv>
      <Board squares={squares} onChangeValue={onChangeValue} />
    </StyledDiv>
  );
};

export default SudokuComponent;
