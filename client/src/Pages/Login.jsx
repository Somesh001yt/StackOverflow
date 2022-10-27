import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import firebase from "./firebase";

// import firebase from "./Firebase";

export class Login extends Component {
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          this.onSignInSubmit();
          console.log("Recaptca varified");
        },
        defaultCountry: "IN",
      }
    );
  };
  onSignInSubmit = (e) => {
    e.preventDefault();
    this.configureCaptcha();
    const phoneNumber = "+91" + this.state.mobile;
    console.log(phoneNumber);
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        console.log("OTP has been sent");
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        console.log("SMS not sent");
      });
  };
  onSubmitOTP = (e) => {
    e.preventDefault();
    const code = this.state.otp;
    console.log(code);
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(JSON.stringify(user));
        alert("User is verified");
        <Link to="./"></Link>;
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
      });
  };

  render() {
    return (
      <div className="auth">
        <div className="auth-container">
          <div className="auth-login">
            <div className="auth-login-container">
              <h2> Phone Number</h2>
              <div id="sign-in-button"></div>
              <form onSubmit={this.onSignInSubmit}>
                <input
                  className="input-field"
                  type="number"
                  name="mobile"
                  placeholder="Mobile Number"
                  required
                  onChange={this.handleChange}
                />
                <button className="btn" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>

          <div className="auth-login">
            <div className="auth-login-container">
              <h2> Enter OTP</h2>
              <form onSubmit={this.onSubmitOtp}>
                <input
                  className="input-field"
                  type="number"
                  name="otp"
                  placeholder="OTP Number"
                  required
                  onChange={this.handleChange}
                />
                <button className="btn" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
