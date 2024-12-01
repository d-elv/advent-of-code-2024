import { useEffect, useState } from "react";
import ReturnHome from "../../components/ReturnToHome";

// const input = `3   4
// 4   3
// 2   5
// 1   3
// 3   9
// 3   3`;

function getPartOneAnswer(input: string) {
  const inputAsArray = input.split(/   |\n/);
  let leftSideList = [];
  let rightSideList = [];

  for (let index = 0; index < inputAsArray.length; index++) {
    if (index % 2 === 0) {
      leftSideList.push(inputAsArray[index]);
    } else {
      rightSideList.push(inputAsArray[index]);
    }
  }
  leftSideList.sort();
  rightSideList.sort();

  let differenceArray = [];
  for (let index = 0; index < leftSideList.length; index++) {
    if (leftSideList[index] > rightSideList[index]) {
      differenceArray.push(
        Number(leftSideList[index]) - Number(rightSideList[index])
      );
    } else {
      differenceArray.push(
        Number(rightSideList[index]) - Number(leftSideList[index])
      );
    }
  }
  const summedResults = differenceArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  return summedResults;
}

function checkFrequency(leftNumber: string, rightSideList: string[]) {
  let frequency = 0;

  for (let index = 0; index < rightSideList.length; index++) {
    if (leftNumber === rightSideList[index]) {
      frequency += 1;
    }
  }
  return frequency;
}

function getPartTwoAnswer(input: string) {
  const inputAsArray = input.split(/   |\n/);
  let leftSideList = [];
  let rightSideList = [];

  for (let index = 0; index < inputAsArray.length; index++) {
    if (index % 2 === 0) {
      leftSideList.push(inputAsArray[index]);
    } else {
      rightSideList.push(inputAsArray[index]);
    }
  }
  leftSideList.sort();
  rightSideList.sort();

  let similarityScore = [];
  for (let index = 0; index < leftSideList.length; index++) {
    const frequency = checkFrequency(leftSideList[index], rightSideList);
    similarityScore.push(Number(frequency) * Number(leftSideList[index]));
  }

  const summedResults = similarityScore.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  return summedResults;
}

export default function DayOne() {
  const [input, setInput] = useState("");
  const partOneAnswer = getPartOneAnswer(input);
  const partTwoAnswer = getPartTwoAnswer(input);

  useEffect(() => {
    fetch("/day-one-puzzle-input.txt")
      .then((response) => response.text())
      .then((data) => setInput(data));
  }, []);

  return (
    <>
      <h1>Day One</h1>
      <ReturnHome />
      <h2>The result for Part One is: {partOneAnswer}</h2>
      <h2>The result for Part Two is: {partTwoAnswer}</h2>
    </>
  );
}
