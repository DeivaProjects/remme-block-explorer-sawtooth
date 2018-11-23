import React, { Component } from "react";
import { connect } from "react-redux";

import { objToArray, getPayloadView } from "../../functions";
import { DetailView } from "../../components";
import { transactionsFetch } from "../../modules/transactions";

class TransactionDetails extends Component {
  state = {
    loading: true,
  };

  static blockToNotShow = [
    "inputs",
    "outputs",
    "dependencies",
  ];

  filter = ({ key }) => TransactionDetails.blockToNotShow.includes(key);

  componentDidMount() {
    let { transaction, transactionsFetch, match: { params: { id: hash } } } = this.props;
    if (!transaction) {
      transactionsFetch({ hash });
    }
    this.setState({
      loading: false
    });
  }

  render() {
    const { loading } = this.state;
    const { transaction } = this.props;
    const data = {};

    if (transaction) {
      data.Header =  objToArray(transaction.header, this.filter);
      data.Payload = getPayloadView({ type: transaction.type, ...transaction.payload });
    }

    return (
      <DetailView
        title={`TXID ${this.props.match.params.id}`}
        data={data}
        loading={loading}
      />
    )
  }
}

export default connect(({ transactions }, ownProps) => ({
  transaction: transactions.filter(item => item && item.header_signature === ownProps.match.params.id)[0],
}), { transactionsFetch })(TransactionDetails);