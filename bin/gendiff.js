#!/usr/bin/env node

import { Command } from 'commander';
import getDiff from '../index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information')
  .arguments('<filepath1> <filepath2> <format>')
  .option('-f, --format <stylish>', 'add the specified type of format', 'stylish')
  .action((filepath1, filepath2, format) => {
    console.log(getDiff(filepath1, filepath2, format));
  });

program.parse();
