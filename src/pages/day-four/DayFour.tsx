import { useEffect, useState } from "react";
import ReturnHome from "../../components/ReturnToHome";

const input = `..X...
.SAMX.
.A..A.
XMAS.S
.X....`;

// const input = `MMMSXXMASM
// MSAMXMSMSA
// AMXSXMAAMM
// MSAMASMSMX
// XMASAMXAMM
// XXAMMXXAMA
// SMSMSASXSS
// SAXAMASAAA
// MAMMMXMMMM
// MXMXAXMASX`;

function getPartOneAnswer(input: string) {
  // Turns input string into 2D array
  const matrix = input.split("\n").map((row) => {
    return row.split("");
  });
  console.log(matrix);

  let totalXmases = 0;
  const columns = matrix[0].length;

  function checkForwards(row: string[]) {
    let totalXmases = 0;
    let xmas = "";
    for (let index = 0; index < row.length; index++) {
      switch (row[index]) {
        case "X":
          if (xmas === "") {
            xmas = "X";
          }
          break;
        case "M":
          if (xmas === "X") {
            xmas = "XM";
          }
          break;
        case "A":
          if (xmas === "XM") {
            xmas = "XMA";
          }
          break;
        case "S":
          if (xmas === "XMA") {
            totalXmases += 1;
            xmas = "";
          }
          break;
        default:
          xmas = "";
      }
    }
    return totalXmases;
  }

  function checkReverse(row: string[]) {
    let totalXmases = 0;
    const reversedRow = row.toReversed();
    totalXmases += checkForwards(reversedRow);
    return totalXmases;
  }

  function getAndCheckVerticals(matrix: string[][]) {
    let totalXmases = 0;
    const getColumns = (matrix: string[][], index: number) =>
      matrix.map((x) => x[index]);
    for (let index = 0; index < columns; index++) {
      totalXmases += checkForwards(getColumns(matrix, index));
      totalXmases += checkReverse(getColumns(matrix, index));
    }
    return totalXmases;
  }

  for (let row of matrix) {
    // finds the horizontal XMAS occurrences
    totalXmases += checkForwards(row);
    totalXmases += checkReverse(row);
  }
  totalXmases += getAndCheckVerticals(matrix);

  console.log(totalXmases);

  return "";
}

function getPartTwoAnswer(input: string) {}

export default function DayFour() {
  // const [input, setInput] = useState("");
  const partOneAnswer = getPartOneAnswer(input);
  const partTwoAnswer = getPartTwoAnswer(input);

  // useEffect(() => {
  //   fetch("/day-four-puzzle-input.txt")
  //     .then((response) => response.text())
  //     .then((data) => setInput(data));
  // }, []);

  return (
    <>
      <h1>Day Three</h1>
      <ReturnHome />
      <h2>The result for Part One is: {partOneAnswer}</h2>
      {/* <h2>The result for Part Two is: {partTwoAnswer}</h2> */}
    </>
  );
}
