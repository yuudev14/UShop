import React, { useState } from "react";
import { registerAction } from "../../reduxStore/actions/authAction";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const SignupForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const formKey = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    retryPassword: "",
  };

  const [signupForm, setSignupForm] = useState(formKey);

  const errorsObject = {
    emailError: "",
    phone_number_error: "",
    passwordError: "",
    retryPasswordError: "",
    blanksError: "",
  };

  const [errors, setErrors] = useState(errorsObject);

  const setSignupFormMethod = (e) => {
    setSignupForm({
      ...signupForm,
      [e.target.name]: e.target.value,
    });
  };

  const putErrorBorder = (list) => {
    document.querySelectorAll(".signup_form input").forEach((input) => {
      if (list.includes(input.name)) {
        input.classList.add("errorInput");
      } else {
        input.classList.remove("errorInput");
      }
    });
  };

  const checkFormErrors = () => {
    const errorInputs = Object.keys(signupForm).filter(
      (key) => signupForm[key] === ""
    );
    let errorFields = [...errorInputs];
    return errorFields;
  };

  const registerSeller = async (e) => {
    e.preventDefault();
    putErrorBorder(checkFormErrors());
    if (checkFormErrors().length === 0) {
      try {
        await dispatch(registerAction(signupForm));
        history.push("/");
      } catch (error) {
        setErrors({
          ...errorsObject,
          ...error,
        });
      }
    } else {
      setErrors({
        ...errorsObject,
        blanksError: "fill up the forms",
      });
    }
  };

  return (
    <form onSubmit={registerSeller} className="signup_form">
      <h1>Sign up</h1>
      <p className="error">{errors.blanksError}</p>
      <div className="nameForm">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={signupForm.firstName}
          onChange={setSignupFormMethod}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={signupForm.lasttName}
          onChange={setSignupFormMethod}
        />
      </div>
      <input
        type="text"
        name="phoneNumber"
        placeholder="Phone Number"
        value={signupForm.phoneNumber}
        className={errors.phone_number_error !== "" && "errorInput2"}
        onChange={setSignupFormMethod}
      />
      <p className="error">{errors.phone_number_error}</p>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={signupForm.email}
        className={errors.emailError !== "" && "errorInput2"}
        onChange={setSignupFormMethod}
      />
      <p className="error">{errors.emailError}</p>
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={signupForm.password}
        className={errors.passwordError !== "" && "errorInput2"}
        onChange={setSignupFormMethod}
      />
      <p className="error">{errors.passwordError}</p>
      <input
        type="password"
        name="retryPassword"
        placeholder="Retry Password"
        value={signupForm.retryPassword}
        className={errors.retryPasswordError !== "" && "errorInput2"}
        onChange={setSignupFormMethod}
      />
      <p className="error">{errors.retryPasswordError}</p>
      <input type="submit" />
    </form>
  );
};

export default SignupForm;
