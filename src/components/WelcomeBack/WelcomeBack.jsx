import React from "react";
import { session } from "../../assets/scripts/session";

const WelcomeBack = (props) => {
    return (
        <div className="welcome-back">
            <div className="welcome-back-content">
                <div className="header">
                    Welcome Back { props.data.Email }
                </div>
                <div className="body">
                    <div>You has successfully managed to log into your account using React and Node.js</div>
                    <br></br>
                    <button className="btn-white" onClick={session.logout}>LOGOUT</button>
                </div>
            </div>
        </div>
    )
}

export default WelcomeBack;