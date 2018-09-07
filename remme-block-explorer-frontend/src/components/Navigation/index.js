import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { Menu, Icon, Dropdown, Button } from 'antd';

const NavigationItems = [{
    title: 'Home',
    link: '/',
    icon: 'home'
  },
  {
      title: 'Claim Tokens',
      link: '/claim',
      icon: 'credit-card'
    }
];

const about_menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="https://remme.io/about-us">About Us</a>
    </Menu.Item>
  </Menu>
);

const testnet_menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="https://remme.io">Testnet Home</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="https://docs.remme.io/">Documentation</a>
    </Menu.Item>
  </Menu>
);

const resources_menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="https://medium.com/remme">Blog</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="https://support.remme.io/">Knowledge Base</a>
    </Menu.Item>
  </Menu>
);

const blockchain_menu = (
  <Menu>
    <Menu.Item key="0">
      <Link to="/blocks">View Blocks</Link>
    </Menu.Item>
    <Menu.Item key="1">
      <Link to="/transactions">View Txns</Link>
    </Menu.Item>
  </Menu>
);

class Navigation extends Component {
  render() {
    const { location } = this.props;
    return (
      <div style={{float: "right"}}>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["/"]} selectedKeys={[location.pathname]}>
          { NavigationItems.map( item =>
              <Menu.Item key={item.link}>
                <Link to={item.link}>
                  <Icon type={item.icon} />
                  <span>{item.title}</span>
                </Link>
              </Menu.Item>
          )}
        </Menu>

        <Dropdown overlay={blockchain_menu} trigger={['click']}>
         <a className="ant-nav-dropdown" href="#">
           <Icon type="bars" /> Blockchain <Icon type="down" />
         </a>
        </Dropdown>

        <Dropdown overlay={about_menu} trigger={['click']}>
         <a className="ant-nav-dropdown" href="#">
           <Icon type="team" /> About REMME <Icon type="down" />
         </a>
        </Dropdown>

        <Dropdown overlay={resources_menu} trigger={['click']}>
         <a className="ant-nav-dropdown" href="#">
           <Icon type="database" /> Resources <Icon type="down" />
         </a>
        </Dropdown>

        <Dropdown overlay={testnet_menu}>
          <Button style={{ marginLeft: 8 }}>
            Join Testnet
          </Button>
        </Dropdown>

        <a href="https://remme.io/community">
         <Button style={{ marginLeft: 8 }}>
           Join Tech Community
         </Button>
        </a>
     </div>
    )
  }
}

export default withRouter(Navigation);