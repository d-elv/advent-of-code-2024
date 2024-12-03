import { useEffect, useState } from "react";
import ReturnHome from "../../components/ReturnToHome";

// const input = `7 6 4 2 1
// 12 15 18 19 26
// 1 2 7 8 9
// 9 7 6 2 1
// 1 3 2 4 5
// 8 6 4 4 1
// 1 3 6 7 9
// 45 47 48 50 51 52 54 51
// 23 26 27 30 30
// 40 41 44 47 49 51 55`;

// const input = `7 6 4 2 1
// 78 81 83 84 83 84
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

function getPartTwoAnswer(input: string) {
  // TEST VERSIONS OF EACH LEVEL WITH INNER INDEXES MISSING

  function checkVariationIncreasing(input: number[]) {
    for (let index = 0; index < input.length; index++) {
      if (
        input[index + 1] < input[index] ||
        input[index + 1] === input[index]
      ) {
        return false;
      }
      if (input[index + 1] > input[index]) {
        if (input[index + 1] - input[index] > 3) {
          return false;
        }
      }
      if (input[index + 1] === undefined) {
        return true;
      }
    }
    return false;
  }

  function checkVariationDecreasing(input: number[]) {
    for (let index = 0; index < input.length; index++) {
      if (
        input[index + 1] > input[index] ||
        input[index + 1] === input[index]
      ) {
        return false;
      }
      if (input[index + 1] < input[index]) {
        if (input[index] - input[index + 1] > 3) {
          return false;
        }
      }
      if (input[index + 1] === undefined) {
        return true;
      }
    }
    return false;
  }

  function createVariations(input: number[], lastIndexToRemove: number) {
    const firstIndexToRemove = 0;
    const variations: number[][] = [];

    for (let index = firstIndexToRemove; index <= lastIndexToRemove; index++) {
      // this line creates a new array without the current index of said array.
      // [7, 6, 4, 2, 1] on the second round would become [7, 4, 2, 1]
      const variation = input.slice(0, index).concat(input.slice(index + 1));
      variations.push(variation);
    }
    let successes = 0;
    for (let index = 0; index < variations.length; index++) {
      if (
        // an early false return before all variations of a level have been checked is causing a false error.
        checkVariationIncreasing(variations[index]) ||
        checkVariationDecreasing(variations[index])
      ) {
        successes += 1;
      } else {
        continue;
      }
    }
    if (successes > 0) {
      return true;
    } else {
      return false;
    }
  }

  function checkIncreasing(input: number[]) {
    const lastIndex = input.length - 1;
    for (let index = 0; index < input.length; index++) {
      if (input[index + 1] === input[index]) {
        const variationsResult = createVariations(input, lastIndex);
        return variationsResult;
      }
      if (input[index + 1] < input[index]) {
        const variationsResult = createVariations(input, lastIndex);
        return variationsResult;
      }

      if (input[index + 1] > input[index]) {
        if (input[index + 1] - input[index] > 3) {
          const variationsResult = createVariations(input, lastIndex);
          return variationsResult;
        }
      }
      if (input[index + 1] === undefined) {
        return true;
      }
    }
    const variationsResult = createVariations(input, lastIndex);
    return variationsResult;
  }

  function checkDecreasing(input: number[]) {
    const lastIndex = input.length - 1;
    for (let index = 0; index < input.length; index++) {
      if (input[index + 1] === input[index]) {
        const variationsResult = createVariations(input, lastIndex);
        return variationsResult;
      }
      if (input[index + 1] > input[index]) {
        const variationsResult = createVariations(input, lastIndex);
        return variationsResult;
      }
      if (input[index + 1] < input[index]) {
        if (input[index] - input[index + 1] > 3) {
          const variationsResult = createVariations(input, lastIndex);
          return variationsResult;
        }
      }
      if (input[index + 1] === undefined) {
        return true;
      }
    }
    const variationsResult = createVariations(input, lastIndex);
    return variationsResult;
  }

  const levels = input.split("\n");
  const splitLevels = levels.map((level) => {
    const splitLevel = level.split(" ");
    const splitLevelNumbers = splitLevel.map((item) => {
      return parseInt(item);
    });
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
  const partTwoAnswer = getPartTwoAnswer(input);

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
      <h2>The result for Part Two is: {partTwoAnswer}</h2>
    </>
  );
}
