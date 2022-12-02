import styled from "@emotion/styled";

export const StyledDiv = styled.div<{ direction: string; justifyContent: string }>`
  display: flex;
  flex-direction: ${(props) => props.direction};
  justify-content: ${(props) => props.justifyContent};
  font-size: calc(10px + 2vmin);
  color: white;
  width: 100%;
`;