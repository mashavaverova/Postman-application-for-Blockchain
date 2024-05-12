import express from 'express';
import {
  getBlockchain,
  createBlock,
  getBlock
} from '../controllers/bc-kontroller.mjs';

const router = express.Router();

//define urls and methods to send to correct controller
router.route('/').get(getBlockchain);
router.route('/mine').post(createBlock);
router.route ('/:blockIndex').get(getBlock);

export default router;
