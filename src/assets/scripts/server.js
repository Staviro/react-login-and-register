const fs = require('fs');
const http = require('http');
const accountFilePath = "../../data/accounts.txt";

http.createServer(function (request, response) {
  response.setHeader("Access-Control-Allow-Headers", "*");
  response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  if (request.url == "/getAccounts") {
    response.response = JSON.stringify(methods.getAccountFile());
    response.responseText = JSON.stringify(methods.getAccountFile());
    response.end(JSON.stringify(methods.getAccountFile()));

  } else if (request.url == "/register") {
    try {
      let body = "";
      request.setEncoding("utf-8");
      request.on("data", function(chunk) {
        body += chunk;
      }).on("end", function() {
        let result = methods.registerAccount(body);
        response.responseText = JSON.stringify(result);
        response.response = JSON.stringify(result);
        response.end(JSON.stringify(result));
      });  
    } catch (e) {
      let result = {
        status: 500,
        data: e
      }
      response.end(JSON.stringify(result));
      return result;
    }
  } 
  else if (request.url == "/login") {
    try {
      let body = "";
      request.setEncoding("utf-8");
      request.on("data", function(chunk) {
        body += chunk;
      }).on("end", function() {
        let result = methods.login(body);
        response.responseText = JSON.stringify(result);
        response.response = JSON.stringify(result);
        response.end(JSON.stringify(result));
      });  
    } catch (e) {
      let result = {
        status: 500,
        data: e
      }
      response.end(JSON.stringify(result));
      return result;
    }
  } 
  else if (request.url == "/") {
    response.responseText = "Connection established";
    response.end("Connection established");
  }
  else {
    response.responseText = 'Request not configured';
    response.end("Request not configured");
  }

}).listen(3001);


const methods = {
  getAccountFile: function() {
    try {
      let text = fs.readFileSync(accountFilePath, { encoding: 'utf-8'});
      return {
        status: 200,
        data: text
      }
    } catch (e) {
      return {
        "code": 500,
        "data": "An error has occurred"
      }
    }
  },
  registerAccount: function(registerAccountObj) {
    let accounts =  methods.getAccountFile();
    if (registerAccountObj == null || registerAccountObj == undefined || registerAccountObj == [] || registerAccountObj == "" || registerAccountObj == {}) {
      return {
        status: 500,
        data: "registerAccountObj cannot be null"
      }
    } else {
      registerAccountObj = JSON.parse(registerAccountObj);
    }
    let newData = [];
    if (accounts.status == 200) {
      if (accounts.data == "" || accounts.data == "[]" || accounts.data == []) {
        newData.push(registerAccountObj);
      } else {
        let currentAccounts = JSON.parse(accounts.data);
        currentAccounts.push(registerAccountObj);
        newData = currentAccounts;
      }
    } else {
      newData.push(registerAccountObj);
    }
    if (newData != null || newData != undefined || newDate != [null]) {
      fs.writeFileSync(accountFilePath, JSON.stringify(newData));
      return {
        status: 200, 
        data: "Account added successfully"
      }
    } else {
      return {
        status: 500, 
        data: "An error occurred"
      }
    }
  },
  login: function(loginObj) {
    let accounts =  methods.getAccountFile();
    let result = {
      status: 200,
      data: {
        isAuthenticated: true,
        message: "Login successful",
        account: {}
      }
    }

    if (loginObj == null || loginObj == undefined || loginObj == [] || loginObj == "" || loginObj == {}) {
      result.data.isAuthenticated = false;
      result.data.message = "An error occurred. Object invalid";
      return result;
    } else {
      loginObj = JSON.parse(loginObj);
    }

    if (accounts.status == 200) {
      if (accounts.data == "" || accounts.data == "[]" || accounts.data == []) {
        result.data.isAuthenticated = false;
        result.data.message = "Unable to verify account information";
        return result;
      } else {
        let accountList = JSON.parse(accounts.data);
        let account = accountList.filter((acc) => acc.Email == loginObj.Email && acc.Password == loginObj.Password)[0];
        if (account == undefined) {
          result.data.isAuthenticated = false;
          result.data.message = "Your email or password is incorrect. Please try again.";
        } else {
          result.data.account = account;
        }
        return result;
      }
    }
  }
}
console.log('Server running at http://127.0.0.1:3001/');