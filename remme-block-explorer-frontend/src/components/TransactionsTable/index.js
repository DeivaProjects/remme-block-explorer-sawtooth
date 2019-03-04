import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import CreateTable from "../CreateTable";
import { getTransactionsView } from "../../functions";
import { transactionsFetch } from "../../modules/transactions";

class TransactionsTable extends Component {
  static columns = [{
    title: 'TXID',
    dataIndex: 'txid',
    key: 'txid',
    render: text => <Link to={`/transactions/${text}`}>{text.slice(0, 8)}...{text.slice(-8)}</Link>
  }, {
    title: 'Sender',
    dataIndex: 'sender',
    key: 'sender',
    render: text => `${text.slice(0, 8)}...${text.slice(-8)}`
  }, {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  }];

  componentDidMount() {
    this.props.transactionsFetch();
  }

  render() {
    const { onlyRecent, transactions } = this.props;
    let dataSource, total;
    if (transactions) {
      dataSource = getTransactionsView(transactions);
    }
    return (
      <CreateTable
        title={`${onlyRecent ? "Recent " : ""}Transactions`}
        dataSource={dataSource}
        columns={TransactionsTable.columns}
        pagination={!onlyRecent && {
          pageSize: 10
        }}
        link={onlyRecent && {
          to: "/transactions"
        }}
      />
    );
  }
}

export default connect(
  ({ transactions }, { onlyRecent }) => ({
    transactions: onlyRecent ? transactions.slice(0, 10) : transactions
  }),
  { transactionsFetch },
)(TransactionsTable);
