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

export default login;
