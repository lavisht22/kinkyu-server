import React, { Component } from 'react';
import { Input } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { changeName } from '../actions/index';
import { fetchRoute } from '../actions/user';
import { logout } from '../utils/serviceUtil';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      field: 'YOYOYOYO',
    };
  }

  handleButtonClick() {
    this.props.changeName();
    this.props.fetchRoute();
  }

  logOutButton() {
    logout();
    this.props.redirectHome();
  }

  render() {
    return (
      <div>
        <p> This is HOme</p>
        <button onClick={() => this.props.changePage()}>Go to about page via redux</button>
        <p>{this.props.name}</p>
        <p>{this.props.email}</p>
        <p>{this.props.id}</p>
        <Input placeholder="Basic usage" value={this.state.text} />
        <button onClick={() => this.handleButtonClick()}>{this.props.text}</button>
        <br />
        <button onClick={() => this.logOutButton()}>Log Out</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  name: state.user.name,
  text: state.sample.text,
  email: state.user.email,
  id: state.user.id,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: () => push('/login'),
      redirectHome: () => push('/'),
      changeName: () => changeName(),
      fetchRoute: () => fetchRoute(),
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Home);
