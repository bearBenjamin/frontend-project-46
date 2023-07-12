#!/usr/bin/env node

import { Command } from 'commander';
import getDiff from '../index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information')
  .arguments('<filepath1> <filepath2> [formatName]')
  .option('-f, --format <type>', 'add the specified type of format', 'stylish')
  .action((filepath1, filepath2, formatName) => {
    if (formatName === undefined) {
      console.log(getDiff(filepath1, filepath2, program.opts().format));
    }
    if (formatName === 'stylish') {
      console.log(getDiff(filepath1, filepath2, 'stylish'));
    }
    if (formatName === 'plain') {
      console.log(getDiff(filepath1, filepath2, 'plain'));
    }
    if (formatName === 'json') {
      console.log(getDiff(filepath1, filepath2, 'json'));
    }
  });

program.parse();
