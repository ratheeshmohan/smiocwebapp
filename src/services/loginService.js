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
  cognitoUser.authenticateUser(authenticationDetails, {
    ...callbacks,
    onSuccess: result =>
      callbacks.onSuccess &&
      callbacks.onSuccess(getPayload(cognitoUser.getSignInUserSession()))
  });
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

const getPayload = session => {
  let idToken = session.idToken.jwtToken;
  let payload = session.idToken.payload;
  let user = {
    email: payload["cognito:username"],
    churchId: payload["custom:churchId"],
    role: payload["custom:role"]
  };
  return { token: idToken, user: user };
};

export const getSession = () =>
  new Promise((resolve, reject) => {
    var cognitoUser = userPool.getCurrentUser();
    if (cognitoUser == null) {
      reject();
      return;
    }

    cognitoUser.getSession(function(err, session) {
      if (session && session.isValid()) {
        resolve(getPayload(session));
      } else {
        let refreshToken = cognitoUser.getSignInUserSession().getRefreshToken();
        cognitoUser.refreshSession(refreshToken, (err, session) => {
          if (session) {
            resolve(getPayload(session));
          } else {
            reject();
          }
        });
      }
    });
  });

export default login;
