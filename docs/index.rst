REMME Block Explorer
====================

Overview
-----------------

`REMME Block Explorer <https://explorer-testnet.remme.io>`_ is an open source web tool that allows to view information about blocks and transactions on the REMME blockchain. Home page of the Block Explorer contains a list of the top 10 blocks and transactions. Pages `View Blocks <https://explorer-testnet.remme.io/blocks>`_ and `View Txns <https://explorer-testnet.remme.io/transactions>`_ contain lists with all items.

Blocks
-----------------
Blocks are sorted by block_num and hold batches of transactions. This batch includes: the block height, the block hash, and several key parameters, described below:

+-----------------------+-----------------------------------------------------+
| Option                | Explanation                                         |
+=======================+=====================================================+
| ID                    | Id of current block                                 |
+-----------------------+-----------------------------------------------------+
| block_num             | The height of the blockchain                        |
|                       | in which this block resides.                        |
+-----------------------+-----------------------------------------------------+
| previous_block_id     | Hash of the previous block                          |
+-----------------------+-----------------------------------------------------+
| signer_public_key     | Signer's public key                                 |
+-----------------------+-----------------------------------------------------+
| state_root_hash       | Id of current block                                 |
+-----------------------+-----------------------------------------------------+
| timestamp             | The time this block was created                     |
|                       | and was included in the blockchain.                 |
+-----------------------+-----------------------------------------------------+
| Transactions          | All transactions included in this block.            |
+-----------------------+-----------------------------------------------------+


Transactions
-----------------
A transaction is a transfer of REMME value that is broadcast to the network and collected into blocks. Transactions are not encrypted, so it is possible to view every transaction. The payload data varies depending on the type of transaction and depends on the protobuf. Currently REMChain includes 3 transaction families (pub_key, account, AtomicSwap). `The Public Key transaction family <https://docs.remme.io/remme-core/docs/family-pub-key.html?highlight=pub_key>`_ provides storing public keys. `The Account transaction family <https://docs.remme.io/remme-core/docs/family-account.html#account-transaction-family>`_ executes logic for managing agents on the REMME blockchain. `The Atomic Swap transaction family <https://docs.remme.io/remme-core/docs/family-atomic-swap.html#atomic-swap-transaction-family>`_ provides means for universal exchange between two agents in separate chains.
Key parameters of transactions:

+-----------------------+-------------------------------------------------------------------------------+
| Option                | Explanation                                                                   |
+=======================+===============================================================================+
| TXID                  | Id of current transaction                                                     |
+-----------------------+-------------------------------------------------------------------------------+
| Header                                                                                                |
+-----------------------+-------------------------------------------------------------------------------+
| batcher_public_key    | Public key for the client who added                                           |
|                       | this transaction to a batch                                                   |
+-----------------------+-------------------------------------------------------------------------------+
| family_name           | The family name correlates to the transaction                                 |
|                       | processor's family name that this transaction                                 |
|                       | can be processed on. Families:                                                |
|                       | `account <https://docs.remme.io/remme-core/docs/family-account.html>`_,       |
|                       | `AtomicSwap <https://docs.remme.io/remme-core/docs/family-atomic-swap.html>`_,|
|                       | `pub_key <https://docs.remme.io/remme-core/docs/family-pub-key.html>`_.       |
+-----------------------+-------------------------------------------------------------------------------+
| family_version        | The family version correlates to the                                          |
|                       | transaction processor's family version that                                   |
|                       | this transaction can be processed on                                          |
+-----------------------+-------------------------------------------------------------------------------+
| nonce                 | A random string that provides uniqueness for                                  |
|                       | transactions with otherwise identical fields.                                 |
+-----------------------+-------------------------------------------------------------------------------+
| payload_sha512        | The sha512 hash of the encoded payload                                        |
+-----------------------+-------------------------------------------------------------------------------+
| signer_public_key     | Public key for the client that signed the Transaction Header                  |
+-----------------------+-------------------------------------------------------------------------------+
| Payload                                                                                               |
+-----------------------+-------------------------------------------------------------------------------+
| type                  | Action type (ex: “store public key”, “transfer token”)                        |
+-----------------------+-------------------------------------------------------------------------------+
| entityType            | this is the type of certificates, which is defined into REMChain.             |
|                       | At this time we have only two types of certificate PERSONAL and SERVER        |
+-----------------------+-------------------------------------------------------------------------------+
| publicKey             | Public Key that was stored to blockchain                                      |
+-----------------------+-------------------------------------------------------------------------------+
| publicKeyType         | Type of Public Key that was stored (Ex. “RSA”)                                |
+-----------------------+-------------------------------------------------------------------------------+
| entityHash            | Hash of certificate that was stored                                           |
+-----------------------+-------------------------------------------------------------------------------+
| entityHashSignature   | Signature of Hash of certificate that was stored                              |
+-----------------------+-------------------------------------------------------------------------------+
| validFrom             | These field indicates the validity period - from                              |
+-----------------------+-------------------------------------------------------------------------------+
| validTo               | These field indicates the validity period - to.                               |
+-----------------------+-------------------------------------------------------------------------------+
| address               | Address of public key or REMME account address.                               |
+-----------------------+-------------------------------------------------------------------------------+

Setup
====================

Requirements
-----------------
* docker >= 17.05.0
* docker-compose >= 1.18.0

Installation
-----------------

Clone REMME blockexplorer repository into a directory on your server. ::

  git clone https://github.com/Remmeauth/remme-block-explorer.git

  Open the repository and create a certificates folder. ::

    cd remme-block-explorer
    mkdir certificates

You have to upload the certificate and private key to this folder (certificate.crt, private.key). These files are needed to configure ssl.

Change ngnix.conf using the config file, replace directories path and server domain name.

If you are going to connect blockexplorer to your own node you should cnange "NODE_ADDRESS" in .env file:

  | # NODE ADDRESS (IF EMPTY WIL BE USE LOCALHOST)
  | NODE_ADDRESS="YOUR_NODE_ADDRESS"
  |
  | # SERVER PORT (IF EMPTY WILL BE RUN ON 3000)
  | PORT=

Lastly, run docker-compose up and Compose will start and run app. ::

  docker-compose up
