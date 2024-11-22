const p1Name = '🤩';
const p2Name = '😎';
const p3Name = '😴';
const p4Name = '😳';

function getHeading() {
  return '┏━━━━┳━━━━┳━━━━┳━━━━┳━━━━┳━━━━┳━━━━┳━━━━┳━━━━┳━━━━┓';
}

function getFooting() {
  return '┗━━━━┻━━━━┻━━━━┻━━━━┻━━━━┻━━━━┻━━━━┻━━━━┻━━━━┻━━━━┛';
}

function getRowFooting() {
  return '┣━━━━╋━━━━╋━━━━╋━━━━╋━━━━╋━━━━╋━━━━╋━━━━╋━━━━╋━━━━┫';
}

// function getCharsInCell(p1Pos,cellNumber, bombBoxNumber) {
//   if (cellNumber === bombBoxNumber) {
//     return ' ' + '💥' + ' ┃';
//   }

//   if (p1Pos === cellNumber) {
//     return ' ' + p1Name + ' ┃';
//   }
//   return ' ⬜ ┃';
// }

function getCharsInCell(p1Pos, cellNumber, bombBoxNumber) { // For placing object in a cell
  if (cellNumber === bombBoxNumber) {
    return placeObject('💥');
  }

  if (p1Pos === cellNumber) {
    return placeObject(p1Name);
  }
  return placeObject('⬜');
  // return placeObject(cellNumber);
}

function placeObject(object) {
  return ' ' + object + ' ┃';
}

function createRow(p1Pos, rowStartNumber, bombBoxNumber) {
  let rowString = '';

  for (let boxNumber = rowStartNumber; boxNumber > rowStartNumber - 10; boxNumber--) {
    rowString += getCharsInCell(p1Pos, boxNumber, bombBoxNumber);
  }

  return '┃' + rowString;
}

function createGrids(p1Pos, bombBox) {
  let grid = getHeading() + '\n';

  for (let noOfRows = 10; noOfRows > 0; noOfRows--) {
    grid += createRow(p1Pos, noOfRows * 10, bombBox) + '\n';

    if (noOfRows !== 1) {
      grid += getRowFooting() + '\n';
    }
  }

  return grid + getFooting();
}

function getRandomNoInRange(to, from) { // 90, 100
  return from + Math.ceil(Math.random() * (to - from));
}

function getBombPosition() {
  return Math.ceil(Math.random() * 100);
}

function isCorrectBombPosition(bombPosition) {

  let isCorrectPosition = bombPosition - 11 !== '🧨';
  isCorrectPosition = isCorrectPosition && bombPosition - 10 !== '🧨';
  isCorrectPosition = isCorrectPosition && bombPosition - 9 !== '🧨';

  isCorrectPosition = isCorrectPosition && bombPosition - 1 !== '🧨';
  isCorrectPosition = isCorrectPosition && bombPosition + 1 !== '🧨';

  isCorrectPosition = isCorrectPosition && bombPosition + 9 !== '🧨';
  isCorrectPosition = isCorrectPosition && bombPosition + 10 !== '🧨';
  isCorrectPosition = isCorrectPosition && bombPosition + 11 !== '🧨';

  return isCorrectPosition;
}

function generateBombs() {
  let totalNoOfBobms = 20;
  let bombPosition = '';

  while (totalNoOfBobms > 0) {
    bombPosition += getBombPosition() + ' ';
    if (isCorrectBombPosition(bombPosition)) {
      totalNoOfBobms -= 1;
    }
  }

  return bombPosition;
}

function didPlayerWin(position, endPosition) {
  return position === endPosition;
}

function getEndPosition() {
  return getRandomNoInRange(100, 110);
}

function getStartPosition() {
  const position = +prompt("Enter your starting position(1-10): ", "0");

  if (position < 10 && position > 0) {
    return position;
  }

  console.log("Starting position can only be between 1 and 10");
  console.log("Enter the valid position!!!");

  return getStartPosition();
}

function isBombEncountered(position, bombPositions) {
  let currentBombPos = '';

  for (let index = 0; index < bombPositions.length; index++) {
    currentBombPos += bombPositions[index];

    if (bombPositions[index] === ' ') {
      if (+currentBombPos === position) {
        return true;
      }
      currentBombPos = '';
    }

  }

  return false;
}

function iskeyPressedValid(key) {
  return key === 'a' || key === 's' || key === 'd' || key === 'w';
}

function getKey() {
  const keyPressed = prompt("Enter a key to move..");

  if (!iskeyPressedValid(keyPressed)) {
    console.log("Please enter an Valid key..");
    return getKey();
  }

  return keyPressed;
}

function getNextPosition(currentPosition) {
  const key = getKey();

  switch (key) {
    case 'a':
      return currentPosition + 1;
    case 'w':
      return currentPosition + 10;
    case 'd':
      return currentPosition - 1;
    case 's':
      return currentPosition - 10;
  }
}

function explosionMessage(startPosition) {
  console.log(createGrids(startPosition, startPosition));
  prompt("Ohh..You encountered a Bomb💥..Press enter");
}

function movePlayer(startPosition) {
  console.log(createGrids(startPosition));
  console.log("a : ⬅️   w : ⬆️   d : ➡️  s : ⬇️");
}

function continueTillWin(startPosition, endPosition, bombPositions) {
  while (!didPlayerWin(startPosition, endPosition)) {
    if (startPosition < 1) {
      startPosition = getStartPosition();
    }
    console.clear();

    if (isBombEncountered(startPosition, bombPositions)) {
      explosionMessage();
      startPosition = 0;
      continue;
    }

    movePlayer(startPosition);

    startPosition = getNextPosition(startPosition);
  }
}

function startGame() {
  const bombPositions = generateBombs();
  const endPosition = getEndPosition();
  let startPosition = 0;

  console.log(createGrids());
  continueTillWin(startPosition, endPosition, bombPositions);
  console.log("Congrats..🎉..You found the destination🤩🥳");
}

startGame();
