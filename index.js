const restructureString = (stream, numRows) => {
  /*
    Function for formatting string in zigzag pattern given n elements tall. Does not mutate input string
    Args:
        stream: (string) The original string to be reformatted
        numRows: (num) the vertical number of elements in the zig zag pattern
    Returns: (string) reformatted version of stream following zigzag pattern 
    Example: restructureString("paypalishiring", 4) -> "pinalsigyahrpi"
   */
  if (numRows < 1) throw new Error("numRows arg mut be at least 1");
  // Split string for ease, also reverse this because pop is much faster than shift
  let streamArr = stream.split("").reverse();
  // Make array with n sub arrays
  let output = Array.from(Array(numRows), () => []);
  while (true) {
    // Build vertical section
    for (let i = 0; i < numRows; i++) {
      if (streamArr.length === 0) return [].concat(...output).join("");
      output[i].push(streamArr.pop());
    }
    // Build diagonal section (iterating  numRows - 2 times as bottom and top of diagonal are handled in vertical section)
    for (let i = numRows - 2; i > 0; i--) {
      if (streamArr.length === 0) return [].concat(...output).join("");
      output[i].push(streamArr.pop());
    }
  }
};

const restructureString2 = (stream, numRows) => {
  /*
    Function for formatting string in zigzag pattern given n elements tall. Does not mutate input string
    Args:
        stream: (string) The original string to be reformatted
        numRows: (num) the vertical number of elements in the zig zag pattern
    Returns: (string) reformatted version of stream following zigzag pattern 
    Example: restructureString2("paypalishiring", 4) -> "pinalsigyahrpi"
   */
  if (numRows < 1) throw new Error("numRows arg mut be at least 1");
  if (numRows === 1) return stream;
  let i = 0;
  // Creates Array of length equal to stream, from range 0 to stream.length - 1
  let indices = Array.from(Array(stream.length), () => i++);
  let output = "";
  let gap = numRows + numRows - 2;
  let validBaseIndices = indices.filter((i) => i % gap === 0);
  for (let row = 0; row < numRows; row++) {
    let validRowIndices = validBaseIndices
      .map((i) => i + row)
      .filter((i) => i < stream.length);
    // If row is not the top or bottom row, add the diagonal indices and sort so order is preserved
    if (row !== 0 && row !== numRows - 1) {
      let validDiagRowIndices = validBaseIndices
        .map((i) => i - row)
        .filter((i) => i > 0);
      validRowIndices = [...validRowIndices, ...validDiagRowIndices].sort(
        (a, b) => a > b
      );
    }
    validRowIndices.forEach((i) => (output = output.concat(stream.charAt(i))));
  }
  return output;
};
