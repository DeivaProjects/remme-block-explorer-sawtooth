import React, { Component, Fragment } from "react";
import { List } from "antd";
import { Link } from "react-router-dom";

class CreateList extends Component {
  render() {
    const { title, data, link, content } = this.props;
    return (
      <Fragment>
        <List
          dataSource={data}
          size="small"
          itemLayout="horizontal"
          header={title && <div style={{ textAlign: 'center' }}>{title}</div>}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={item.title}
                description={item.link ? <Link to={item.link}>{item.value}</Link> : item.value}
              />
              {content}
            </List.Item>
          )}
        />
        {link && <Link to={link.to} className="ant-btn" style={{float: 'right', marginTop: 20}}>{link.name || "View All"}</Link>}
      </Fragment>
    )
  }
}

export default CreateList;