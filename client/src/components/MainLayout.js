import React, { Component } from 'react';
import { Layout } from 'antd';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Home from '../pages/home';
import About from '../pages/about';
import Sidebar from './sidebar';
import AppHeader from './Header';
import { fetchUserProfile, fetchRoute } from '../actions/user';

const { Header, Footer, Content } = Layout;

class MainLayout extends Component {
  componentDidMount() {
    this.props.fetchUserProfile();
  }

  render() {
    return (
      <div className="App">
        <Layout style={{ minHeight: '100vh' }}>
          <Sidebar />
          <Layout>
            <Header className="App-header">
              <AppHeader />
            </Header>
            <Content className="App-body">
              <Switch>
                <Route exact component={Home} path="/" />
                <Route component={About} path="/about" />
                <Redirect to="/404" />
              </Switch>
            </Content>
            <Footer>footer</Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchUserProfile: () => fetchUserProfile(),
      fetchRoute: () => fetchRoute(),
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(MainLayout);
