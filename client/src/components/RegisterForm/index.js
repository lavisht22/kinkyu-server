import React from 'react';
import { Form, Icon, Input, Button, Alert, Spin } from 'antd';
import { register } from '../../utils/serviceUtil';

const FormItem = Form.Item;

class NormalRegisterForm extends React.Component {
  state = {
    loading: false,
    error: null,
    user: null,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
      this.setState({
        loading: true,
      });
      register(values.name, values.email, values.password).then(
        function(response) {
          this.setState({
            user: response.data,
            loading: false,
            error: null,
          });
        }.bind(this),
        function(error) {
          this.setState({
            error: error.response.data,
            loading: false,
            user: null,
          });
        }.bind(this)
      );
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Spin spinning={this.state.loading}>
          <div>
            {this.state.error ? (
              <Alert
                message={this.state.error.error_msg}
                description={this.state.error.error_details}
                type="error"
                showIcon
              />
            ) : (
              <div />
            )}
            {this.state.user ? (
              <Alert
                message="Registration Successful!"
                description="Check your email to verify your account."
                type="success"
                showIcon
              />
            ) : (
              <div />
            )}
          </div>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input your name!' }],
              })(
                <Input
                  size="large"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Name"
                />
              )}
            </FormItem>
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
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                className="login-form-button"
                disabled={this.state.loading}
              >
                Register
              </Button>
              Or{' '}
              <a href="#" onClick={this.props.login}>
                Login using existing account.
              </a>
            </FormItem>
          </Form>
        </Spin>
      </div>
    );
  }
}

export default Form.create()(NormalRegisterForm);
