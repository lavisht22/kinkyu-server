import React, { Component } from 'react';
import { message, Alert, Form, Icon, Input, Button, Checkbox } from 'antd';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login } from '../../utils/serviceUtil';

const FormItem = Form.Item;

class NormalLoginForm extends Component {
  state = {
    loading: false,
    error: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((error, values) => {
      if (!error) {
        this.setState({
          loading: true,
          error: null,
        });
        login(values.email, values.password).then(
          function() {
            this.setState({
              loading: true,
              error: null,
            });
            message.success(
              'Success! Logging you in...',
              1,
              function() {
                this.props.redirectHome();
              }.bind(this)
            );
          }.bind(this),
          function(error) {
            this.setState({
              loading: false,
              error: error,
            });
          }.bind(this)
        );
      }
    });
  };
  render() {
    console.log(this.props.register);
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        {this.state.error ? (
          <Alert description={this.state.error.description} type="error" showIcon />
        ) : (
          <div />
        )}
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!' }],
            })(
              <Input
                size="large"
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Email"
              />
            )}
          </FormItem>
          <FormItem>
            {' '}
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                size="large"
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>Remember me</Checkbox>)}
            <a className="login-form-forgot" href="/">
              Forgot password
            </a>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              className="login-form-button"
              loading={this.state.loading}
            >
              Log in
            </Button>
            Or{' '}
            <a href="#" onClick={this.props.register}>
              register now!
            </a>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      redirectHome: () => push('/'),
    },
    dispatch
  );

export default Form.create()(
  connect(
    null,
    mapDispatchToProps
  )(NormalLoginForm)
);
