import AuthForm, { STATE_LOGIN } from 'components/AuthForm';
import React from 'react';
import { Card, Col, Row } from 'reactstrap';

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
              usernameLabel={usernameLabel}
              usernameInputProps={usernameInputProps}
              authState={this.props.authState}
              onChangeAuthState={this.handleAuthState}
              onLogoClick={this.handleLogoClick}
            />
          </Card>
        </Col>
      </Row>
    );
  }
}

export default AuthPage;
