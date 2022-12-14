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

  const solveSuduko = useCallback(
    async (value: Array<Array<number>>) => {
      try {
        const response = await fetch("/api/solve", {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          body: JSON.stringify(value),
        });

        console.log("status code: ", response.status); // 👉️ 200

        if (!response.ok) {
          console.log(response);
          alert("Error no Solution found for this suduko");
          //resetSuduko();
          throw new Error(`Error! status: ${response.status}`);
        }

        const result = await response.json();
        setSquares(result);
        console.log(result);
      } catch (err) {
        console.log(err);
      }
    },
    []
  );

  const sendEmail = useCallback(async () => {
    try {
      const obj = {
        toEmailAddress: inputValue,
        solvedPuzzle: squares,
      };
      const response = await fetch("/api/email", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(obj),
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
  }, [inputValue, squares]);

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
            newSquares[i][j] = squares[i][j];
          }
        }
      }
      setSquares(newSquares);
    },
    [squares]
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
          <div>
            <input
              style={{
                width: "300px",
              }}
              value={inputValue}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setInputValue(e.target.value)
              }
            />
            <button
              onClick={() => {
                sendEmail();
              }}
            >
              Send Email
            </button>
          </div>
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
