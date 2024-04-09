import 'dotenv/config';
import { InstallGlobalCommands } from './utils.js';

const GET_PROBLEM = {
  name: 'problem',
  description: 'Get a random Problem',
  type: 1,
};

const SUBMIT_PROBLEM = {
  name: 'submit',
  description: 'Submit a Problem to the database',
  options: [
    {
      type: 3,
      name: 'problem',
      description: 'your Problem suggestion',
      required: true,
    }
  ],
  type: 1,
};

const DELETE_PROBLEM = {
  name: 'delete',
  description: 'delete a Problem in the database',
  options: [
    {
      type: 4,
      name: 'problem ID',
      description: 'the ID for the Problem you want to remove',
      required: true,
    }
  ],
  type: 1,
}

const ALL_COMMANDS = [GET_PROBLEM, SUBMIT_PROBLEM, DELETE_PROBLEM];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);