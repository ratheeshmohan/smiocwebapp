import { Config, CognitoIdentityCredentials } from "aws-sdk";
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoIdentityServiceProvider,
  AuthenticationDetails,
  CognitoUser
} from "amazon-cognito-identity-js";
import appConfig from "../configs/cognito";

Config.region = appConfig.region;
Config.credentials = new CognitoIdentityCredentials({
  IdentityPoolId: appConfig.IdentityPoolId
});

var userPool = new CognitoUserPool({
  UserPoolId: appConfig.UserPoolId,
  ClientId: appConfig.ClientId
});

export const login = (username, password, callbacks) => {
  var authenticationData = {
    Username: username,
    Password: password
  };
  var userData = {
    Username: username,
    Pool: userPool
  };

  var authenticationDetails = new AuthenticationDetails(authenticationData);
  var cognitoUser = new CognitoUser(userData);
  cognitoUser.authenticateUser(authenticationDetails, callbacks);
};

export const completeNewPasswordChallenge = (
  username,
  password,
  newPassword,
  callbacks
) => {
  var authenticationData = {
    Username: username,
    Password: password
  };
  var userData = {
    Username: username,
    Pool: userPool
  };

  var authenticationDetails = new AuthenticationDetails(authenticationData);
  var cognitoUser = new CognitoUser(userData);
  cognitoUser.authenticateUser(authenticationDetails, {
    newPasswordRequired: function(userAttributes, requiredAttributes) {
      cognitoUser.completeNewPasswordChallenge(newPassword, {}, callbacks);
    }
  });
};

export const changePassword = (
  username,
  oldPassword,
  newPassword,
  callbacks
) => {
  var authenticationData = {
    Username: username,
    Password: oldPassword
  };
  var userData = {
    Username: username,
    Pool: userPool
  };

  var cognitoUser = new CognitoUser(userData);
  var authenticationDetails = new AuthenticationDetails(authenticationData);

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function(userAttributes, requiredAttributes) {
      cognitoUser.changePassword(oldPassword, newPassword, callbacks);
    },
    onFailure: function(err) {
      callbacks(err.message);
    }
  });
};

export const resetPassword = (email, callbacks) => {
  var authenticationData = {
    Username: email
  };
  var userData = {
    Username: email,
    Pool: userPool
  };

  var cognitoUser = new CognitoUser(userData);
  cognitoUser.forgotPassword(callbacks);
};

export const resetPasswordConfirm = (
  email,
  verificationCode,
  newPassword,
  callbacks
) => {
  var authenticationData = {
    Username: email
  };
  var userData = {
    Username: email,
    Pool: userPool
  };
  var cognitoUser = new CognitoUser(userData);
  cognitoUser.confirmPassword(verificationCode, newPassword, callbacks);
};

export const getSessionStatus = (onValid, onError) => {
  var cognitoUser = userPool.getCurrentUser();
  if (cognitoUser == null) {
    onError && onError();
    return;
  }
  cognitoUser.getSession(function(err, session) {
    if (session && session.isValid()) {
      onValid && onValid();
    } else {
      onError && onError();
    }
  });
};

export default login;
