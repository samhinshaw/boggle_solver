// Unfortunately, codesandbox has file size limits
// so I had to split it up into multiple files!
// Normally, I would be doing this on the server,
// not the client! There are many npm packages or APIs I
// could use to make dictionary validation easier.
// However, I wanted to keep this example relatively simple.
import dict01 from "../data/dict-01.json";
import dict02 from "../data/dict-02.json";
import dict03 from "../data/dict-03.json";
import dict04 from "../data/dict-04.json";
import dict05 from "../data/dict-05.json";
import dict06 from "../data/dict-06.json";

import { wordStarts } from "../data/word-starts.json";

const wordStartsSet = new Set(wordStarts);

// codesandbox doesn't like ...spread here because
// it thinks it might be an infinite loop
const dictionary = [].concat(
  dict01.words,
  dict02.words,
  dict03.words,
  dict04.words,
  dict05.words,
  dict06.words
);

// A matrix that describes the possible relative positions around a tile.
const relativePositions = [
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1]
];

export { dictionary, wordStartsSet, relativePositions };
