import React from "react";
import { Field, ErrorMessage } from "formik";
import { Texterror } from "./Texterror";

export const Select = (props) => {
  const { name, label, options, ...rest } = props;
  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      <Field as="select" id={name} name={name} {...rest}>
        {options.map((op, index) => {
          return (
            <option key={op.key} value={op.value}>
              {op.key} {op.value}
            </option>
          );
        })}
      </Field>
      <ErrorMessage name={name} component={Texterror} />
    </div>
  );
};
