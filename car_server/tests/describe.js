/* istanbul ignore next */
/**
 *  @fileOverview car Write what's going on in the file here.
 *  @file         describe Created at 12/25/18 with WebStorm
 *  @author       Kamaal ABOOTHALIB | MacbookPro
 */
import chalk from 'chalk';
export default (message = '', callback) => {
	console.log(chalk.underline.bold.blue(message));
	callback();
};
