import Block from './Block.mjs';
import { describe, it, expect, beforeEach } from 'vitest';




describe('Block', () => {
  const timestamp = Date.now();
  const blockIndex = 1;
  const previousBlockHash = 'previousBlockHash';
  const currentBlockHash = 'currentBlockHash';
  const data = 'TESTDATA';
  const difficulty = 1;

  const block = new Block(
    timestamp,
    blockIndex,
    previousBlockHash,
    currentBlockHash,
    data,
    difficulty
  );

  describe('constructor', () => {
    it('should have a timestamp', () => {
      expect(block).toHaveProperty('timestamp');
    });

    it('should have a blockIndex', () => {
      expect(block).toHaveProperty('blockIndex');
    });

    it('should have a previousBlockHash', () => {
      expect(block).toHaveProperty('previousBlockHash');
    });

    it('should have a currentBlockHash', () => {
      expect(block).toHaveProperty('currentBlockHash');
    });

    it('should have a data', () => {
      expect(block).toHaveProperty('data');
    }); 

    it('should have a difficulty', () => {
      expect(block).toHaveProperty('difficulty');
    });
  });
});
 
