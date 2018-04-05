# Boggle Solver

[![View Boggle Solver](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/embed/1oy8wlm473?module=%2Fsrc%2Fboggle.js)

## Dependencies

* [JQuery](https://jquery.com) for DOM manipulation - ([npm](https://www.npmjs.com/package/jquery))
* [Bulma](https://bulma.io/) for quick styling - ([npm](https://www.npmjs.com/package/bulma))
* [atebits/Words](https://github.com/atebits/Words) for english dictionary (specifically, [en.txt](https://github.com/atebits/Words/blob/master/Words/en.txt))

## Feature Wishlist

If I had more time, I would like to:

* Deduplicate & alphabetize results.
* Sort results by word length.
* Displaying multiple columns of words.
* Display notification if no words found.
* Defer loading of the dictionary to speed up app start time (it is not needed immediately).
* Parallelize word discovery.
  * I begin searching for words at each tile/die with `mapFromEachTile()`. This `forEach` operation should be relatively straightforward to parallelize.
  * Because my search method is recursive, it is not parallelizable. However, `findWords()` calls multiple new instances of `findWords()`--these may be able to be spawned as new processes.
* Update DOM throughout discovery.
  * Because `findWords()` is recursive, we cannot get the results from `findWords()` until the call stack is completely popped off. However, if I rewrote `mapFromEachTile()` as an async non-blocking call, I could display results from each starting point as they were returned. However, this would pose new UI challenges.

## Performance

Performance of the boggle solver I wrote is not fantastic, but is not awful. Along the way, I attempted to block non-fruitful paths wherever possible. Crucially, if we discover that the current word we are building is not the beginning of a word in the dictionary, we terminate that call. While `findStartOfWord()` is the most heavily weighted function in the call stack, its presence increases the performance of the search by more than an order of magnitude.

## Finding a Dictionary

I wanted to reduce my time configuring and deploying as much as possible, so I decided to build my app on codesandbox.io. However, this meant I could not run a server, which made the dictionary querying more difficult. Had I written a server I could have easily read in a dictionary file in Node.js, or securely called an appropriate API without exposing credentials. To keep codesandbox.io viable and my solution simple, I decided to upload my dictionary as a JSON file. However, codesandbox.io has a very small file size limit! I wrote a quick R script to break down the `en.txt` file used in [word-list](https://www.npmjs.com/package/word-list) into small chunks, and write it out into JSON files. Then, the codesandbox.io file size limit circumvented, I uploaded these dictionary files and concat them on app load.
