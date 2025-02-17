'use strict'

const loginForm = new UserForm();
loginForm.loginFormCallback = function(data) {
	console.log(data);
	ApiConnector.login(data, callback =>
		console.log(callback));
	if (callback.success) {
		location.reload();
	} else {
		loginForm.setLoginErrorMessage(message)
	}
}
const registerForm = new UserForm();
registerForm.registerFormCallback = function(data) {
	console.log(data);
	ApiConnector.register(data, callback =>
		console.log(callback));
	if (callback.success) {
		location.reload();
	} else {
		registerForm.setRegisterErrorMessage(message)
	}
}