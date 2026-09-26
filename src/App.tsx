import { useState, useEffect } from "react";

export default function AdviceGenerator() {
  const [advice, setAdvice] = useState("");

  async function getAdvice() {
    const response = await fetch("https://api.adviceslip.com/advice");
    const data = await response.json();
    setAdvice(data.slip.advice);
  }

  useEffect(() => {
    getAdvice();
  }, []);

  return (
    <div>
      <p>{advice}</p>;<button onClick={getAdvice}></button>;
    </div>
  );
}
