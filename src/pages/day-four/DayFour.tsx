import { useEffect, useState } from "react";
import ReturnHome from "../../components/ReturnToHome";

// const input = `..X...
// .SAMX.
// .A..A.
// XMAS.S
// .X....`;

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

  let totalXmases = 0;
  const columns = matrix[0].length;

  function checkForwards(row: string[]) {
    let totalXmases = 0;
    let xmas = "";
    for (let index = 0; index < row.length; index++) {
      switch (row[index]) {
        case "X":
          if (xmas === "" || xmas === "XM" || xmas === "XMA" || xmas === "X") {
            xmas = "X";
          } else {
            xmas = "";
          }
          break;
        case "M":
          if (xmas === "X") {
            xmas = "XM";
          } else {
            xmas = "";
          }
          break;
        case "A":
          if (xmas === "XM") {
            xmas = "XMA";
          } else {
            xmas = "";
          }
          break;
        case "S":
          if (xmas === "XMA") {
            totalXmases += 1;
            xmas = "";
          } else {
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

  function getDiagonals(matrix: string[][]) {
    const rows = matrix.length;
    const cols = matrix[0].length;

    const getLeftToRightDiagonals = () => {
      const diagonals: string[][] = [];

      for (let col = 0; col < cols; col++) {
        const diagonal: string[] = [];
        let row = 0,
          currentCol = col;
        while (row < rows && currentCol < cols) {
          diagonal.push(matrix[row][currentCol]);
          row++;
          currentCol++;
        }
        if (diagonal.length > 3) {
          diagonals.push(diagonal);
        } else {
          continue;
        }
      }

      for (let row = 1; row < rows; row++) {
        const diagonal: string[] = [];
        let currentRow = row,
          col = 0;
        while (currentRow < rows && col < cols) {
          diagonal.push(matrix[currentRow][col]);
          currentRow++;
          col++;
        }
        if (diagonal.length > 3) {
          diagonals.push(diagonal);
        } else {
          continue;
        }
      }

      return diagonals;
    };

    const getRightToLeftDiagonals = () => {
      const diagonals: string[][] = [];

      for (let col = cols - 1; col >= 0; col--) {
        const diagonal: string[] = [];
        let row = 0,
          currentCol = col;
        while (row < rows && currentCol >= 0) {
          diagonal.push(matrix[row][currentCol]);
          row++;
          currentCol--;
        }
        if (diagonal.length > 3) {
          diagonals.push(diagonal);
        } else {
          continue;
        }
      }

      for (let row = 1; row < rows; row++) {
        const diagonal: string[] = [];
        let currentRow = row,
          col = cols - 1;
        while (currentRow < rows && col >= 0) {
          diagonal.push(matrix[currentRow][col]);
          currentRow++;
          col--;
        }
        if (diagonal.length > 3) {
          diagonals.push(diagonal);
        } else {
          continue;
        }
      }

      return diagonals;
    };

    return {
      leftToRightDiagonalArrays: getLeftToRightDiagonals(),
      rightToLeftDiagonalArrays: getRightToLeftDiagonals(),
    };
  }

  for (let row of matrix) {
    // finds the horizontal XMAS occurrences
    totalXmases += checkForwards(row);
    totalXmases += checkReverse(row);
  }

  totalXmases += getAndCheckVerticals(matrix);
  // Someone should really write the logic of how the vertical arrays are processed to match the horizontals and diagonals
  const { leftToRightDiagonalArrays, rightToLeftDiagonalArrays } =
    getDiagonals(matrix);

  for (let row of leftToRightDiagonalArrays) {
    totalXmases += checkForwards(row);
    totalXmases += checkReverse(row);
  }
  for (let row of rightToLeftDiagonalArrays) {
    totalXmases += checkForwards(row);
    totalXmases += checkReverse(row);
  }

  return totalXmases;
}

function getPartTwoAnswer(input: string) {}

export default function DayFour() {
  const [input, setInput] = useState("");
  const partOneAnswer = getPartOneAnswer(input);
  const partTwoAnswer = getPartTwoAnswer(input);

  useEffect(() => {
    fetch("/day-four-puzzle-input.txt")
      .then((response) => response.text())
      .then((data) => setInput(data));
  }, []);

  return (
    <>
      <h1>Day Three</h1>
      <ReturnHome />
      <h2>The result for Part One is: {partOneAnswer}</h2>
      {/* <h2>The result for Part Two is: {partTwoAnswer}</h2> */}
    </>
  );
}
