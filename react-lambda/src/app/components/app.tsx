import React from "react";
import styled from "styled-components";
import { Counter } from "./counter";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 0 auto;
`;

export const App: React.FC = () => {
  return (
    <StyledContainer>
      <h1>This is SSR React</h1>
      <Counter />
    </StyledContainer>
  );
};
