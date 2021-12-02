import React, { useRef } from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/UShopAuth/LoginForm";
import SignupForm from "../components/UShopAuth/SignupForm";
import "../styles/UshopAuth/UshopAuth.scss";

const UshopAuth = () => {
  const AuthContainer = useRef();

  return (
    <div className="UShopAuth">
      <div ref={AuthContainer} className="AuthContainer ">
        <LoginForm />
        <SignupForm />
        <div className="overlay_container">
          <div className="overlay">
            <div className="overlay_div login_overlay">
              <h1>Welcome Back</h1>
              <p>To be connected with us log in with your personal info</p>
              <button
                onClick={() =>
                  AuthContainer.current.classList.remove("AuthContainerActive")
                }>
                login
              </button>
            </div>
            <div className="overlay_div signup_overlay">
              <h1>Hello Friend</h1>
              <p>Enter your personal details and start selling with us</p>
              <button
                onClick={() =>
                  AuthContainer.current.classList.add("AuthContainerActive")
                }>
                signup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UshopAuth;
