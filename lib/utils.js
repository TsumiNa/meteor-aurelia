/* global msg */
/* global Npm */
const chalk = Npm.require('chalk');
msg = [];
msg[0] = function(str) {
    console.info(chalk.black.bgYellow('Warning:') + chalk.yellow(str));
};

msg[1] = function(str) {
    console.info(chalk.black.bgMagenta('Error:') + chalk.magenta(str));
};

msg[2] = function(str) {
    console.info(chalk.black.bgGreen('Message:') + chalk.green(str));
};