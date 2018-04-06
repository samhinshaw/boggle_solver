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

import wordStarts1 from "../data/word-starts1.json";
import wordStarts2 from "../data/word-starts2.json";
import wordStarts3 from "../data/word-starts3.json";
import wordStarts4 from "../data/word-starts4.json";
import wordStarts5 from "../data/word-starts5.json";
import wordStarts6 from "../data/word-starts6.json";
import wordStarts7 from "../data/word-starts7.json";
import wordStarts8 from "../data/word-starts8.json";
import wordStarts9 from "../data/word-starts9.json";
import wordStarts10 from "../data/word-starts10.json";
import wordStarts11 from "../data/word-starts11.json";
import wordStarts12 from "../data/word-starts12.json";
import wordStarts13 from "../data/word-starts13.json";

const wordStartsSet = new Set(
  [].concat(
    wordStarts1.wordStarts,
    wordStarts2.wordStarts,
    wordStarts3.wordStarts,
    wordStarts4.wordStarts,
    wordStarts5.wordStarts,
    wordStarts6.wordStarts,
    wordStarts7.wordStarts,
    wordStarts8.wordStarts,
    wordStarts9.wordStarts,
    wordStarts10.wordStarts,
    wordStarts11.wordStarts,
    wordStarts12.wordStarts,
    wordStarts13.wordStarts
  )
);

// codesandbox doesn't like ...spread here because
// it thinks it might be an infinite loop
const dictionary = new Set(
  [].concat(
    dict01.words,
    dict02.words,
    dict03.words,
    dict04.words,
    dict05.words,
    dict06.words
  )
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
