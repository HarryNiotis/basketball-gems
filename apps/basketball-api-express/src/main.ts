/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import { sequelize } from './database';

const app = express();

app.get('/', async (req, res) => {
  res.send({ message: 'Welcome to basketball-api-express!' });
});

const port = process.env.PORT || 3333;
const server = app.listen(port, async () => {
   try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    console.log(`Listening at http://localhost:${port}/`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
server.on('error', console.error);
