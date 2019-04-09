import React, { Fragment } from "react";
import { Card, Table } from 'antd';
import { Link } from "react-router-dom";

//import claim from '../images/remme-claim-tokens-button.png';


const dataSource1 = [{
  key: '1',
  option: 'ID',
  explanation: 'Id of current block',
}, {
  key: '2',
  option: 'block_num',
  explanation: 'The height of the blockchain in which this block resides.',
}, {
  key: '3',
  option: 'previous_block_id',
  explanation: 'Hash of the previous block.',
}, {
  key: '4',
  option: 'signer_public_key',
  explanation: 'Signer’s public key.',
}, {
  key: '5',
  option: 'state_root_hash',
  explanation: 'Id of current block.',
}, {
  key: '6',
  option: 'timestamp',
  explanation: 'The time this block was created and was included in the blockchain.',
}, {
  key: '7',
  option: 'Transactions',
  explanation: 'All transactions included in this block.',
}];

const dataSource2 = [{
  key: '1',
  option: 'TXID',
  explanation: 'Id of current transaction',
}, {
  key: '2',
  option: 'Header',
  explanation: '',
}, {
  key: '3',
  option: 'batcher_public_key',
  explanation: 'Public key for the client who added this transaction to a batch',
}, {
  key: '4',
  option: 'family_name',
  explanation: 'The family name correlates to the transaction processor’s family name that this transaction can be processed on. Families: account, AtomicSwap, pub_key.',
}, {
  key: '5',
  option: 'family_version',
  explanation: 'The family version correlates to the transaction processor’s family version that this transaction can be processed on.',
}, {
  key: '6',
  option: 'nonce',
  explanation: 'A random string that provides uniqueness for transactions with otherwise identical fields.',
}, {
  key: '7',
  option: 'payload_sha512',
  explanation: 'The sha512 hash of the encoded payload.',
}, {
  key: '8',
  option: 'signer_public_key',
  explanation: 'Public key for the client that signed the Transaction Header.',
}, {
  key: '9',
  option: 'Payload',
  explanation: '',
}, {
  key: '10',
  option: 'type',
  explanation: 'Action type (ex: “store public key”, “transfer token”)',
}, {
  key: '11',
  option: 'publicKey',
  explanation: 'Public Key that was stored to blockchain.',
}, {
  key: '12',
  option: 'entityType',
  explanation: 'This is the type of certificates, which is defined into REMChain. At this time we have only two types of certificate PERSONAL and SERVER',
}, {
  key: '13',
  option: 'publicKeyType',
  explanation: 'Type of Public Key that was stored (Ex. “RSA”)',
}, {
  key: '14',
  option: 'entityHash',
  explanation: 'Hash of certificate that was stored',
}, {
  key: '15',
  option: 'entityHashSignature',
  explanation: 'Signature of Hash of certificate that was stored',
}, {
  key: '16',
  option: 'validFrom',
  explanation: 'These field indicates the validity period - from',
}, {
  key: '17',
  option: 'validTo',
  explanation: 'These field indicates the validity period - to.',
}, {
  key: '18',
  option: 'address',
  explanation: 'Address of public key or Remme account address.',
}];

const columns = [{
  title: 'Option',
  dataIndex: 'option',
  key: 'option',
  width: 200
}, {
  title: 'Explanation',
  dataIndex: 'explanation',
  key: 'explanation',
}];


const NotFound = props => (
  <Fragment>
    <div className="section">
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 20px"  }}>
        <h1 className="tac">Welcome!</h1>
        <p>REMME Block Explorer allows to view information about blocks and transactions on the Remme blockchain.<br/> <Link to="/">Home page</Link> contains a list of the top 10 blocks and transactions. Pages <Link to="/blocks">View Blocks</Link> and <Link to="/transactions">View Txns</Link> contain lists with all items.</p>
        <br/>
        <h1>Blocks</h1>
        <p>Blocks are sorted by block_num and hold batches of transactions. This batch includes: the block height, the block hash, and several key parameters, described below:</p>
        <Table dataSource={dataSource1} columns={columns} pagination={false} />
        <br/>
        <h1>Transactions</h1>
        <p>A transaction is a transfer of Remme value that is broadcast to the network and collected into blocks. Transactions are not encrypted, so it is possible to view every transaction. The payload data varies depending on the type of transaction and depends on the protobuf. Currently REMChain includes 3 transaction families (pub_key, account, AtomicSwap). <a target="_blank" href="https://docs.remme.io/remme-core/docs/family-pub-key.html?highlight=pub_key" rel="nofollow">The Public Key transaction family</a> provides storing public keys. <a href="https://docs.remme.io/remme-core/docs/family-account.html#account-transaction-family" target="_blank" rel="nofollow">The Account transaction family</a> executes logic for managing agents on the REMME blockchain. <a target="_blank" href="https://docs.remme.io/remme-core/docs/family-atomic-swap.html#atomic-swap-transaction-family" rel="nofollow">The Atomic Swap transaction family</a> provides means for universal exchange between two agents in separate chains.
Key parameters of transactions:</p>
        <Table dataSource={dataSource2} columns={columns} pagination={false} />

      </div>
    </div>
  </Fragment>
);

export default NotFound;
