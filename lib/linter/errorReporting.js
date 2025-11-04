import {
  bold,
  cyanBright,
  gray,
  magenta,
  yellowBright
} from 'colorette';

/**
 * Replaces unicode characters that do not render
 * in cmd.exe with ASCII equivalents.
 *
 * @param  {string} str  A wrapped portion of text.
 * @return {string}      The wrapped text, sanitized if on Windows.
 */
const wrapForWindows = function (str) {
  /* v8 ignore if */
  if (process.platform === 'win32') {
    return str
      .replaceAll('╭', ' ')
      .replaceAll('╒', ' ')
      .replaceAll('╮', '')
      .replaceAll('╕', '')
      .replaceAll('╰', '|')
      .replaceAll('╘', '|')
      .replaceAll('╯', '|')
      .replaceAll('╛', '|')
      .replaceAll('│', '|')
      .replaceAll('├', '|')
      .replaceAll('╞', '|')
      .replaceAll('┤', '|')
      .replaceAll('╡', '|')
      .replaceAll('─', '_')
      .replaceAll('═', '_');
  }
  return str;
};

/**
 * Repeats a given character a desired amount of times,
 * plus 2 for additional box padding.
 *
 * @param  {string} character    The character to repeat.
 * @param  {number} longestLine  The amount of times to repeat
 * @return {string}              The character repeated n times.
 */
const filler = function (character, longestLine) {
  return (new Array(longestLine + 2))
    .fill(character)
    .join('');
};

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
    /* v8 ignore else */
    if (longestLine < line.length) {
      longestLine = line.length;
    }
  });

  const output = [
    gray('  ╭' + filler('─', longestLine) + '╮'),
    gray('  │' + filler(' ', longestLine) + '│'),
    lines
      .map((line) => {
        return gray('  │ ') + yellowBright(line.padEnd(longestLine)) + gray(' │');
      })
      .join('\n'),
    gray('  │' + filler(' ', longestLine) + '│'),
    gray('  ╰' + filler('─', longestLine) + '╯')
  ].join('\n');

  return wrapForWindows(output);
};

/**
 * Creates a block of text where each line starts with the amount of
 * linting errors found in a file/demo follwed by the file/demo name.
 *
 * @param  {string[]} errors  Array of demo/file names, each instance represets 1 error from it.
 */
export const generateErrorReport = function (errors) {
  if (!errors || !Array.isArray(errors) || !errors.length) {
    return;
  }
  const files = Object.groupBy(errors, ({ demoName }) => {
    return demoName;
  });

  for (const fileName in files) {
    const fileErrors = files[fileName];
    let longestLine = fileName.length;
    fileErrors.forEach((fileError) => {
      if (fileError.ruleName.length + 6 > longestLine) {
        longestLine = fileError.ruleName.length + 6;
      }
      /* v8 ignore else */
      if (fileError.message.length > longestLine) {
        longestLine = fileError.message.length;
      }
    });

    const output = [
      gray('  ╒' + filler('═', longestLine) + '╕'),
      gray('  │ ') + bold(cyanBright(fileName.padEnd(longestLine))) + gray(' │'),
      gray('  ╞' + filler('═', longestLine) + '╡')
    ];

    const rules = Object.groupBy(fileErrors, ({ ruleName }) => {
      return ruleName;
    });

    Object.keys(rules).forEach((ruleName, index) => {
      const ruleErrors = rules[ruleName];
      output.push(gray('  │ ') + magenta(ruleName.padEnd(longestLine)) + gray(' │'));
      output.push(gray('  ├' + filler('─', longestLine) + '┤'));
      for (const ruleError of ruleErrors) {
        output.push(gray('  │ ') + ruleError.message.padEnd(longestLine) + gray(' │'));
      }
      if (index < Object.keys(rules).length - 1) {
        output.push(gray('  ╞' + filler('═', longestLine) + '╡'));
      }
    });

    output.push(gray('  ╘' + filler('═', longestLine) + '╛'));
    console.info(wrapForWindows(output.join('\n')));
  }
};
