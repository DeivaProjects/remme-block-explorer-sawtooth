# REMME Block Explorer

### Overview

[REMME Block Explorer](https://blockexplorer.remme.io/) is an open source web tool that allows to view information about blocks and transactions on the REMME blockchain. Home page of the Block Explorer contains a list of the top 10 blocks and transactions. Pages [View Blocks](https://blockexplorer.remme.io/blocks/) and [View Txns](https://blockexplorer.remme.io/transactions/) contain lists with all items.

### Blocks

Blocks are sorted by block_num and hold batches of transactions. This batch includes: the block height, the block hash, and several key parameters, described below:


| Option            | Explanation                                                         |
|-------------------|---------------------------------------------------------------------|
| ID                | Id of current block                                                 |
| block_num         | The height of the blockchain in which this block resides.           |
| previous_block_id | Hash of the previous block                                          |
| signer_public_key | Signer's public key                                                 |
| state_root_hash   | Points to version of the tree                                       |
| timestamp         | The time this block was created and was included in the blockchain. |
| Transactions      | All transactions included in this block.                            |

### Transactions

A transaction is a transfer of REMME value that is broadcast to the network and collected into blocks. Transactions are not encrypted, so it is possible to view every transaction. The payload data varies depending on the type of transaction and depends on the protobuf. Currently REMChain includes 3 transaction families (pub_key, account, AtomicSwap). [The Public Key transaction family](https://docs.remme.io/remme-core/docs/family-pub-key.html?highlight=pub_key/) provides storing public keys. [The Account transaction family](https://docs.remme.io/remme-core/docs/family-account.html#account-transaction-family/) executes logic for managing agents on the REMME blockchain. [The Atomic Swap transaction family](https://docs.remme.io/remme-core/docs/family-atomic-swap.html#atomic-swap-transaction-family/) provides means for universal exchange between two agents in separate chains.
Key parameters of transactions:


| Option             | Explanation                                                                                                                      |
|--------------------|----------------------------------------------------------------------------------------------------------------------------------|
| TXID               | Id of current transaction                                                                                                        |
| Header                                                                                                                                                |
| batcher_public_key | Public key for the client who added this transaction to a batch                                                                  |
| family_name        | The family name correlates to the transaction<br>processor's family name that this transaction<br>can be processed on. Families: |
|                    |                                                                                                                                  |
|                    |                                                                                                                                  |
|                    |                                                                                                                                  |
