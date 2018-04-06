import rangeInclusive from "range-inclusive";
import { writeFile } from "jsonfile";
import { join } from "path";
// Unfortunately, codesandbox has file size limits
// so I had to split it up into multiple files!
// Normally, I would be doing this on the server,
// not the client! There are many npm packages or APIs I
// could use to make dictionary validation easier.
// However, I wanted to keep this example relatively simple.
import dict01 from "./dict-01.json";
import dict02 from "./dict-02.json";
import dict03 from "./dict-03.json";
import dict04 from "./dict-04.json";
import dict05 from "./dict-05.json";
import dict06 from "./dict-06.json";

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

// const sampleDict = ["gizmo", "tortoise", "bathtub"];
const wordStarts = [];
// sampleDict.forEach(word => {
dictionary.forEach(word => {
  console.log("reading word", word);
  const partials = rangeInclusive(1, word.length);
  partials.forEach(partialLength => {
    wordStarts.push(word.slice(0, partialLength));
  });
});

// deduplicate!
const wordStartsSet = new Set(wordStarts);

const filePath = join(__dirname, "word-starts.json");

const wordStartsJSON = {
  wordStarts: [...wordStartsSet]
};

writeFile(filePath, wordStartsJSON, err => {
  if (err) console.error(err);
});
