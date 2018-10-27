import React from 'react';
import { Col, Row } from 'antd';

import LoginForm from '../../components/LoginForm';
import RegisterForm from '../../components/RegisterForm';

import './style.css';

class LoginScreen extends React.Component {
  state = {
    form: 'Login',
  };

  changeForm = () => {
    if (this.state.form === 'Login') {
      this.setState({ form: 'Register' });
    } else {
      this.setState({ form: 'Login' });
    }
  };

  render() {
    console.log(this.state.form);
    return (
      <div className="container">
        <Row>
          <Col sm={17} xs={0} className="right-panel">
            <div className="text-heading">This is an amazing heading about what we are</div>
            <div className="text-content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla turpis enim,
              nec porttitor ex posuere at. Sed nibh neque, faucibus sit amet vulputate at,
              sollicitudin a leo. Sed suscipit, orci non euismod euismod, ligula augue suscipit
              mauris, eget auctor nunc lectus at libero. Aenean mattis elit ut odio feugiat, in
              efficitur mi molestie. Maecenas enim massa, ultrices in nisi sit amet, rhoncus aliquam
              lectus. Sed et velit scelerisque, iaculis felis nec, posuere nulla. Aliquam erat
              volutpat. Mauris quam nulla, pellentesque ac bibendum ac, pellentesque vitae sapien.
              In et nunc feugiat, luctus risus placerat, ultrices purus. Pellentesque vitae purus
              eget ex tincidunt condimentum ac vitae orci.
            </div>
          </Col>
          <Col sm={7} xs={24} className="login-panel">
            <div className="heading">{this.state.form}</div>
            {this.state.form === 'Login' ? (
              <LoginForm register={this.changeForm} />
            ) : (
              <RegisterForm login={this.changeForm} />
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default LoginScreen;
