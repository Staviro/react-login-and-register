import React, { useState } from "react"
import { Link } from "react-router-dom";

import application from "../../assets/scripts/application";
import { session } from "../../assets/scripts/session";

const Login = () => {
    //variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //methods
    const methods = {
        updateEmail(e) {
            setEmail(e.target.value);
        },
        updatePassword(e) {
            setPassword(e.target.value);
        },
        login() {
            methods.resetValidators();
            if (!methods.isValid()) {
                return;
            }
            
            let loginObj = {
                Email: email,
                Password: password
            }
            let response = application.login(loginObj);
            let result = {}

            response.onreadystatechange = function() {
                if (response.readyState == 4) {
                    if (response.status == 200) {
                        result = JSON.parse(response.responseText);
                        if (result.status === 200) {
                            if (result.data.isAuthenticated) {
                                session.login(JSON.stringify(result.data.account));
                                document.location.reload();
                            } else {
                                document.getElementById('loginResponse').style.display = "block";
                                document.getElementById('loginResponse').innerHTML = result.data.message;
                            }
                        } else {
                            document.getElementById('loginResponse').style.display = "block";
                            document.getElementById('loginResponse').innerHTML = result.data.message;
                        }
                    }
                    else {
                        document.getElementById('loginResponse').style.display = "block";
                        response.onerror = function() {
                            document.getElementById('loginResponse').innerHTML = "Unable to connect to server.";
                        }
                    }
                }
            }
        },
        resetValidators() {
            document.getElementById('loginResponse').style.display = "none";
            let validators = document.querySelectorAll(".login-container .input-error");
            validators.forEach(function(v) {
                v.style.display = "none";
            })
        },
        isValid() {
            let isValid = true;
            if(email === "") {
                document.getElementById('emailError').style.display = "block";
                isValid =  false;
            }

            if (password === "") {
                document.getElementById('passwordError').style.display = "block";
                isValid =  false;
            }
            
            return isValid;
        }
    }
    return (
        <div className="login-container">
            <div className="login-header">Sign back in!</div>
            <div className="login-form">
                <div className="control-container">
                    <label htmlFor="userEmail">Email</label>
                    <input id="userEmail" type="email" value={email} placeholder="johndoe@mail.com" onChange={methods.updateEmail} />
                    <div className="input-error" id="emailError">Please enter email</div>
                </div>
                <div className="control-container">
                    <label htmlFor="userPassword">Password</label>
                    <input id="userPassword" type="password" value={password} placeholder="***********" onChange={methods.updatePassword} />
                    <div className="input-error" id="passwordError">Please enter password</div>
                </div>
                <div className="form-buttons">
                    <button type="button" className="btn-login" onClick={methods.login}>Login</button>
                </div>
                <div className="response-card error" id="loginResponse">
                    An error occurred.
                </div>
                <div className="no-account">
                    Don't have an account? Click <Link to="/register" className="white-link">here</Link> to register
                </div>
            </div>
        </div>

    )
}



export default Login;