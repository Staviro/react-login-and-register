const KEYS = {
    BASEURL: "http://localhost:3001/"
}

const application = {
    login: function(loginObj) {
        let req = new XMLHttpRequest();
        let url = KEYS.BASEURL + "login";
        req.open('POST', url);
        req.setRequestHeader("Content-Type", "application/json");
        req.send(JSON.stringify(loginObj));
        return req;
    },
    registerAccount: function(registerAccountObj) {
        let req = new XMLHttpRequest();
        let url = KEYS.BASEURL + "register";
        req.open('POST', url);
        req.setRequestHeader("Content-Type", "application/json");
        req.send(JSON.stringify(registerAccountObj));
        return req;
    }
}

export default application;