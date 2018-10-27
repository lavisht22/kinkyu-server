import React, { Component } from 'react';
import { Menu, Dropdown } from 'antd';
import {} from 'redux';
import { connect } from 'react-redux';

const menu = name => (
  <Menu>
    <Menu.Item key="0">Signed in as {name}</Menu.Item>
    <Menu.Divider />
    <Menu.Item key="1">Profile</Menu.Item>
    <Menu.Item key="2">Settings</Menu.Item>
    <Menu.Item key="3">About</Menu.Item>
    <Menu.Divider />
    <Menu.Item key="4">Sign Out</Menu.Item>
  </Menu>
);

class Header extends Component {
  render() {
    return (
      <div className="header">
        <Dropdown overlay={menu(this.props.name)} trigger={['click']} placement="bottomRight">
          <div className="header-avatar">
            <img
              src={this.props.picture}
              style={{ width: '35px', height: '35px', borderRadius: '50%' }}
              alt="YY"
            />
          </div>
        </Dropdown>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  name: state.user.name,
  picture: state.user.picture,
  id: state.user.id,
});

export default connect(
  mapStateToProps,
  null
)(Header);
