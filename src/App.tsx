import { useState, useEffect } from "react";
import iconDice from "./assets/images/icon-dice.svg";
import patternDivider from "./assets/images/pattern-divider-desktop.svg";

export default function AdviceGenerator() {
  const [advice, setAdvice] = useState("");
  const [adviceId, setAdviceId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  async function getAdvice() {
    setLoading(true);
    const response = await fetch("https://api.adviceslip.com/advice");
    const data = await response.json();
    setAdvice(data.slip.advice);
    setAdviceId(data.slip.id);
    setLoading(false);
  }

  useEffect(() => {
    getAdvice();
  }, []);

  return (
    <div className="min-h-screen bg-[hsl(218,23%,16%)] flex items-center justify-center p-6">
      <div className="relative bg-[hsl(217,19%,24%)] rounded-2xl p-8 sm:p-10 max-w-lg w-full text-center shadow-2xl">
        <p className="text-[hsl(150,100%,66%)] text-xs sm:text-sm font-bold tracking-[0.3em] mb-6">
          {adviceId ? `ADVICE #${adviceId}` : "LOADING..."}
        </p>

        <h1 className="text-xl sm:text-2xl font-bold text-white leading-snug mb-8 min-h-18">{loading ? "..." : `“${advice}”`}</h1>

        <img src={patternDivider} alt="" className="w-full mb-0" />

        <button
          onClick={getAdvice}
          aria-label="Generate new advice"
          className="absolute left-1/2 -translate-x-1/2 -bottom-7 w-14 h-14 rounded-full bg-[hsl(150,100%,66%)] flex items-center justify-center hover:shadow-[0_0_0_16px_hsla(150,100%,66%,0.15)] transition-shadow">
          <img src={iconDice} alt="" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
