/**
 * Creates a block of text where each line starts with the amount of
 * linting errors found in a file/demo follwed by the file/demo name.
 *
 * @param  {string[]} errors  Array of demo/file names, each instance represets 1 error from it.
 * @return {string}           A formatted message to show to the user.
 */
export const generateErrorReport = function (errors) {
  if (!errors || !errors.length) {
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
