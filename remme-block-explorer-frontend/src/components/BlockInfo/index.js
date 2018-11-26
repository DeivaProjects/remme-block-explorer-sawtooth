import React, { Component, Fragment } from 'react'
import { Card } from 'antd';
import { connect } from "react-redux";


class BlockInfo extends Component {
  state = {
    data: [
      {
        key: 'blockNum',
        title: 'BLOCK #',
        value: this.props.blockNum
      },{
        key: 'lastBlockTime',
        title: 'LAST BLOCK',
        value: this.props.lastBlockTime
      // },{
      //   key: 'block time',
      //   title: 'BLOCK TIME',
      //   value: '5.0000S'
      // },{
      //   key: 'transactions',
      //   title: 'TRANSACTIONS:',
      //   value: '9879'
      }
    ]
  };

  static gridStyle = {
    width: '25%',
    textAlign: 'center',
  };

  static getDerivedStateFromProps(props, state) {
    state.data = state.data.map(item => {
      if (props[item.key]) {
        item.value = props[item.key]
      }
      return item;
    });
    return state;
  }

  render() {
    const { data } = this.state;
    return (
      <Fragment>
        { data.map( item => (
          <Card.Grid key={item.key} style={BlockInfo.gridStyle}>{item.title}<br/>{item.value}</Card.Grid>
        ))}
      </Fragment>
    )
  }
}

export default BlockInfo;
