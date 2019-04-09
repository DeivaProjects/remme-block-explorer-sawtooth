import React, { Fragment, Component } from 'react';
import { Col, Row } from 'antd';
import ReactPlaceholder from 'react-placeholder';
import { connect } from "react-redux";

import {
  TokenInfo,
  TokenInfoPlaceHolder,
  BlockInfo,
  BlockInfoPlaceHolder,
  BlocksTable,
  TransactionsTable,
  CardWrap
} from '../../components';

import './style.css';
import api from "../../config/api";

class Home extends Component {
  state = {
    blocks: "",
    transactions: "",
    info: "",
    ready: false
  };

  async componentDidMount() {
    const infoPromise = api.getCoinMarketInfo();
    const info = await infoPromise;
    this.setState({
      info,
      ready: true,
    });
  }

  render() {
    const { blocks, transactions, info, ready } = this.state;
    const { blockNum, lastBlockTime } = this.props;
    return (
      <Fragment>
        <CardWrap title="Remme Network Stats">
          <Row gutter={16}>
            <Col span={8}>
              <ReactPlaceholder ready={ready} customPlaceholder={<TokenInfoPlaceHolder />}>
                <TokenInfo info={info} />
              </ReactPlaceholder>
            </Col>
            <Col span={16}>
              <ReactPlaceholder ready={ready} customPlaceholder={<BlockInfoPlaceHolder />}>
                <BlockInfo blockNum={blockNum} lastBlockTime={lastBlockTime}/>
              </ReactPlaceholder>
            </Col>
          </Row>
        </CardWrap>

        <Row gutter={20}>
          <Col span={12}>
            <BlocksTable onlyRecent={true} data={blocks} />
          </Col>

          <Col span={12}>
            <TransactionsTable onlyRecent={true} data={transactions} />
          </Col>
        </Row>

      </Fragment>
    )
  }
}

export default connect(({ blocks }) => ({
  blockNum: blocks.length && blocks[0].header.block_num,
  lastBlockTime: blocks.length && blocks[0].header.timestamp
}))(Home);
