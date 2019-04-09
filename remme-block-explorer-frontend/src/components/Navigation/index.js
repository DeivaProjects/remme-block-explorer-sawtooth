import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { Menu, Icon, Dropdown, Button } from 'antd';

import { SmartLink } from "../../components";


const NavigationItems = [
  {
    title: 'Home',
    link: '/',
    icon: 'home',
    type: 'simple',
    key: 1,
  },{
    title: 'Blockchain',
    icon: 'bars',
    type: 'list',
    key: 2,
    items: [{
        title: 'View Blocks',
        link: "/blocks",
        key: 1
      },{
        title: 'View Txns',
        link: "/transactions",
        key: 2
    }]
  },{
    title: 'About Remme',
    icon: 'team',
    type: 'list',
    key: 3,
    items: [{
        title: 'PKI (d) Protocol ',
        link: "https://remme.io/protocol-pkid",
        key: 1
      },{
        title: 'Community',
        link: "https://remme.io/community",
        key: 2
      }]
    },{
      title: 'Resources',
      icon: 'database',
      type: 'list',
      key: 4,
      items: [{
          title: 'Blog',
          link: "https://remme.io/blog",
          key: 1
        },{
          title: 'Knowledge Base',
          link: "https://support.remme.io/",
          key: 2
        },{
          title: 'Documentation',
          link: "https://docs.remme.io/",
          key: 3
        }]
      },{
        title: 'How to use',
        link: '/how-to-use',
        icon: 'question-circle',
        type: 'simple',
        style: 'default',
        key: 9,
      },{
        title: 'Join Tech Community',
        link: 'https://gitter.im/REMME-Tech',
        type: 'button',
        style: 'default',
        key: 6,
      },{
        title: 'Join Testnet',
        type: 'button',
        style: 'primary',
        key: 5,
        items: [{
            title: 'How To Use',
            link: "https://docs.remme.io/md/remme-block-explorer",
            key: 1
          },{
            title: 'Share Your Feedback',
            link: "/feedback",
            key: 2
          }]
      }
];

class Navigation extends Component {
  render() {
    const { location } = this.props;
    return (
      <div style={{float: "right"}}>
        { NavigationItems.map( item =>
          !item.items ?
            item.type === 'button'
              ? <SmartLink
                  key={item.key}
                  link={item.link} >
                  <Button type={item.style} style={{ marginLeft: 8 }}>
                    {item.title}
                  </Button>
                </SmartLink>
              : <Menu key={item.key} theme="dark" mode="horizontal" selectedKeys={[location.pathname]}>
                  <Menu.Item key={item.link}>
                    <SmartLink
                      link={item.link} >
                        <Icon type={item.icon} />
                        <span>{item.title}</span>
                    </SmartLink>
                  </Menu.Item>
                </Menu>
          : <Dropdown
              key={item.key}
              overlay={
                <Menu>
                  {item.items.map( subitem =>
                    <Menu.Item key={subitem.key}>
                      <SmartLink
                        link={subitem.link} >
                          {subitem.title}
                      </SmartLink>
                    </Menu.Item>
                  )}
                </Menu>
              }>
               { item.type === 'button'
                 ? <Button style={{ marginLeft: 8 }} type={item.style}>
                     {item.title}
                   </Button>
                 : <a className="ant-nav-dropdown">
                     <Icon type={item.icon} /> {item.title} <Icon type="down" />
                   </a>
               }
            </Dropdown>
        )}
     </div>
    )
  }
}

export default withRouter(Navigation);
