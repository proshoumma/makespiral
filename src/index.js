const clear = require('clear');
const lolcatjs = require('lolcatjs');

const DEFAULT_INTERVAL = 30;

/**
 * create a manual delay of printing
 * @param {Number} ms 
 */
function makeDelay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * print array to the console
 * @param {Array} givenArray 
 * @param {Number} arraySize 
 * @param {Number} refreshInterval 
 */
async function printArray(givenArray, arraySize, refreshInterval) {
  await makeDelay(refreshInterval);

  clear();

  let arrayString = '';
  for (let i = 0; i < arraySize; i++) {
    arrayString = arrayString + givenArray[i].join(' ')  + '\n';
  }

  lolcatjs.options.seed = 1000;
  lolcatjs.fromString(arrayString);
}

/**
 * return empty spaces
 * @param {Number} spaceCount 
 */
function setSpaces(spaceCount) {
    let newString = '';
    while(spaceCount --) {
        newString = newString + ' ';
    }
    return newString;
}

/**
 * print usage example
 */
function printUsage() {
  console.log('usage: makespiral [array-size] [animation-interval]');
  console.log('example: makespiral 10 30');
}

async function makeSpiral(arraySize, animationInterval) {
  let topLine = 0;
  let bottomLine = arraySize - 1;
  let leftLine = 0;
  let rightLine = arraySize - 1;

  const spiral = [];
  let counter = arraySize * arraySize;
  const counterDigit = String(counter).length;

  // first we build the 2d array with empty spaces
  for (let i = 0; i < arraySize; i++) {
    spiral[i] = [];

    for (j = 0; j < arraySize; j++) {
      spiral[i][j] = setSpaces(counterDigit);
    }
  }

  // now we build the array and print each time with new values
  while (topLine <= bottomLine && leftLine <= rightLine) {
    // go from left to right filling the array
    for (let i = leftLine; i <= rightLine; i ++) {
      spiral[topLine][i] = String(counter).padStart(counterDigit, '0');
      counter = counter - 1;
      await printArray(spiral, arraySize, animationInterval);
    }
    topLine = topLine + 1;
    
    // go from top to bottom filling the array
    for (let i = topLine; i <= bottomLine; i++) {
      spiral[i][rightLine] = String(counter).padStart(counterDigit, '0');
      counter = counter - 1;
      await printArray(spiral, arraySize, animationInterval);
    }
    rightLine = rightLine - 1;
    

    // go from right to left filling the array
    for (let i = rightLine; i >= leftLine; i--) {
      spiral[bottomLine][i] = String(counter).padStart(counterDigit, '0');
      counter = counter - 1;
      await printArray(spiral, arraySize, animationInterval);
    }
    bottomLine = bottomLine - 1;

    // go from bottom to top filling the array
    for (let i = bottomLine; i >= topLine; i--) {
      spiral[i][leftLine] = String(counter).padStart(counterDigit, '0');
      counter = counter - 1;
      await printArray(spiral, arraySize, animationInterval);
    }
    leftLine = leftLine + 1;
  }
}

/**
 * main
 * @param {Array} args 
 */
function main(args) {
  // validate the arguments
  if (args.length <= 2) {
    console.log('Provide an array size like - 5 / 10 / 20');
    printUsage();
    return;
  }

  let arraySize = Number(args[2]);
  let animationInterval = DEFAULT_INTERVAL;
  
  // validate the given array size
  if (!arraySize || !Number.isInteger(arraySize)) {
    console.log('Provide a valid array size');
    printUsage();
    return;
  }

  // validate given interval value
  if (args[3] !== undefined) {
    if (Number.isInteger(Number(args[3]))) {
      animationInterval = Number(args[3]);
    } else {
      console.log('Provide a valid interval');
      printUsage();
      return;
    }
  }

  makeSpiral(arraySize, animationInterval);
}

module.exports = {
  main,
}