import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import application from "../../../assets/scripts/application";

const Register = () => {
        //variables
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [confirmPassword, setConfirmPassword] = useState(""); 

        //methods
        const methods = {
            
            updateEmail(e) {
                setEmail(e.target.value);
            },
            updatePassword(e) {
                setPassword(e.target.value);
            },
            updateConfirmPassword(e) {                
                setConfirmPassword(e.target.value);
            },
            registerAccount() {
                if (!methods.isValid()) {
                    return false;
                }
                let data = {
                    Email: email,
                    Password: password
                }
                let response = application.registerAccount(data);
                let result = {};
                response.onreadystatechange = function() {
                    if(response.readyState === 4) {
                        if (response.status === 200) {
                            result =  JSON.parse(response.responseText);
                            if (result.status === 200) {
                                document.getElementById('registerResponse').style.display = "block";
                                document.getElementById('registerResponse').classList.add("success");
                                document.getElementById('registerResponse').innerHTML = result.data + '. Redirecting to login page in 3 seconds.';
                                setTimeout(function() {
                                    document.location.href = "/";
                                }, 3000);
                            } else {
                                document.getElementById('registerResponse').style.display = "block";
                                document.getElementById('registerResponse').classList.add("error");
                                document.getElementById('registerResponse').innerHTML = result.data;
                            }
                        } else {
                            document.getElementById('registerResponse').style.display = "block";
                            response.onerror = function() {
                                document.getElementById('registerResponse').style.display = "block";
                                document.getElementById('registerResponse').classList.add("error");
                                document.getElementById('registerResponse').innerHTML = "Unable to connect to server.";
                            }
                        }
                    }
                }
            },
            resetValidators() {
                document.getElementById('registerResponse').style.display = "none";
                document.getElementById('registerResponse').classList.remove("success");
                document.getElementById('registerResponse').classList.remove("error");
                let validators = document.querySelectorAll(".register-container .input-error");
                validators.forEach(function(v) {
                    v.style.display = "none";
                })
            },
            isValid() {
                methods.resetValidators();
                var isValid = true;
                if (email === "") {
                    document.getElementById("emailError").style.display = "block";
                    isValid = false;
                }
                if (password === "") {
                    document.getElementById("userPasswordError").style.display = "block";
                    isValid = false;
                }

                if (confirmPassword === "") {
                    document.getElementById("confirmUserPasswordErrorEmpty").style.display = "block";
                    isValid = false;
                }

                if (password !== "" && confirmPassword !== password) {
                    document.getElementById("confirmUserPasswordErrorMismatch").style.display = "block";
                    isValid = false;
                }

                return isValid;
            }
        }

    return (
        <div className="register-container">
            <div className="register-header">
                Register an account
            </div>
            <div className="register-form">
                <div className="control-container">
                    <label htmlFor="userEmail">Email</label>
                    <input id="userEmail" type="email" value={email} placeholder="johndoe@mail.com" onChange={methods.updateEmail} />
                    <div className="input-error" id="emailError">Please enter email</div>
                </div>
                <div className="control-container">
                    <label htmlFor="userPassword">Password</label>
                    <input id="userPassword" type="password" value={password} placeholder="***********" onChange={methods.updatePassword} />
                    <div className="input-error" id="userPasswordError">Please enter password</div>
                </div>
                <div className="control-container">
                    <label htmlFor="confirmUserPassword">Confirm Password</label>
                    <input id="confirmUserPassword" type="password" value={confirmPassword} placeholder="***********" onChange={methods.updateConfirmPassword} />
                    <div className="input-error" id="confirmUserPasswordErrorEmpty">Please confirm password</div>
                    <div className="input-error" id="confirmUserPasswordErrorMismatch">Passwords do not match</div>
                </div>
                <div className="form-buttons">
                    <button type="button" className="btn-login" onClick={methods.registerAccount}>Register</button>
                </div>
                <div className="response-card" id="registerResponse"></div>
                <div className="has-account">
                    Have an account? Go <Link to="/" className="white-link">back</Link> to login
                </div>
            </div>       
        </div>
    )
}

export default Register;