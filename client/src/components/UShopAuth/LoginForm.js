import React, { useState } from "react";
import "../../styles/nav/sellerNav.scss";
import {
  loginAction,
  verifyHasShop,
} from "../../reduxStore/actions/authAction";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCartProductAction } from "../../reduxStore/actions/cartAction";

const LoginForm = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
    blanksError: "",
  });

  const setLoginFormMethod = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };
  const putErrorBorder = (list) => {
    document.querySelectorAll(".login_form input").forEach((input) => {
      if (list.includes(input.name)) {
        input.classList.add("errorInput");
      } else {
        input.classList.remove("errorInput");
      }
    });
  };

  const checkFormErrors = () => {
    let formErrors = [];
    const inputs = Object.values(loginForm).every((val) => val !== "");
    if (!inputs) {
      const errorInputs = Object.keys(loginForm).filter(
        (key) => loginForm[key] === ""
      );
      formErrors = [...formErrors, ...errorInputs];
    }

    return formErrors;
  };

  const loginSeller = async (e) => {
    e.preventDefault();
    putErrorBorder(checkFormErrors());
    if (checkFormErrors().length === 0) {
      try {
        await dispatch(loginAction(loginForm));
        setLoginForm({
          email: "",
          password: "",
        });
        dispatch(getCartProductAction());
        dispatch(verifyHasShop());
        history.go(-1);
      } catch (error) {
        setErrors({
          emailError: "",
          passwordError: "",
          blanksError: "",
          ...error,
        });
      }
    } else {
      setErrors({
        ...errors,
        blanksError: "fill in the blanks",
      });
    }
  };
  return (
    <form className="login_form" onSubmit={loginSeller}>
      <h1>Log in</h1>
      <p className="error">{errors.blanksError}</p>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={loginForm.email}
        className={errors.emailError !== "" ? "errorInput2" : ""}
        onChange={setLoginFormMethod}
      />
      <p className="error">{errors.emailError}</p>
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={loginForm.password}
        className={errors.passwordError !== "" && "errorInput2"}
        onChange={setLoginFormMethod}
      />
      <p className="error">{errors.passwordError}</p>
      <input type="submit" />
    </form>
  );
};

export default LoginForm;
