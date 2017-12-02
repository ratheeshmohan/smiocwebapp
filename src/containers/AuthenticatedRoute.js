import React from "react";
import { browserHistory } from "react-router";
import { connect } from "react-redux";
import Loader from "../components/Loader/Loader";

class AuthenticatedRoute extends React.Component {
  componentDidMount() {
    const { dispatch, currentURL } = this.props;

    if (!isLoggedIn) {
      setRedirectUrl(currentURL);
      browserHistory.replace("/login");
    }
  }

  render = () => (isLoggedIn ? this.props.children : <Loader />);
}

const mapStateToProps = {
  isLoggedIn: state.session.sessionStatus == "SESSION_ESTABLISHMENT_SUCCEED",
  currentURL: ownProps.location.pathname
};

const mapDispatchToProps = {
  //setRedirectUrl: url => loginAsync(values.username, values.password)
};

export default connect(mapStateToProps)(AuthenticatedRoute);
