import React from "react";
import { Field, ErrorMessage } from "formik";
import { Texterror } from "./Texterror";

export const Textarea = (props) => {
  const { name, label, ...rest } = props;
  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      <Field as="textarea" id={name} name={name} {...rest} />
      <ErrorMessage name={name} component={Texterror} />
    </div>
  );
};
