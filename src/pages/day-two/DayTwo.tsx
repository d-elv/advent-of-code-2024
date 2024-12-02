import { useEffect, useState } from "react";
import ReturnHome from "../../components/ReturnToHome";

// const input = `7 6 4 2 1
// 1 2 7 8 9
// 9 7 6 2 1
// 1 3 2 4 5
// 8 6 4 4 1
// 1 3 6 7 9`;

function getPartOneAnswer(input: string) {
  function checkIncreasing(input: number[]) {
    for (let index = 0; index < input.length; index++) {
      if (input[index + 1] < input[index]) {
        return false;
      }
      if (input[index + 1] === undefined) {
        return true;
      }
      if (input[index + 1] === input[index]) {
        return false;
      }
      if (input[index + 1] > input[index]) {
        if (input[index + 1] - input[index] > 3) {
          return false;
        }
      }
    }
    return false;
  }

  function checkDecreasing(input: number[]) {
    for (let index = 0; index < input.length; index++) {
      if (input[index + 1] > input[index]) {
        return false;
      }
      if (input[index + 1] === undefined) {
        return true;
      }
      if (input[index + 1] === input[index]) {
        return false;
      }
      if (input[index + 1] < input[index]) {
        if (input[index] - input[index + 1] > 3) {
          return false;
        }
      }
    }
    return false;
  }

  const levels = input.split("\n");
  const splitLevels = levels.map((level) => {
    const splitLevel = level.split(" ");
    const splitLevelNumbers = splitLevel.map((item) => {
      return parseInt(item);
    });
    // console.log(splitLevelNumbers);
    return splitLevelNumbers;
  });

  let levelTesting = [];

  for (let index = 0; index < splitLevels.length; index++) {
    if (
      checkIncreasing(splitLevels[index]) ||
      checkDecreasing(splitLevels[index])
    ) {
      levelTesting.push(splitLevels[index] + " Safe");
    } else {
      levelTesting.push(splitLevels[index] + " Unsafe");
    }
  }

  let safeLevels = 0;
  for (let index = 0; index < levelTesting.length; index++) {
    if (levelTesting[index].includes("Safe")) {
      safeLevels += 1;
    }
  }
  return safeLevels;
}

export default function DayTwo() {
  const [input, setInput] = useState("");
  const partOneAnswer = getPartOneAnswer(input);
  // const partTwoAnswer = getPartTwoAnswer(input);

  useEffect(() => {
    fetch("/day-two-puzzle-input.txt")
      .then((response) => response.text())
      .then((data) => setInput(data));
  }, []);

  return (
    <>
      <h1>Day Two</h1>
      <ReturnHome />
      <h2>The result for Part One is: {partOneAnswer}</h2>
      {/* <h2>The result for Part Two is: {partTwoAnswer}</h2> */}
    </>
  );
}
