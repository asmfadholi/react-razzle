import React from 'react';
import { connect } from 'react-redux';
import { actionAuth } from 'stores/index';

class BlankPage extends React.Component {

  componentDidMount() {
    this.props.history.push('/');
    this.props.requestLogout();
  }

  render() {
    return (
      <div></div>
    );
  }
}

const mapStateToProps = () => {
  return {};
}

const mapDispatchToProps = (dispatch) => {
  return { 
    requestLogout: (props) => dispatch(actionAuth.requestLogout(props)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BlankPage);