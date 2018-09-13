// @flow
import { action, observable, runInAction } from 'mobx';
// import { persist } from 'mobx-persist';
import request from '../utils/request'

//页面跳转
class User {
  // 持久化登录用户名
  // @persist('string') @observable username = '';
  @observable username = '';

  @action
  login = async (username, password) => {
    const respData = await request('/api/user.json', {
      method: 'GET',
      body: {
        username,
        password,
      },
    })
    // const data = await loginApi(username, password, 'CN', registrationId);
    runInAction(() => {
      //数据请求完成进行页面跳
      if (respData.result === "ok") {
        this.username = respData.name;
      }
    })
    return true;
  }

  @action
  logout = async () => {
    runInAction(() => {
      this.username = '';
    });
  }

}

export default new User();
