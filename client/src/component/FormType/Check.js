import React from "react";
import { Field, ErrorMessage } from "formik";
import { Texterror } from "./Texterror";

export const Check = (props) => {
  const { name, label, options, ...rest } = props;
  return (
    <div className="form-control">
      <label>{label}</label>
      <Field name={name} {...rest}>
        {({ field }) => {
          return options.map((op, index) => {
            return (
              <div key={op.key}>
                <input
                  type="checkbox"
                  id={op.value}
                  {...field}
                  value={op.value}
                  checked={field.value.includes(op.value)}
                />
                <label htmlFor={op.value}>
                  {op.key}
                  {op.value}
                </label>
              </div>
            );
          });
        }}
      </Field>
      <ErrorMessage name={name} component={Texterror} />
    </div>
  );
};
