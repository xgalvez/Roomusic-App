#!/usr/bin/env node
"use strict";

// Check if we are in an electron environment
if (process.versions["electron"]) {
  // off to a separate electron boot environment
  return require("./build/electron");
}

const program = require('commander');
program
  .version(require('./package.json').version)
  .option('-j, --json <json>', 'Specify JSON Boot File', require('path').join(__dirname, 'save/conf/default.json'))
  .parse(process.argv);  

console.clear();

console.log(` 
        
                           WELCOME TO  
                                                   _ 
                                                  |_|  
   ______  ______  ______  _________  _    _  ___  _  _____
  |  __  \\|  __  ||  __  ||  _   _  || |  | |/ __|| ||  ___|
  | |__| /| |  | || |  | || | | | | || |  | |\\__ \\| || |
  | |  | || |__| || |__| || | | | | || |__| | __) | || |___
  |_|  |_||______||______||_| |_| |_||______|/___/|_||_____|
   
                --------------------------------   
               | By Biel Burrieza & Xevi Gálvez |    
                --------------------------------
 
`);

console.log(`v${program.version()}`);
console.log();

// Boot the server
require("./src/server").serveIt(program.json);






