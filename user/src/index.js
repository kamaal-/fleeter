/**
 *  @fileOverview car entry point to app.
 *  @file         index Created at 12/24/18 with WebStorm
 *  @author       Kamaal ABOOTHALIB | MacbookPro
 */
import App from './App';
import { connect } from './db';
import dotenv from 'dotenv';
import startServer from './server';
import { APP_STATES } from './config/constants';

dotenv.config();
const app = new App();

app.once(APP_STATES.REPO_CREATED, repo => startServer(repo));

connect(app)

// start the app
app.init()
