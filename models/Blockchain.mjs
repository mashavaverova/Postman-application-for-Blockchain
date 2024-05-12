import Block from './Block.mjs';
import { createHash } from '../utilites/crypto.mjs';
import writeToFile from '../utilites/fileHandler.mjs';

export default class Blockchain {
  constructor() {
    this.chain = [];
    this.createBlock(Date.now(), '0', '0', []);
  }

  createBlock(
    timestamp,
    previousBlockHash,
    currentBlockHash,
    data,
    difficulty
  ) {
    const block = new Block(
      timestamp,
      this.chain.length + 1,
      previousBlockHash,
      currentBlockHash,
      data,
      difficulty
    );
    this.chain.push(block);
        
    return block;

  }

  getLastBlock() {
    return this.chain.at(-1);
  }

  getBlock(blockIndex) {
    if (blockIndex >= 0 && blockIndex < this.chain.length) {
      return this.chain[blockIndex];
    }
  }

  hashBlock(timestamp, previousBlockHash, cureentBlockData, nonce, difficulty) {
    const stringToHash =
      timestamp.toString() +
      previousBlockHash +
      JSON.stringify(cureentBlockData) +
      nonce +
      difficulty;
    const hash = createHash(stringToHash);
    return hash;
  }

  proofOfWork(previousBlockHash, data) {
    const lastBlock = this.getLastBlock();
    let difficulty, hash, timestamp;
    let nonce = 0;

    do {
      nonce++;
      timestamp = Date.now();

      difficulty = this.difficulty(lastBlock, timestamp);
      hash = this.hashBlock(
        timestamp,
        previousBlockHash,
        data,
        nonce,
        difficulty
      );
    } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

    return { nonce, difficulty, timestamp };
  }

  difficulty(lastBlock, currentTimestamp) {
    const MINE_RATE = process.env.MINE_RATE;
    const { difficulty, timestamp } = lastBlock;

    return currentTimestamp - lastBlock.timestamp > MINE_RATE
      ? +difficulty + 1
      : +difficulty - 1;
  }
}
