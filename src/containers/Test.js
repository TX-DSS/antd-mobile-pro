import React, { Component } from 'react';
import { TabBar, Icon, WhiteSpace, Toast, InputItem, List } from 'antd-mobile';
// import PropTypes from 'prop-types';
import { inject, observer } from "mobx-react";

@inject("user")
@observer
class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: '123'
    };
  }

  onListClick = () => {
    this.setState({test: '321'});
  }

  render() {

    // console.log(user);
    const { test } = this.state; 

    return (
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
        <List renderHeader={() => 'Icon in the left'}>
          <List.Item
            thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
            arrow="horizontal"
            onClick={() => {}}
          >{test}</List.Item>
          <List.Item
            thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
            onClick={this.onListClick}
            arrow="horizontal"
          >
            My Cost Ratio
          </List.Item>
        </List>
      </div>
    );
  }
}

export default Test;