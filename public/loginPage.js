'use strict'

const userForm = new UserForm();
userForm.loginFormCallback = function(data) {
    console.log(data);
    ApiConnector.login(data, (response) =>
    console.log(response));
    if (response.success) {
        location.reload();
    } else {
        userForm.setLoginErrorMessage(message)
    }
}
userForm.registerFormCallback = function (data) {
    console.log(data);
    ApiConnector.login(data, (response) => 
    console.log(response));
    if (response.success) {
        location.reload();
    } else {
        userForm.setRegisterErrorMessage(message)
    }
}


