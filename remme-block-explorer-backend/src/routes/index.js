
import express from 'express';
import Remme from 'remme';
import { base64ToArrayBuffer } from "remme-utils";
import { config } from "dotenv";

config();
const remme = new Remme.Client({
  networkConfig: {
    nodeAddress: process.env.NODE_ADDRESS || "localhost"
  }
});

const excludeFamilyNames = [
  "sawtooth_settings",
  "sawtooth_validator_registry",
  "block_info"
];

function prepareTransaction(data) {
  if (data && data[0].batches) {
    return data.map(item => {
      item.batches = item.batches.reduce((prev, item) => {
        const filter = item.transactions.filter(item => !excludeFamilyNames.includes(item.header.family_name));
        if (filter.length) {
          item.transactions = filter;
          return [
            ...prev,
            item
          ];
        } else {
          return prev;
        }
      }, []);
      return item;
    })
  }
  return data.reduce((prev, item) => {
    if (excludeFamilyNames.includes(item.header.family_name)) {
      return prev;
    }
    item = remme.blockchainInfo.parseTransactionPayload(item);
    return [
      ...prev,
      item
    ];
  }, []);
}

const initGetRouter = (method) => {
  const router = express.Router();

  router.get('/', async (req, res) => {
    const { limit, head, start, address } = req.query;
    const response = await remme.blockchainInfo[`get${method}`]({ limit, head, start, address });
    if (method !== "BlockInfo") {
      response.data = prepareTransaction(response.data);
    }
    res.json(response);
  });

  return router;
};

const initBlockInfoRouter = () => {
  const router = express.Router();

  router.get('/', async (req, res) => {
    const { limit, head, start } = req.query;
    const response = await remme.blockchainInfo.getBlockInfo({ 
      limit: parseInt(limit),
      start: parseInt(start),
      head
    });
    res.json(response);
  });

  return router;
};

const initTransactionRouter = () => {
  const router = express.Router();

  router.get('/', async (req, res) => {
    const { limit, head, start } = req.query;
    const response = await remme.blockchainInfo.getTransactions({ limit, head, start });
    response.data = response.data.reduce((prev, item) => {
      if (excludeFamilyNames.includes(item.header.family_name)) {
        return prev;
      }

      const { payload, type } = remme.blockchainInfo.parseTransactionPayload(item);
      return [
        ...prev,
        {
          ...item,
          payload,
          type
        },
      ]
    }, []);
    res.json(response);
  });

  return router;
};

const transactions = initTransactionRouter();
const blocks = initGetRouter("Blocks");
const state = initGetRouter("State");
const blockInfo = initBlockInfoRouter();

transactions.get('/:id', async (req, res) => {
  const { id } = req.params;
  const response = await remme.blockchainInfo.getTransactionById(id);
  const { payload, type } = remme.blockchainInfo.parseTransactionPayload(response.data);
  response.data = { 
    ...response.data,
    payload,
    type
  }
  res.json(response);
});

blocks.get('/:id', async (req, res) => {
  const { id } = req.params;
  const response = await remme.blockchainInfo.getBlockById(id);
  response.data = prepareTransaction([ response.data ])[0];
  res.json(response);
});

state.get('/:address', async (req, res) => {
  const { address } = req.params;
  try {
    const response = await remme.blockchainInfo.getStateByAddress(address);
    response.addressParse = remme.blockchainInfo.parseStateData({ ...response, address });
    res.json(response);
  } catch(e) {
    res.json({ error: e.message });
  }
});

export {
  transactions,
  blocks,
  state,
  blockInfo,
}
