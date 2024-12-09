import { useEffect, useState } from "react";
import ReturnHome from "../../components/ReturnToHome";
import { input } from "../../data/day-five-input";

// const input = `47|53
// 97|13
// 97|61
// 97|47
// 75|29
// 61|13
// 75|53
// 29|13
// 97|29
// 53|29
// 61|53
// 97|53
// 61|29
// 47|13
// 75|47
// 97|75
// 47|61
// 75|61
// 47|29
// 75|13
// 53|13

// 75,47,61,53,29
// 97,61,53,29,13
// 75,29,13
// 75,97,47,61,53
// 61,13,29
// 97,13,75,29,47`;

function getPartOneAnswer(input: string) {
  const rules = input.split("\n\n")[0].split("\n").sort();
  const updates = input.split("\n\n")[1].split("\n");

  function checkAgainstRules(pages: string[]) {
    const rulesForThisUpdate = rules.filter((rule) => {
      return (
        pages.indexOf(rule.slice(0, 2)) > -1 &&
        pages.indexOf(rule.slice(3)) > -1
      );
    });

    for (let page = 0; page < pages.length; page++) {
      for (let rule = 0; rule < rulesForThisUpdate.length; rule++) {
        if (
          pages[page + 1] === rulesForThisUpdate[rule].slice(0, 2) &&
          pages[page] === rulesForThisUpdate[rule].slice(3)
        ) {
          return false;
        }
      }
    }

    return true;
  }

  function testUpdate(update: string[]) {
    if (checkAgainstRules(update)) {
      return true;
    } else {
      return false;
    }
  }

  let middlePages: number[] = [];

  updates.forEach((update) => {
    const updateArray = update.split(",");
    if (testUpdate(updateArray)) {
      const middleIndex = Math.floor(updateArray.length / 2);
      middlePages.push(Number(updateArray[middleIndex]));
    }
  });

  const middlePagesSum = middlePages.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  return middlePagesSum;
}

function getPartTwoAnswer(input: string) {
  return 0;
}

export default function DayFive() {
  // const [input, setInput] = useState(input);
  const partOneAnswer = getPartOneAnswer(input);
  // const partTwoAnswer = getPartTwoAnswer(input);

  // useEffect(() => {
  //   fetch("/day-five-puzzle-input.txt")
  //     .then((response) => response.text())
  //     .then((data) => setInput(data));
  // }, []);

  return (
    <>
      <h1>Day Five</h1>
      <ReturnHome />
      <h2>The result for Part One is: {partOneAnswer}</h2>
      {/* <h2>The result for Part Two is: {partTwoAnswer}</h2> */}
    </>
  );
}
