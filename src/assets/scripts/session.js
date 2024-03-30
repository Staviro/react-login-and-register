const session = {
    isLoggedIn: function() {
        let value = sessionStorage.getItem(SESSIONKEYS.LOGGEDIN);
        if (value == null) {
            return false;
        } else {
            return Boolean(value);
        }
    },
    login: function(acc) {
        sessionStorage.setItem(SESSIONKEYS.LOGGEDIN, true);
        sessionStorage.setItem(SESSIONKEYS.ACCOUNT, acc);
    },
    logout: function() {
        sessionStorage.setItem(SESSIONKEYS.LOGGEDIN, false);
        sessionStorage.setItem(SESSIONKEYS.ACCOUNT, null);
        document.location.reload();
    },
    getAccount: function() {
        return JSON.parse(sessionStorage.getItem(SESSIONKEYS.ACCOUNT));
    }
}

const SESSIONKEYS = {
    LOGGEDIN: "isLoggedIn",
    ACCOUNT: "account"
}

module.exports = {
    session, SESSIONKEYS
}