import React, { Component } from 'react';
import { TabBar, Icon, WhiteSpace, Card, Grid, List } from 'antd-mobile';
// import PropTypes from 'prop-types';
import { inject, observer } from "mobx-react";
import request from '../utils/request';

const data = Array.from(new Array(9)).map((_val, i) => ({
  icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
  text: `name${i}`,
}));

@inject("user")
@observer
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'Tab1',
      hidden: false,
      fullScreen: false,
    };
  }

  fetchUserInfo = (e) => {
    const { user } = this.props;
    e.preventDefault();
    // this.setState({
    //   hidden: !this.state.hidden,
    // });
    request('/api/user.json').then((result) => {
      console.log(result);
      if (result) {
        user.changeName(result.name);
      }
    });
  }

  renderTab3Content() {
    const { user } = this.props;
    return (
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
        <div style={{ paddingTop: 60 }}>Hi “{user.name}”</div>
        <a style={{ display: 'block', marginTop: 40, marginBottom: 20, color: '#108ee9' }}
          onClick={this.fetchUserInfo}
        >
          Fetch User Info
        </a>
        <List renderHeader={() => 'Icon in the left'}>
          <List.Item
            thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
            arrow="horizontal"
            onClick={() => {}}
          >My wallet</List.Item>
          <List.Item
            thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
            onClick={() => {}}
            arrow="horizontal"
          >
            My Cost Ratio
          </List.Item>
        </List>
      </div>
    );
  }

  render() {

    const { user } = this.props;

    // console.log(user);

    return (
      <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden}
        >
          <TabBar.Item
            title="Tab1"
            key="Tab1"
            icon={<Icon type="check" />}
            selectedIcon={<Icon type="check-circle" />}
            selected={this.state.selectedTab === 'Tab1'}
            // badge={1}
            onPress={() => {
              this.setState({
                selectedTab: 'Tab1',
              });
            }}
          >
            <div>
              <WhiteSpace size="lg" />
              <Card full>
                <Card.Header
                  title="This is title"
                  thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                  extra={<span>this is extra</span>}
                />
                <Card.Body>
                  <div>This is content of `Card`</div>
                </Card.Body>
                <Card.Footer content="footer content" extra={<div>extra footer content</div>} />
              </Card>
              <Grid data={data} columnNum={3} />
            </div>
          </TabBar.Item>
          <TabBar.Item
            title="Tab2"
            key="Tab2"
            icon={<Icon type="check" />}
            selectedIcon={<Icon type="check-circle" />}
            // badge={'new'}
            selected={this.state.selectedTab === 'Tab2'}
            onPress={() => {
              this.setState({
                selectedTab: 'Tab2',
              });
            }}
          >

          </TabBar.Item>
          <TabBar.Item
            title="Tab3"
            key="Tab3"
            icon={<Icon type="check" />}
            selectedIcon={<Icon type="check-circle" />}
            dot
            selected={this.state.selectedTab === 'Tab3'}
            onPress={() => {
              this.setState({
                selectedTab: 'Tab3',
              });
            }}
          >
            {this.renderTab3Content()}
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}