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
    title: 'About REMME',
    icon: 'team',
    type: 'list',
    key: 3,
    items: [{
        title: 'Platform Overview',
        link: "https://remme.webflow.io/platform-overview",
        key: 1
      },{
        title: 'REMChain',
        link: "https://remme.io/remchain",
        key: 2
      },{
        title: 'Community',
        link: "https://remme.io/community",
        key: 3
      }]
    },{
      title: 'Resources',
      icon: 'database',
      type: 'list',
      key: 4,
      items: [{
          title: 'Blog',
          link: "https://medium.com/remme",
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
        link: 'https://remme.io/community#join-tech-community',
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
            link: "https://docs.remme.io/remme-block-explorer/docs/",
            key: 1
          },{
            title: 'Claim Tokens',
            link: "/claim",
            key: 2
          },{
            title: 'Share Your Feedback',
            link: "/feedback",
            key: 3
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
