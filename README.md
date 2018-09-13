Web移动端框架开发指南
===

## 1. 框架使用场景

## 2. 基础技术栈说明

### 2.1 React

### 2.2 路由管理 React-Router

### 2.3 状态管理 Mobx

### 2.4 组件库 Ant Design Mobile

## 3. 目录结构说明

```bash
.
├── node_modules             # 依赖模块目录
├── public                   # 静态资源文件目录
├── src                      # 源代码目录
    ├── components           # 公共组件目录
    ├── containers           # 功能页面组件jsx文件
    ├── models               # Dva models Redux处理js文件目录
    ├── routes               # Ant Design Pro Preview工程demo页面
    ├── services             # 全局后台接口服务
    └── utils                # 全局类公共函数
        └── authority.js     # 用户认证相关方法
        └── request-fetch.js # dva/fetch异步请求封装
        └── request.js       # axios异步请求封装
        └── utils.js         # 公共工具方法
    ├── index.css            # 主页面入口CSS样式文件
    ├── index.ejs            # 主页面入口html模板
    ├── index.js             # 主页面入口js文件
├── .gitignore               # git版本管理忽略配置
├── config-overrides.js      # webpack配置自定义
└── package.json             # npm包管理文件
```

## 3. 开发指南

### 3.1 环境搭建

### 3.2 开发实施流程

#### 3.2.1 创建页面组件

页面组件文件约定创建在 `src/containers` 目录中。可以根据不同的业务功能创建不同的目录。

如电子功德箱功能的入口页面组件可创建文件：
`src/containers/EleVirtuesBox/index.js`

该功能的其他页面可创建文件：`src/containers/EleVirtuesBox/EleVirtuesBoxPage1.js`

#### 3.2.2 创建页面路由

页面路由配置文件为 `src/index.js`

```javascript
// 引入页面组件
import App from './containers/App';
import EleVirtuesBox from './containers/EleVirtuesBox'; // 默认引用该目录中的index.js文件
import EleVirtuesBoxPage1 from './containers/EleVirtuesBoxPage1';

// 添加Route配置
const router = (
  <Provider { ...Stores }>
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/elevirtuesbox/:id" component={EleVirtuesBox} />
        <Route exact path="/elevirtuesbox/page1" component={EleVirtuesBoxPage1} />
      </Switch>
    </Router>
  </Provider>
);
```

#### 3.2.3 编写页面组件类

```javascript
import React from "react";

// 引入Ant Design Mobile组件
import { List, Button, InputItem } from 'antd-mobile';

@inject("user")
@observer
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }
  render() {
    const { user } = this.props;
    const { loading } = this.state;
    return (
      <List>
        <InputItem placeholder="用户名"
          {...getFieldProps('username', {
            initialValue: user.username,
          })}
        />
        <InputItem placeholder="密码" type="password"
          {...getFieldProps('password')}
        />
      </List>
      <WingBlank>
        <Button onClick={this.login() loading={loading}}>login</Button>
      </WingBlank>
    );
  }
}

export default Login;
```

#### 3.2.4 编写状态管理类

编写mobx状态管理文件
```javascript
// @flow
import { action, observable, runInAction } from 'mobx';
import request from '../utils/request'

class User {
  @observable username = '';

  @action
  login = async (username, password) => {
    const respData = await request('/login', {
      method: 'POST',
      body: {
        username,
        password,
      },
    });
    runInAction(() => {
      if (respData.result == "ok") {
        this.username = respData.username;
      }
    });
    return true;
  }

  @action
  logout = async () => {
  }

}

// 导出实例化对象
export default new User();
```

### 3.3 典型开发示例

#### 3.3.1 Tabs组件编写

#### 3.3.2 表单示例

#### 3.3.3 文件上传

#### 3.3.4 调用微信api

## 4. 调试指南
