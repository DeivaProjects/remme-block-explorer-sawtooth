import "babel-polyfill";
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import Remme from 'remme';
import cors from "cors";
import { config } from "dotenv";

import {
  transactions,
  blocks,
  state,
  blockInfo,
} from "./routes";

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};

config();
const app = express();
const port = process.env.PORT || 3005;
app.use(express.static(path.join(__dirname, '../build')));
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use("/api/transactions", transactions);
app.use("/api/blocks", blocks);
app.use("/api/state", state);
app.use("/api/block-info", blockInfo);

app.get('/api/generate-account', (req, res) => {
  const keys = Remme.Client.generateAccount();
  const data = {
    publicKey: keys.publicKeyHex,
    privateKey: keys.privateKeyHex
  }
  res.json(data);
});

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../build/index.html'));
// });

app.listen(port, () => console.log(`Running on localhost:${port}`));
