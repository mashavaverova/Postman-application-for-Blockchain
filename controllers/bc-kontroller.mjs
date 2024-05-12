import { blockchain } from '../startup.mjs';
import ResponseModel from '../utilites/ResponseModel.mjs';
import ErrorResponseModel from '../utilites/ErrorResponseModel.mjs';
import writeToFile from '../utilites/fileHandler.mjs';
import { v4 as uuidv4 } from 'uuid';

// endpoint .../api/v1/blockchain
const getBlockchain = (req, res, next) => {
  //throw error;
  res
    .status(200)
    .json(new ResponseModel({ statusCode: 200, data: blockchain }));
};

// endpoint .../api/v1/blockchain/:blockIndex
const getBlock = (req, res, next) => {
  const blockIndex = parseInt(req.params.blockIndex);
  const adjustedIndex = blockIndex - 1;
  if (adjustedIndex >= 0 && adjustedIndex < blockchain.chain.length) {
    const block = blockchain.chain[adjustedIndex];
    res.status(200).json(new ResponseModel({ statusCode: 200, data: block }));
  } else {
    res
      .status(404)
      .json(new ErrorResponseModel({ statusCode: 404, error: 'Block not found' }));
  }
};


// endpoint .../api/v1/blockchain/mine
const createBlock = (req, res, next) => {
  try {
    const lastBlock = blockchain.getLastBlock();
    const data = req.body;
    const id = uuidv4().replaceAll('-', '');
    req.body.id = id;

    const { nonce, difficulty, timestamp } = blockchain.proofOfWork(
      lastBlock.currentBlockHash,
      data
    );

    const currentBlockHash = blockchain.hashBlock(
      timestamp,
      lastBlock.currentBlockHash,
      data,
      nonce,
      difficulty
    );


    const block = blockchain.createBlock(
      timestamp,
      lastBlock.currentBlockHash,
      currentBlockHash,
      data,
      difficulty
    );

    res.status(201).json(new ResponseModel({ statusCode: 201, data: block }));
    //console.log(block);
   
      // Write to file books.json
    const blockData = block.data; 
    const folderName = 'data'; 
    let fileNameBooks = 'books.json';
    writeToFile(folderName, fileNameBooks, blockData, (error) => {
      if (error) {
        console.error('Error writing to file:', error);
      } else {
        console.log('Data written to file successfully!');
      }
    });

    let fileNameBlocks = 'blocks.json'; 
    writeToFile(folderName, fileNameBlocks, block, (error) => {
      if (error) {
        console.error('Error writing to file:', error);
      } else {
        console.log('Data written to file successfully!');
      }
    }
  );
    

  } catch (error) {
    next(new ErrorResponseModel({ statusCode: 500, error: error.message }));
  }
};



export { getBlockchain, createBlock, getBlock };
