import React from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { Button as MDCButton, TextField as MDCTextField } from "rmwc";

const renderTextField = field => <MDCTextField {...field.input} {...field} />;

const TextField = props => <Field component={renderTextField} {...props} />;

const Button = props => <MDCButton raised {...props} />;

export { TextField, Button };
