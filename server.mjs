import express from 'express';
import dotenv from 'dotenv';

import blockchainRouter from './routes/bc-routes.mjs'; // <--- routes bc line 28

import logger from './middleware/logger.mjs'; // <--- own middleware to handle logs into a file line 25

import errorHandler from './middleware/errorHandler.mjs'; // <--- middleware to handle errors
import ErrorResponse from './utilites/ErrorResponseModel.mjs'; // <--- model for error responses

//fix for __dirname in e6 (lines 12, 13, 18, 19, 20)
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config({ path: './config/config.env' }); // <--- load env variables
const app = express();

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

global.__appdir = dirname;

app.use(express.json()); // <--- body parser

if (process.env.NODE_ENV === 'development') {
  app.use(logger); // <--- own middleware to handle logs into a file
}

app.use('/api/v1/blockchain', blockchainRouter); // <--- routes

// --- central error handler ---
app.all('*', (req, res, next) => {
  next(new ErrorResponse(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(errorHandler);

// --- start and listen server ---
const PORT = process.env.PORT || 5010;
app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});
