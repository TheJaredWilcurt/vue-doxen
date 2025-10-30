/**
 * Puts a multi-or-single-line string in an ASCII box.
 *
 * @param  {string} str  Any text to log.
 * @return {string}      The given text in a box.
 */
export const wrapOutput = function (str) {
  let longestLine = 0;
  let lines = str.split('\n');
  lines.forEach((line) => {
    if (longestLine < line.length) {
      longestLine = line.length;
    }
  });

  function filler (character) {
    return (new Array(longestLine + 2))
      .fill(character)
      .join('');
  }

  const output = [
    '  ╭' + filler('─') + '╮',
    '  │' + filler(' ') + '│',
    lines
      .map((line) => {
        return '  │ ' + line.padEnd(longestLine) + ' │';
      })
      .join('\n'),
    '  │' + filler(' ') + '│',
    '  ╰' + filler('─') + '╯'
  ].join('\n');
  if (process.platform === 'win32') {
    return output
      .split('╭').join(' ')
      .split('╮').join('')
      .split('╰').join('|')
      .split('╯').join('|')
      .split('│').join('|')
      .split('─').join('_');
  }
  return output;
};

/**
 * Creates a block of text where each line starts with the amount of
 * linting errors found in a file/demo follwed by the file/demo name.
 *
 * @param  {string[]} errors  Array of demo/file names, each instance represets 1 error from it.
 * @return {string}           A formatted message to show to the user.
 */
export const generateErrorReport = function (errors) {
  if (!errors || !Array.isArray(errors) || !errors.length) {
    return;
  }

  const errorFileCounts = {};
  for (const fileName of errors) {
    errorFileCounts[fileName] = errorFileCounts[fileName] || 0;
    errorFileCounts[fileName] = errorFileCounts[fileName] + 1;
  }
  let errorReport = [];
  for (const errorFile in errorFileCounts) {
    const count = errorFileCounts[errorFile];
    errorReport.push(count + ' ' + errorFile);
  }
  return errorReport.join('\n');
};
