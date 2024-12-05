import { useEffect, useState } from "react";
import ReturnHome from "../../components/ReturnToHome";

// const input = `..X...
// .SAMX.
// .A..A.
// XMAS.S
// .X....`;

const input = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

function getPartOneAnswer(input: string) {
  // Turns input string into 2D array
  const matrix = input.split("\n").map((row) => {
    return row.split("");
  });

  let xmasCount = 0;
  const columns = matrix[0].length;

  function checkForwards(row: string[]) {
    let xmasCount = 0;
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
            xmasCount += 1;
            xmas = "";
          } else {
            xmas = "";
          }
          break;
        default:
          xmas = "";
      }
    }
    return xmasCount;
  }

  function checkReverse(row: string[]) {
    let xmasCount = 0;
    const reversedRow = row.toReversed();
    xmasCount += checkForwards(reversedRow);
    return xmasCount;
  }

  function getAndCheckVerticals(matrix: string[][]) {
    let xmasCount = 0;
    const getColumns = (matrix: string[][], index: number) =>
      matrix.map((x) => x[index]);
    for (let index = 0; index < columns; index++) {
      xmasCount += checkForwards(getColumns(matrix, index));
      xmasCount += checkReverse(getColumns(matrix, index));
    }
    return xmasCount;
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
    xmasCount += checkForwards(row);
    xmasCount += checkReverse(row);
  }

  xmasCount += getAndCheckVerticals(matrix);
  // Someone should really write the logic of how the vertical arrays are processed to match the horizontals and diagonals
  const { leftToRightDiagonalArrays, rightToLeftDiagonalArrays } =
    getDiagonals(matrix);

  for (let row of leftToRightDiagonalArrays) {
    xmasCount += checkForwards(row);
    xmasCount += checkReverse(row);
  }
  for (let row of rightToLeftDiagonalArrays) {
    xmasCount += checkForwards(row);
    xmasCount += checkReverse(row);
  }

  return xmasCount;
}

function getPartTwoAnswer(input: string) {
  // Turns input string into 2D array
  const matrix = input.split("\n").map((row) => {
    return row.split("");
  });
  console.log(matrix);

  let masCount = 0;

  function checkEastSouthEast(rowIndex: number, colIndex: number) {
    // console.log(matrix[rowIndex][colIndex], rowIndex, colIndex);

    // Checks the diagonal south east & the relative 2 rows below for MAS MAS or MAS SAM
    if (matrix[rowIndex + 2] === undefined) return false;
    if (matrix[rowIndex + 2][colIndex + 2] === undefined) return false;

    if (matrix[rowIndex + 2][colIndex + 2] === "M") {
      // Checks southEast opposite is not also M (Or it'd be MAM)
      return false;
    }
    if (matrix[rowIndex + 2][colIndex + 2] === "S") {
      if (
        // X-MAS check
        (matrix[rowIndex + 1][colIndex + 1] === "A" && // Checks for MAS MAS
          matrix[rowIndex + 2][colIndex + 0] === "M" &&
          matrix[rowIndex + 0][colIndex + 2] === "S") ||
        (matrix[rowIndex + 1][colIndex + 1] === "A" && // Checks for MAS SAM
          matrix[rowIndex + 2][colIndex + 0] === "S" &&
          matrix[rowIndex + 0][colIndex + 2] === "M")
      ) {
        return true;
      }
    }
    return false;
  }

  function checkWestSouthWest(rowIndex: number, colIndex: number) {
    // console.log(matrix[rowIndex][colIndex], rowIndex, colIndex);

    // Checks the diagonal south west & the relative 2 rows below for MAS MAS or MAS SAM
    if (matrix[rowIndex + 2] === undefined) return false;
    if (matrix[rowIndex + 2][colIndex - 2] === undefined) return false;

    if (matrix[rowIndex + 2][colIndex - 2] === "M") {
      // Checks South West opposite is not also M (Or it'd be MAM)
      return false;
    }
    if (matrix[rowIndex + 2][colIndex - 2] === "S") {
      if (
        // X-MAS check
        (matrix[rowIndex + 1][colIndex - 1] === "A" && // Checks for MAS MAS
          matrix[rowIndex + 2][colIndex - 0] === "M" &&
          matrix[rowIndex + 0][colIndex - 2] === "S") ||
        (matrix[rowIndex + 1][colIndex - 1] === "A" && // Checks for MAS SAM
          matrix[rowIndex + 2][colIndex - 0] === "S" &&
          matrix[rowIndex + 0][colIndex - 2] === "M")
      ) {
        return true;
      }
    }
    return false;
  }

  function checkWestNorthWest(rowIndex: number, colIndex: number) {
    // console.log(matrix[rowIndex][colIndex], rowIndex, colIndex);

    // Checks the diagonal south west & the relative 2 rows below for MAS MAS or MAS SAM
    if (matrix[rowIndex - 2] === undefined) return false;
    if (matrix[rowIndex - 2][colIndex - 2] === undefined) return false;

    if (matrix[rowIndex - 2][colIndex - 2] === "M") {
      // Checks South West opposite is not also M (Or it'd be MAM)
      return false;
    }
    if (matrix[rowIndex - 2][colIndex - 2] === "S") {
      if (
        // X-MAS check
        (matrix[rowIndex - 1][colIndex - 1] === "A" && // Checks for MAS MAS
          matrix[rowIndex - 2][colIndex - 0] === "M" &&
          matrix[rowIndex - 0][colIndex - 2] === "S") ||
        (matrix[rowIndex - 1][colIndex - 1] === "A" && // Checks for MAS SAM
          matrix[rowIndex - 2][colIndex - 0] === "S" &&
          matrix[rowIndex - 0][colIndex - 2] === "M")
      ) {
        return true;
      }
    }
    return false;
  }

  matrix.forEach((line, rowIndex) => {
    line.forEach((cell, columnIndex) => {
      if (cell === "M") {
        if (checkEastSouthEast(rowIndex, columnIndex)) {
          console.log("East South East:", columnIndex + 1, rowIndex + 1);
          masCount += 1;
        }
        if (checkWestSouthWest(rowIndex, columnIndex)) {
          console.log("West South West:", columnIndex + 1, rowIndex + 1);
          masCount += 1;
        }
        // if (checkWestNorthWest(rowIndex, columnIndex)) {
        //   console.log("West North West:", columnIndex + 1, rowIndex + 1);
        //   masCount += 1;
        // }
      }
      // if (checkNorthEast(rowIndex, columnIndex)) {
      //   masCount += 1;
      // }
      // if (checkEast(rowIndex, columnIndex)) {
      //   masCount += 1;
      // }
      // if (checkSouthEast(rowIndex, columnIndex)) {
      //   masCount += 1;
      // }
      // if (checkSouth(rowIndex, columnIndex)) {
      //   masCount += 1;
      // }
      // if (checkSouthWest(rowIndex, columnIndex)) {
      //   masCount += 1;
      // }
      // if (checkWest(rowIndex, columnIndex)) {
      //   masCount += 1;
      // }
      // if (checkNorthWest(rowIndex, columnIndex)) {
      //   masCount += 1;
      // }
    });
  });
  return masCount;
}

export default function DayFour() {
  // const [input, setInput] = useState("");
  // const partOneAnswer = getPartOneAnswer(input);
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
      {/* <h2>The result for Part One is: {partOneAnswer}</h2> */}
      <h2>The result for Part Two is: {partTwoAnswer}</h2>
    </>
  );
}
