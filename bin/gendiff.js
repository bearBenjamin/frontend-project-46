#!/usr/bin/env node

import { Command } from 'commander';
import getDiff from '../index.js';

const genDiff = new Command();

genDiff
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information')
  .arguments('<filepath1> <filepath2> [format]')
  .option('-f, --format <type>', 'add the specified type of format stylish, plain, json', 'stylish')
  .action((filepath1, filepath2, options) => {
    console.log(getDiff(filepath1, filepath2, options));
  });

genDiff.parse();
