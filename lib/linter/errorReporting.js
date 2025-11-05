import {
  bold,
  cyanBright,
  gray,
  magentaBright,
  redBright,
  yellowBright
} from 'colorette';

let $c = {
  bold,
  cyanBright,
  gray,
  magentaBright,
  redBright,
  yellowBright
};

/* v8 ignore else */
if (process.env.VITEST) {
  const x = (y) => y;
  $c = {
    bold: x,
    cyanBright: x,
    gray: x,
    magentaBright: x,
    redBright: x,
    yellowBright: x
  };
}

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
      .replaceAll('╔', ' ')
      .replaceAll('╮', '')
      .replaceAll('╕', '')
      .replaceAll('╗', '')
      .replaceAll('╰', '|')
      .replaceAll('╘', '|')
      .replaceAll('╚', '|')
      .replaceAll('╯', '|')
      .replaceAll('╛', '|')
      .replaceAll('╝', '|')
      .replaceAll('│', '|')
      .replaceAll('║', '|')
      .replaceAll('├', '|')
      .replaceAll('╞', '|')
      .replaceAll('╠', '|')
      .replaceAll('┤', '|')
      .replaceAll('╡', '|')
      .replaceAll('╣', '|')
      .replaceAll('╧', '|')
      .replaceAll('╤', '_')
      .replaceAll('─', '_')
      .replaceAll('═', '_') +
      '\n';
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
    $c.gray('  ╭' + filler('─', longestLine) + '╮'),
    $c.gray('  │' + filler(' ', longestLine) + '│'),
    lines
      .map((line) => {
        return $c.gray('  │ ') + $c.yellowBright(line.padEnd(longestLine)) + $c.gray(' │');
      })
      .join('\n'),
    $c.gray('  │' + filler(' ', longestLine) + '│'),
    $c.gray('  ╰' + filler('─', longestLine) + '╯')
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
      $c.gray('  ╒' + filler('═', longestLine) + '╕'),
      $c.gray('  │ ') + $c.bold($c.cyanBright(fileName.padEnd(longestLine))) + $c.gray(' │'),
      $c.gray('  ╞' + filler('═', longestLine) + '╡')
    ];

    const rules = Object.groupBy(fileErrors, ({ ruleName }) => {
      return ruleName;
    });

    Object.keys(rules).forEach((ruleName, index) => {
      const ruleErrors = rules[ruleName];
      output.push($c.gray('  │ ') + $c.magentaBright(ruleName.padEnd(longestLine)) + $c.gray(' │'));
      output.push($c.gray('  ├' + filler('─', longestLine) + '┤'));
      for (const ruleError of ruleErrors) {
        output.push($c.gray('  │ ') + ruleError.message.padEnd(longestLine) + $c.gray(' │'));
      }
      if (index < Object.keys(rules).length - 1) {
        output.push($c.gray('  ╞' + filler('═', longestLine) + '╡'));
      }
    });

    output.push($c.gray('  ╘' + filler('═', longestLine) + '╛'));
    console.info(wrapForWindows(output.join('\n')));
  }
};

export const summarizeErrorReport = function (errors) {
  if (!errors || !errors.length) {
    return;
  }
  const errorsByDemoName = Object.groupBy(errors, ({ demoName }) => {
    return demoName;
  });

  const header = 'Vue-Doxen Linter results summary';
  let longestLine = header.length;
  let longestErrorAmount = 1;
  let totalErrors = 0;
  let totalFiles = Object.keys(errorsByDemoName).length;

  for (const demoName in errorsByDemoName) {
    const amount = errorsByDemoName[demoName].length;
    const amountLength = amount.toString().length;
    totalErrors = totalErrors + amount;
    errorsByDemoName[demoName] = amount;
    const lineLength = amountLength + 3 + demoName.length;
    /* v8 ignore if*/
    if (lineLength > longestLine) {
      longestLine = lineLength;
    }
    /* v8 ignore if */
    if (amountLength > longestErrorAmount) {
      longestErrorAmount = amountLength;
    }
  }

  const totalsMessage = [
    totalErrors,
    'error' + (totalErrors !== 1 ? 's' : '') + ' across',
    totalFiles,
    'file' + (totalFiles !== 1 ? 's' : '')
  ].join(' ');
  /* v8 ignore if */
  if (totalsMessage.length > longestLine) {
    longestLine = totalsMessage.length;
  }
  const innerPad = longestLine - longestErrorAmount - 2;

  const output = [
    $c.gray('  ╔' + filler('═', longestLine) + '╗'),
    $c.gray('  ║ ') + $c.bold($c.yellowBright(header.padEnd(longestLine))) + $c.gray(' ║'),
    $c.gray('  ╠' + filler('═', longestErrorAmount) + '╤' + filler('═', innerPad - 1) + '╣')
  ];

  const sortedByMostErrors = Object.fromEntries(
    Object.entries(errorsByDemoName)
      .sort((A, B) => {
        const a = A[1];
        const b = B[1];
        /* v8 ignore else */
        if (a < b) {
          return 1
        } else if (a > b) {
          return -1
        }
        return 0;
      })
  );

  for (const demoName in sortedByMostErrors) {
    const amount = sortedByMostErrors[demoName];
    output.push($c.gray('  ║ ' + $c.redBright((amount + '').padStart(longestErrorAmount)) + ' │ ' + $c.cyanBright(demoName.padEnd(innerPad)) + '║'));
  }

  output.push($c.gray('  ╠' + filler('═', longestErrorAmount) + '╧' + filler('═', innerPad - 1) + '╣'));
  output.push($c.gray('  ║ ') + $c.yellowBright(totalsMessage.padEnd(longestLine)) + $c.gray(' ║'));
  output.push($c.gray('  ╚' + filler('═', longestLine) + '╝'));
  console.info(wrapForWindows(output.join('\n')));
};
