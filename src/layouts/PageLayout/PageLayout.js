import React from "react";
import { IndexLink, Link } from "react-router";
import PropTypes from "prop-types";
import "./PageLayout.scss";
import Header from "../Header/Header";
import { browserHistory } from "react-router";
import { connect } from "react-redux";

class PageLayout extends React.Component {
  componentDidUpdate(prevProps) {
    const { dispatch, redirectUrl, changeRoute } = this.props;
    const isLoggingOut = prevProps.isLoggedIn && !this.props.isLoggedIn;
    const isLoggingIn = !prevProps.isLoggedIn && this.props.isLoggedIn;

    if (isLoggingIn) {
      browserHistory.replace(redirectUrl);
    } else if (isLoggingOut) {
      // do any kind of cleanup or post-logout redirection here
    }
  }

  render = () => (
    <div className="container text-center">
      <Header />
      <div className="page-layout__viewport">{this.props.children}</div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.session.token && true,
    redirectUrl: state.session.redirectUrl
  };
}

export default connect(mapStateToProps)(PageLayout);
