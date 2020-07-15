import AuthForm, { STATE_LOGIN } from 'components/AuthForm';
import React from 'react';
import { Card, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { actionAuth } from 'stores/index';

const propsForm = {
  login: {
    usernameLabel: 'Email',
    usernameInputProps: {
      type: 'email',
      placeholder: 'your@email.com',
    },
  },
  forgotPassword: {
    usernameLabel: 'Find your email',
    usernameInputProps: {
      type: 'email',
      placeholder: 'your@email.com',
    },
  }
}
class AuthPage extends React.Component {

  get propsForm() {
    const { login, forgotPassword } = propsForm;
    return this.props.authState === STATE_LOGIN ? login : forgotPassword;
  }

  get isFetch() {
    const { isFetchLogin, isFetchForgotPassword, authState } = this.props;
    return authState === STATE_LOGIN ? isFetchLogin : isFetchForgotPassword;
  }

  handleAuthState = authState => {
    if (authState === STATE_LOGIN) {
      this.props.history.push('/login');
    } else {
      this.props.history.push('/forgot-password');
    }
  };

  handleLogoClick = () => {
    this.props.history.push('/');
  };

  onSubmit = (state) => {
    if (this.props.authState === STATE_LOGIN) {
      this.props.requestLogin(state);
    } else {
      this.props.requestForgotPassword(state);
    }
    
  };

  render() {
    const { usernameLabel, usernameInputProps } = this.propsForm;
    return (
      <Row
        style={{
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Col md={6} lg={4}>
          <Card body>
            <AuthForm
              isFetch={this.isFetch}
              usernameLabel={usernameLabel}
              usernameInputProps={usernameInputProps}
              authState={this.props.authState}
              onChangeAuthState={this.handleAuthState}
              onLogoClick={this.handleLogoClick}
              onSubmit={this.onSubmit}
            />
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFetchLogin: state.StoreAuth.isLogin.fetch,
    isFetchForgotPassword: state.StoreAuth.isEmailExist.fetch,
    isLogin: state.StoreAuth.isLogin.status,
  };
}

const mapDispatchToProps = (dispatch) => {
  return { 
    requestLogin: (req) => dispatch(actionAuth.requestLogin(req)),
    requestForgotPassword: (req) => dispatch(actionAuth.requestForgotPassword(req)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
