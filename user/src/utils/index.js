/**
 *  @fileOverview user Write what's going on in the file here.
 *  @file         index Created at 1/13/19 with WebStorm
 *  @author       Kamaal ABOOTHALIB | MacbookPro
 */
import chalk from 'chalk'

const log = console.log

export const logger = {
	info: str => log(chalk.bgHex('#7FDBFF').rgb(90,90,90).bold(` ${str} \n`)),
	success: str => log(chalk.bgHex('#2ECC40').rgb(90,90,90).bold(` ${str} \n`)),
	warning: str => log(chalk.bgHex('#01FF70').rgb(90,90,90).bold(` ${str} \n`)),
	error: str => log(chalk.bgHex('#FF4136').rgb(60,60,60).bold(` ${str} \n`)),
}
