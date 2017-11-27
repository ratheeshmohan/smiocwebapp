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

var cognitoUser;

export const login = (username, password, callbacks) => {
  var authenticationData = {
    Username: username,
    Password: password
  };
  var userData = {
    Username: username,
    Pool: userPool
  };

  cognitoUser = new CognitoUser(userData);
  var authenticationDetails = new AuthenticationDetails(authenticationData);
  cognitoUser.authenticateUser(authenticationDetails, callbacks);
};

export const completeNewPasswordChallenge = (username, password, callbacks) => {
  if (!cognitoUser) {
    throw "Call login before using this method";
  }

  cognitoUser.completeNewPasswordChallenge(password, {}, callbacks);
};

var loginInstance = login;
export default loginInstance;
