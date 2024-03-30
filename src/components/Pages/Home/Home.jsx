import React from "react";
import Login from "../../Login/Login";
import WelcomeBack from "../../WelcomeBack/WelcomeBack";
import { session } from "../../../assets/scripts/session";

function isLoggedInMethod(userState) {
    console.log(userState);
    if(userState === true && session.getAccount() !== null) {
        let account = session.getAccount();  
        console.log(account);
        return (
            <WelcomeBack data={account}></WelcomeBack>
        )
    } else {
        return (
            <div className="home-container">
                <div className="left-content">
                    <div className="content">
                        <div className="header">React.JS (Login & Register) with Node.js</div>
                        <div className="body">
                            In this application you will see how to manage a users logged in state with React and authentication via Node.JS
                            <br />
                            <br />
                            <div className="creator">By Joseph Morukhuladi</div>
                        </div>
                    </div>
                </div>
                <div className="right-content">
                    <div className="content">
                        <Login/>
                    </div>
                </div>
            </div>
        )
    }
}
const Home = () => {
    return (
        <div className="container">
            { isLoggedInMethod(session.isLoggedIn()) }
        </div>
    )
}

export default Home;