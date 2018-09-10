import React, { Component } from 'react';
import { TabBar, Icon, WhiteSpace, Toast, InputItem, List } from 'antd-mobile';
// import PropTypes from 'prop-types';
import { inject, observer } from "mobx-react";
import { createForm } from 'rc-form';

@inject("user")
@observer
class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onLoginClick = (e) => {
    const { user, form } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (err) {
        if (err.username) {
          Toast.info('请输入用户名');
        }
        else if (err.password) {
          Toast.info('请输入密码');
        }
        return;
      }

      // 执行登录动作
      Toast.loading('加载中', 0);
      user.login(values.username, values.password)
        .then((result) => {
          if (result) {
            // 登录成功
          }
        });
      Toast.hide();
    });
  }

  render() {

    const { user, form } = this.props;
    const { getFieldProps } = form;

    // console.log(user);

    return (
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
        <div style={{ paddingTop: 60 }}>Hi “{user.username}”</div>
        <List>
          <InputItem placeholder="用户名"
            {...getFieldProps('username', {
              rules: [{ required: true }],
              initialValue: user.username,
            })}
          />
          <InputItem placeholder="密码" type="password"
            {...getFieldProps('password')}
          />
        </List>
        <a style={{ display: 'block', marginTop: 40, marginBottom: 20, color: '#108ee9' }}
          onClick={this.onLoginClick}
        >
          Login
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
}

export default createForm()(User);