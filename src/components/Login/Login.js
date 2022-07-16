import React from "react";
import "./Login.css";
import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import GoogleButton from "react-google-button";
import { useStateValue } from "../Contextapi/StateProvider";
import { actionTypes } from "../Contextapi/reducer";

const Login = () => {
  const [state, dispatch] = useStateValue();
  console.log(state);
  const signup = async (e) => {
    e.preventDefault();
    try {
      let value = await signInWithPopup(auth, provider);
      dispatch({
        type: actionTypes.SET_USER,
        user: value.user,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/765px-WhatsApp.svg.png"
          alt="whatsapp"
        />
        <div className="login__text">
          <h1>
            Sign in to <span> WhatsApp </span>
          </h1>
        </div>
        <div className="login__button">
          <GoogleButton className="g-btn" type="dark" onClick={signup} />
        </div>
      </div>
    </div>
  );
};

export default Login;
