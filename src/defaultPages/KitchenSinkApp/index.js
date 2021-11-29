import React from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Global } from "@emotion/core";

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { CometChatAvatar } from '../../cometchat-pro-react-ui-kit/CometChatWorkspace/src';
import { COMETCHAT_CONSTANTS } from '../../consts';

import {
  wrapperStyle,
  errorStyle,
  titleStyle,
  subtitleStyle,
  userContainerStyle,
  userWrapperStyle,
  thumbnailWrapperStyle,
  uidWrapperStyle,
  inputWrapperStyle,
  loginBtn,
} from "./style";

import { loaderStyle } from "./loader";

import * as actions from '../../store/action';

class KitchenSinkApp extends React.PureComponent {

  constructor(props) {
    super(props);

    this.myRef = React.createRef();
  }

  login = (uid) => {
    if(!uid) {
      uid = this.myRef.current.value;
    }

    this.uid = uid;
    this.props.onLogin(this.uid, COMETCHAT_CONSTANTS.AUTH_KEY);
  }
  
  render() {

    let loader = null;
    if (this.props.loading) {
      loader = (<div className="loading">Loading...</div>);
    }

    let errorMessage = null;
    if (this.props.error) {
      console.log(this.name);
      errorMessage = (<p css={errorStyle()}>{"UID không hợp lệ"||this.props.error.message}</p>);
    }

    let authRedirect = null;
    if (this.props.isLoggedIn) {
      authRedirect = <Redirect to="/users" />
    }

    return (
      <React.Fragment>
      <Global styles={loaderStyle} />
      <div css={wrapperStyle()}>
          {authRedirect}
          {loader}
          {errorMessage}
          <p css={titleStyle()}>Medical Advice</p>
          <p css={subtitleStyle()}>Đăng nhập tài khoản người dùng (thử lựa chọn tài khoản khác nếu không đăng nhập thành công)</p>
          <div css={userContainerStyle()}>
            <div css={userWrapperStyle()} onClick={()=>this.login('benhnhan1')}>
              <div css={thumbnailWrapperStyle()}>
                <CometChatAvatar image='https://data-us.cometchat.io/assets/images/avatars/ironman.png' />
              </div>
              <p>Người dùng 1</p>
            </div>
            <div css={userWrapperStyle()} onClick={()=>this.login('benhnhan2')}>
              <div css={thumbnailWrapperStyle()}>
                <CometChatAvatar image='https://data-us.cometchat.io/assets/images/avatars/captainamerica.png' />
              </div>
              <p>Người dùng 2</p>
            </div>
            <div css={userWrapperStyle()} onClick={()=>this.login('benhnhan3')}>
              <div css={thumbnailWrapperStyle()}>
                <CometChatAvatar image='https://data-us.cometchat.io/assets/images/avatars/spiderman.png' />
              </div>
              <p>Người dùng 3</p>
            </div>
            <div css={userWrapperStyle()} onClick={()=>this.login('benhnhan4')}>
              <div css={thumbnailWrapperStyle()}>
                <CometChatAvatar image='https://data-us.cometchat.io/assets/images/avatars/wolverine.png' />
              </div>
              <p>Người dùng 4</p>
            </div>
          </div><br/>
          <div css={uidWrapperStyle()}>
            <div>
              <p css={subtitleStyle()}>Đăng nhập dành cho bác sĩ</p>
            </div>
            <div css={inputWrapperStyle()}>
              <input ref={this.myRef} type="text" placeholder="Nhập UID" />
            </div>
            <div css={loginBtn()}><button type="button" onClick={() => this.login()}>Đăng nhập</button></div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error,
    isLoggedIn: state.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: ( uid, authKey ) => dispatch( actions.auth( uid, authKey ) )
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( KitchenSinkApp );
