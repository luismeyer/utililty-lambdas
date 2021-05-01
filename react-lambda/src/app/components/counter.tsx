import React from "react";
import styled from "styled-components";

const StyledCounter = styled.div`
  margin: 8px 0;
  display: flex;
  flex-direction: column;
`;

export const Counter: React.FC = () => {
  const [counter, setCounter] = React.useState(0);

  return (
    <StyledCounter>
      <span>{counter}</span>
      <button onClick={() => setCounter(counter + 1)}>increase</button>
    </StyledCounter>
  );
};
