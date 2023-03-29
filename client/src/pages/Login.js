import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormikControl } from "../component/FormType/FormikControl";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//....
export const Login = () => {
  const navigate = useNavigate();
  // inistailstate....
  const [image, setImage] = useState("");

  const initialValues = {
    email: "",
    password: "",
  };

  // onSubmut....
  const onSubmit = (values) => {
    const { email, password } = values;
    axios
      .post("http://localhost:5000/api/login", {
        email,
        password,
      })
      .then((res) => {
        if (res.status === 200) {
          alert(res.data.message);
          localStorage.setItem("first_Token", res.data.result.token);
          // console.log(res.data.result);
          setImage(res.data.result.userImage);
          navigate("/");
        } else {
          console.log(res.status);
        }
      })
      .catch((err) => console.log(err));
  };

  // form Validation.....
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid format").required("Required!"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  ///......
  return (
    <div className="login">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <div
              className="wrapper"
              style={{ backgroundImage: `url(${image})` }}
            ></div>
            <FormikControl
              type="email"
              name="email"
              label="Email"
              control="input"
            />
            <FormikControl
              autoomplete="on"
              type="password"
              name="password"
              label="Password"
              control="input"
            />

            <button type="submit" disabled={!formik.isValid}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
