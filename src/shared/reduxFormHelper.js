import React from "react";
import { Input } from "reactstrap";

export function renderInputField(field) {
  return (
    <Input
      {...field.input}
      type={field.type}
      required={field.required}
      placeholder={field.placeholder}
      id={field.id}
      {...field}
    />
  );
}
