import React from "react";

export const App: React.FC = () => {
  const [counter, setCounter] = React.useState(0);

  return (
    <div>
      <h1>This is SSR React</h1>
      <div style={{ display: "inline-flex", flexDirection: "column" }}>
        <span>{counter}</span>
        <button onClick={() => setCounter(counter + 1)}>increase</button>
      </div>
    </div>
  );
};
