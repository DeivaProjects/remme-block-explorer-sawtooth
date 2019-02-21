import React, { Component, Fragment } from "react";
import { Divider, Spin } from "antd";

import { CardWrap, CreateList } from "../../components";

class DetailView extends Component {

  render() {
    const { title, data, loading } = this.props;
    return (
      <CardWrap title={title} size={4}>
        {
          loading ? (
            <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
              {loading && <Spin />}
            </div>
          ) : (
            <Fragment>
              {
                Object.getOwnPropertyNames(data).map(item => (
                  <CreateList
                    key={item}
                    title={item}
                    data={data[item]}
                  />
                ))
              }
            </Fragment>
          )
        }
      </CardWrap>
    );
  }
}

export default DetailView;
