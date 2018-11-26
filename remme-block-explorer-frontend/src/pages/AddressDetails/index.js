import React, { Component } from "react";
import { connect } from "react-redux";

import { getPayloadView } from "../../functions";
import { DetailView } from "../../components";
import { addressFetch } from "../../modules/address";

class AddressDetail extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.getAddress(id);
    this.setState({
      loading: false
    });
  }

  getAddress(id) {
    const { address, addressFetch} = this.props;
    if (!address) {
      addressFetch({ address: id });
    }
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { id: prevId } } } = prevProps;
    const { match: { params: { id } } } = this.props;
    if (prevId !== id) {
      this.getAddress(id);
    }
  }

  render() {
    const { loading } = this.state;
    const { address } = this.props;
    const data ={};

    if (address) {
      if (!address.error) {
        data.payload = getPayloadView({type: address.addressParse.type, ...address.addressParse.data});
      } else {
        data["No Data"] = [{ value: address.error }]
      }
    }

    return (
      <DetailView
        title={`Address ${this.props.match.params.id}`}
        data={data}
        loading={loading}
      />
    )
  }
}

export default connect(({ address }, ownProps) => ({
  address: address.filter(item => item && item.address === ownProps.match.params.id)[0]
}), { addressFetch })(AddressDetail);