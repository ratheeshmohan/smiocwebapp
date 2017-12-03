import React from "react";
import { browserHistory, Router } from "react-router";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import { actions } from "../modules/session";
import { connect } from "react-redux";


class App extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.initializeApp();
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <div style={{ height: "100%" }}>
          <Router history={browserHistory} children={this.props.routes} />
        </div>
      </Provider>
    );
  }
}

const mapDispatchToProps = {
  initializeApp: () => actions.loadSessionFromLocalStoreAsync()
};

export default connect(null, mapDispatchToProps)(App);
