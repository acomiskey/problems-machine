import 'dotenv/config';
import express from 'express';
import {
  InteractionType,
  InteractionResponseType,
  InteractionResponseFlags,
  MessageComponentTypes,
  ButtonStyleTypes,
} from 'discord-interactions';
import { VerifyDiscordRequest } from './utils.js';
import { startup, getProblem, addProblem, removeProblem } from './database.js';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));
console.log(startup());

app.post('/interactions', async function (req, res) {
  const { type, id, data } = req.body;

  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;

    let commandAnswer = "";
    switch(name) {
      case "problem":
        commandAnswer = getProblem();
        break;
      case "submit":
        commandAnswer = addProblem("user here", "problem here");
        break;
      case "delete":
        commandAnswer = removeProblem("id here");
        break;
      default: 
        commandAnswer = "Error: hit the default!";
    }
    return res.send ({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: commandAnswer,
      },
    });
  }
});

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
