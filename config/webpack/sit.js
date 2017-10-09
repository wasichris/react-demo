const chalk = require('chalk')

function showEnvironment () {
  var str = `
  ###########################
    _______   ___   _______ 
   |       | |   | |       |
   |  _____| |   | |_     _|
   | |_____  |   |   |   |  
   |_____  | |   |   |   |  
    _____| | |   |   |   |  
   |_______| |___|   |___|  
                              
  ###########################
  `
  console.log(chalk.cyanBright.bold(str))
}
