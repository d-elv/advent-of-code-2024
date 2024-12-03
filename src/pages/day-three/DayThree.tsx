import { useEffect, useState } from "react";
import ReturnHome from "../../components/ReturnToHome";

export default function DayTwo() {
  const [input, setInput] = useState("");
  // const partOneAnswer = getPartOneAnswer(input);
  // const partTwoAnswer = getPartTwoAnswer(input);

  useEffect(() => {
    fetch("/day-three-puzzle-input.txt")
      .then((response) => response.text())
      .then((data) => setInput(data));
  }, []);

  return (
    <>
      <h1>Day Two</h1>
      <ReturnHome />
      {/* <h2>The result for Part One is: {partOneAnswer}</h2> */}
      {/* <h2>The result for Part Two is: {partTwoAnswer}</h2> */}
    </>
  );
}
