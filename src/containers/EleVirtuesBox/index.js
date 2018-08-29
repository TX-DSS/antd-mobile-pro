import React from "react";
// import DevTools from "mobx-react-devtools";
import { Modal, List, Button, WhiteSpace, WingBlank, InputItem, TextareaItem } from 'antd-mobile';
import { createForm } from 'rc-form';

function closest(el, selector) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}

// 通过自定义 moneyKeyboardWrapProps 修复虚拟键盘滚动穿透问题
// https://github.com/ant-design/ant-design-mobile/issues/307
// https://github.com/ant-design/ant-design-mobile/issues/163
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

class EleVirtuesBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal1: false,
      modal2: false,
    };
  }
  showModal = key => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  }
  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  }
  onRandom = () => {

  }
  onNextStep = () => {
    const { form } = this.props;
    form.validateFields((error, value) => {
      console.log(error, value);
      fetch('/api', {
        body: JSON.stringify(value), // must match 'Content-Type' header
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, same-origin, *omit
        // headers: {
        //   'user-agent': 'Mozilla/4.0 MDN Example',
        //   'content-type': 'application/json'
        // },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        // redirect: 'follow', // manual, *follow, error
        // referrer: 'no-referrer', // *client, no-referrer
      })
    });
  }

  onWrapTouchStart = (e) => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
  }

  render() {
    const { getFieldProps } = this.props.form;
    const { moneyFocus } = this.state;
    return (
      <WingBlank>
        <Button onClick={this.showModal('modal1')}>basic</Button>
        <WhiteSpace />
        <Modal
          visible={this.state.modal1}
          transparent
          maskClosable={false}
          onClose={this.onClose('modal1')}
          title="Title"
          footer={[{ text: 'Ok', onPress: () => { console.log('ok'); this.onClose('modal1')(); } }]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <div style={{ height: 100, overflow: 'scroll' }}>
            scoll content...<br />
            scoll content...<br />
            scoll content...<br />
            scoll content...<br />
            scoll content...<br />
            scoll content...<br />
          </div>
        </Modal>

        <Button onClick={this.showModal('modal2')}>popup</Button>
        <WhiteSpace />
        <Modal
          popup
          style={{ bottom: moneyFocus ? '200px' : '0'}}
          visible={this.state.modal2}
          onClose={this.onClose('modal2')}
          animationType="slide-up"
        >
          <List renderHeader={() => <div>委托买入</div>} className="popup-list">
            <InputItem
              {...getFieldProps('money', {
                normalize: (v, prev) => {
                  if (v && !/^(([1-9]\d*)|0)(\.\d{0,2}?)?$/.test(v)) {
                    if (v === '.') {
                      return '0.';
                    }
                    return prev;
                  }
                  return v;
                },
              })}
              type="money"
              placeholder="手动输入金额"
              extra="¥"
              ref={el => this.inputRef = el}
              onFocus={() => this.setState({moneyFocus: true})}
              onBlur={() => this.setState({moneyFocus: false})}
              onVirtualKeyboardConfirm={v => console.log('onVirtualKeyboardConfirm:', v)}
              clear
              moneyKeyboardAlign="left"
              moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            ></InputItem>
            <TextareaItem
              {...getFieldProps('wish', {
                initialValue: '',
              })}
              placeholder="请输入祈福内容"
              rows={3}
              // count={100}
            />
            <List.Item>
              <Button type="primary" inline style={{ width: '33%' }} onClick={this.onRandom}>换个金额</Button>
              <Button type="primary" inline style={{ width: '65%', marginLeft: '2%' }} onClick={this.onNextStep}>下一步</Button>
            </List.Item>
          </List>
        </Modal>
      </WingBlank>
    );
  }
}

const EleVirtuesBoxWrapper = createForm()(EleVirtuesBox);

export default EleVirtuesBoxWrapper;
