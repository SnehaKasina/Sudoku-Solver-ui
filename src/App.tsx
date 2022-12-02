import "./App.css";
import SudokuComponent from "./SudokuComponent";

import styled from "@emotion/styled";

const AppDiv = styled.div`
  background-color: #282c34;
  width: 100%;
  height: 100vh;
`;

const App = () => {
  return (
    <AppDiv>
      <SudokuComponent />
    </AppDiv>
  );
};

export default App;
