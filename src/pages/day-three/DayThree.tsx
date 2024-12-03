import { useEffect, useState } from "react";
import ReturnHome from "../../components/ReturnToHome";

// const input = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

function getPartOneAnswer(input: string) {
  const mulRegex = /mul\(\d+,\d+\)/gm;
  const intRegex = /\d+/g;
  const mulMatches = input.match(mulRegex);

  if (!mulMatches) {
    return 0;
  }

  // Takes matches that look like "mul(2,4)", strips the integers and then multiplies them, returning the result.
  const multipliedMatches = mulMatches
    .map((match) => {
      const intsToMultiply = match.match(intRegex);
      if (!intsToMultiply) {
        return null;
      }
      return Number(intsToMultiply[0]) * Number(intsToMultiply[1]);
    })
    .filter((result) => result !== null); // removes null values, eliminates undefined / null errors in reducer;

  const summedMatches = multipliedMatches.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  return summedMatches;
}

function getPartTwoAnswer(input: string) {
  function findMulsToSum(input: RegExpMatchArray) {
    let mulsToSum = [];
    let currentStatus = "On";
    const doString = "do()";
    const dontString = "don't()";
    for (let index = 0; index < input.length; index++) {
      if (input[index] === dontString) {
        currentStatus = "Off";
      }
      if (input[index] === doString) {
        currentStatus = "On";
      }
      if (currentStatus === "On" && input[index] !== doString) {
        mulsToSum.push(input[index]);
      }
      if (currentStatus === "Off") {
        continue;
      }
    }
    return mulsToSum;
  }

  const mulAndConditionalRegex = /(mul\(\d+,\d+\))|(do\(\))|(don't\(\))/gm;
  const intRegex = /\d+/g;
  const mulAndConditionalMatches = input.match(mulAndConditionalRegex);

  if (!mulAndConditionalMatches) {
    return 0;
  }

  const mulsToSum = findMulsToSum(mulAndConditionalMatches);

  // Takes matches that look like "mul(2,4)", strips the integers and then multiplies them, returning the result.
  const multipliedMatches = mulsToSum
    .map((match) => {
      const intsToMultiply = match.match(intRegex);
      if (!intsToMultiply) {
        return null;
      }
      return Number(intsToMultiply[0]) * Number(intsToMultiply[1]);
    })
    .filter((result) => result !== null); // removes null values, eliminates undefined / null errors in reducer;

  const summedMatches = multipliedMatches.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  return summedMatches;
}

export default function DayThree() {
  const [input, setInput] = useState("");
  const partOneAnswer = getPartOneAnswer(input);
  const partTwoAnswer = getPartTwoAnswer(input);

  useEffect(() => {
    fetch("/day-three-puzzle-input.txt")
      .then((response) => response.text())
      .then((data) => setInput(data));
  }, []);

  return (
    <>
      <h1>Day Three</h1>
      <ReturnHome />
      <h2>The result for Part One is: {partOneAnswer}</h2>
      <h2>The result for Part Two is: {partTwoAnswer}</h2>
    </>
  );
}
