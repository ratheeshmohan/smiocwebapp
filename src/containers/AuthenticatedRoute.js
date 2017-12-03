import React from "react";
import { browserHistory } from "react-router";
import { connect } from "react-redux";
import { SESSION_SET_REDIRECT_URL_AFTER_SIGNIN } from "../modules/session";

class AuthenticatedRoute extends React.Component {
  componentDidMount() {
    if (!this.props.isLoggedIn) {
      this.props.setRedirectUrl(this.props.currentURL);
      browserHistory.replace("/signin");
    } else {
      this.props.setRedirectUrl("");
    }
  }

  render = () => (this.props.isLoggedIn ? this.props.children : null);
}

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: state.session.token && true,
    currentURL: ownProps.location.pathname
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setRedirectUrl: url =>
      dispatch({
        type: SESSION_SET_REDIRECT_URL_AFTER_SIGNIN,
        url
      })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedRoute);
