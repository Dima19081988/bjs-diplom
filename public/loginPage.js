'use strict'

const userForm = new UserForm();
userForm.loginFormCallback = function(data) {
	console.log(data);
	ApiConnector.login(data, callback => {
		console.log(callback);
	if (callback.success) {
		location.reload();
	} else {
		userForm.setLoginErrorMessage(callback.error)
		}
	})
}
userForm.registerFormCallback = function(data) {
	console.log(data);
	ApiConnector.register(data, callback => {
		console.log(callback);
	if (callback.success) {
		location.reload();
	} else {
		userForm.setRegisterErrorMessage(callback.error)
		}
	})
}