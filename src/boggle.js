import $ from "jquery";
// For ease of implementation, the dictionary is brought in on app load.
// Ideally this loading would be deferred, because we would
// not need it to be loaded until the user has input their letters
import { dictionary, wordStartsSet, relativePositions } from "./dictionary";

// Theoretically, this solver should work fine for a grid of any size!
// However, I have only tested it with a grid size of 4.
const gridSize = 4;

// Declaring in upper scope so we don't have to pass grid to every instance of findWords
let grid = [];

// Once the user clicks submit...
$("#submitButton").click(function handleUI() {
  // Add the spinner (see below for promisified spinner function)
  addSpinner("#submitButton")
    // Then start solving the puzzle!
    .then(function solveBoggle() {
      // Clear the stored grid
      grid = [];
      // 1. Grab all of the letters input!
      // Normally we'd want to sanitize to prevent XSS
      // Grab inputs in each row separately so we can
      // address our letters by x and y coordinates
      // can't use () => {} here, need new context for `this`
      $(".row").each(function(yIndex) {
        $(this)
          .find(".input")
          .each(function(xIndex) {
            const letter = $(this).val();
            // For each letter, construct an object containing the
            // coordinates and the value. Do not push empty cells
            if (letter !== "") {
              grid.push({
                x: xIndex,
                y: yIndex,
                letter: letter
              });
            }
          });
      });
      // Make sure we only attempt solving if the user input some letters
      if (grid.length) {
        // Remove the notification
        $("#resultsNotification").remove();
        // And any previous results
        $("#boggleResults .content").remove();
        // add an unordered list
        $("#boggleResults").append(`
          <div class="content">
            <ul id="resultsList" ></ul>
          </div>
        `);
        // Unfortunately because I have implemented this as a recursive function
        // for ease of programming, we cannot update the DOM as we discover words
        // from a given starting tile. Theoretically, as we complete the search from
        // each given starting position, we can update the DOM, but I did not have
        // time to implement this.
        grid.forEach(function mapFromEachTile(tile) {
          // start with no previous tiles
          findWords([], tile);
        });
      }
    })
    // Finally, remove the spinner
    .then(function removeSpinner() {
      $("#submitButton").removeClass("is-loading");
    });
});

////////////////////////////////
//                            //
//        FIND WORDS          //
//                            //
////////////////////////////////

const findWords = function findWords(previousTiles, currentTile) {
  // generally speaking, codesandbox wasn't happy with the ...spread operator
  // Maybe if I added the babel plugin for it
  const allTiles = [].concat(previousTiles, currentTile);
  // 1. Find out what letters we currently have
  let currentString = "";
  allTiles.forEach(tile => {
    currentString += tile.letter;
  });
  // 2. If the current word is in the dictionary, add it!
  if (dictionary.has(currentString)) {
    addWordToList(currentString);
  }
  // 3. Figure out what new tiles we have around us.
  const nextTiles = [];
  relativePositions.forEach(function generateAbsolutePositions(position) {
    // Take our relative positions and map them to absolute positions
    // on the grid. Make sure we are not falling off the grid.
    const xPos = currentTile.x + position[0];
    const yPos = currentTile.y + position[1];
    if (xPos >= 0 && xPos < gridSize && yPos >= 0 && yPos < gridSize) {
      // Also check that we're not reusing tiles.
      // This O(n^2) solution is not ideal, BUT we can be sure that we will
      // only ever be checking 8 or fewer tiles, so I am not too concerned
      const conflict = previousTiles.filter(
        tile => tile.x === xPos && tile.y === yPos
      );
      if (!conflict.length) {
        // THEN we can push our tile, but we want the actual value from
        // the original grid, so we need to grab that. For now we will
        // grab the grid from the outer scope
        const tile = grid.filter(tile => tile.x === xPos && tile.y === yPos);
        nextTiles.push(...tile);
      }
    }
  });
  ///////////////////////////////////////////////
  //                  BASE CASE                //
  //         no new tiles left to add on       //
  ///////////////////////////////////////////////
  if (nextTiles.length < 1) {
    return false;
  }
  // Otherwise, we've got tiles we can extend to! But first, we should check that
  // the current string is the beginning of a word in the dictionary. This is NOT a
  // cheap operation, but it is more performant than extending to every tile
  // on the board from every tile.
  // No longer need this because we have set method
  // const possibleWords = dictionary.filter(function findStartOfWord(word) {
  //   return word.startsWith(currentString);
  // });

  ///////////////////////////////////////////////
  //             EARLY TERMINATION             //
  ///////////////////////////////////////////////
  // If our current string isn't the start of any word in the dictionary, end here as well
  if (!wordStartsSet.has(currentString)) {
    return false;
  }

  ///////////////////////////////////////////////
  //                  RECURSE                  //
  ///////////////////////////////////////////////
  // Otherwise, we can call findWords recursively with every next tile as the current tile
  nextTiles.forEach(function findNextWords(nextTile) {
    return findWords(allTiles, nextTile);
  });
};

///////////////////////////////////////////////
//             Utility Functions             //
///////////////////////////////////////////////

const addWordToList = function addWordToList(word) {
  $("#resultsList").append(`
      <li>${word}</li>
    `);
};

// Create async function to add spinner!
function addSpinner(spinnerTarget) {
  // JQuery deferred/promise
  const deferred = $.Deferred();
  $(spinnerTarget).addClass("is-loading");
  return deferred.resolve();
}
