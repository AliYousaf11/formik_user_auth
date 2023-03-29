import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormikControl } from "../component/FormType/FormikControl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//....
export const Registeraton = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  // radio btn...
  const options = [
    { key: "1 - ", value: "Male" },
    { key: "2 - ", value: "Femail" },
    { key: "3 - ", value: "Other" },
  ];

  // inistailstate....
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    Gender: "",
    phone: "",
  };

  // onSubmut.... Post data....
  const onSubmit = (values) => {
    const { name, email, password, confirmpassword, Gender, phone } = values;
    axios
      .post("http://localhost:5000/api/signup", {
        name,
        email,
        password,
        confirmpassword,
        Gender,
        phone,
        image,
      })
      .then((res) => {
        if (res.status === 200) {
          alert(res.data.message);
          navigate("/login");
        } else {
          console.log(res.status);
        }
      })
      .catch((err) => console.log(err));
  };

  // image to buffer....
  const convertToBase64 = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error", error);
    };
  };

  // form Validation.....
  const validationSchema = Yup.object({
    name: Yup.string().required("Required!"),
    email: Yup.string().email("Invalid format").required("Required!"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref("password"), " "], "Password must match")
      .required("Required!"),
    Gender: Yup.string().required("Required!"),
    phone: Yup.number("Enter Number").required("Required"),
  });

  ///......
  return (
    <div className="Registeration">
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
            >
              <input
                accept="image/*"
                type="file"
                onChange={convertToBase64}
                className="my_file"
              />
            </div>
            <FormikControl
              type="text"
              name="name"
              label="Name"
              control="input"
            />
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
            <FormikControl
              autoComplete="on"
              type="password"
              name="confirmpassword"
              label="Repeat Password"
              control="input"
            />
            <FormikControl
              control="radio"
              label="Gender"
              name="Gender"
              options={options}
            />
            <FormikControl
              control="input"
              type="text"
              name="phone"
              label="phoneNo"
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

// fetch("http://localhost:5000/api/signup", {
//   headers: {
//     "content-type": "application/json",
//     Accept: "application/json",
//     "Access-Control-Allow-Origin": "*",
//   },
//   method: "POST",
//   body: JSON.stringify({
//     email: values.email,
//     password: values.password,
//     name: values.name,
//     confirmpassword: values.confirmpassword,
//     Gender: values.Gender,
//     phone: values.phone,
//   }),
// })
//   .then((response) => response.json())
//   .then((res) => {
//     console.log(res.status);
//     alert(res.message);
//   })
//   .catch((error) => console.log(error));
