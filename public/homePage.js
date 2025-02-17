'use strict'

const logoutBtn = new LogoutButton;
logoutBtn.action = function() {
	ApiConnector.logout(callback => {
		console.log(callback);
		if (callback.success) {
			location.reload();
		}
	})
}

ApiConnector.current(callback => {
	if (callback.success) {
		ProfileWidget.showProfile(data);
	}
})

const tableBody = new RatesBoard;

function currencyRates() {
	ApiConnector.getStocks = function(callback) {
		if (callback.success) {
			tableBody.clearTable();
			tableBody.fillTable(data);
		} else {
			console.log("Ошибка получения данных о курсе валют")
		}
	}
}
currencyRates();
setInterval(currencyRates, 60000);

const addMoneyForm = new MoneyManager;
addMoneyForm.addMoneyCallback = function(data) {
	ApiConnector.addMoney(data, callback => {
		console.log(data);
		if (callback.success) {
			showProfile(data);
			console.log("Баланс успешно пополнен");
		} else {
			errorMessageBlock.setMessage(isSuccess, message);
		}
	})
}

const conversionMoneyForm = new MoneyManager;
conversionMoneyForm.conversionMoneyCallback = function(data) {
	ApiConnector.convertMoney(data, callback => {
		console.log(data);
		if (callback.success) {
			showProfile(data);
			console.log("Конвертация выполнена");
		} else {
			errorMessageBlock.setMessage(isSuccess, message);
		}
	})
}

const sendMoneyForm = new MoneyManager;
sendMoneyForm.sendMoneyCallback = function(data) {
	ApiConnector.transferMoney(data, callback => {
		console.log(data);
		if (callback.success) {
			showProfile(data);
			console.log("Перевод выполнен");
		} else {
			errorMessageBlock.setMessage(isSuccess, message);
		}
	})
}

const favoritesTableBody = new FavoritesWidget;
ApiConnector.getFavorites = function(callback) {
	if (callback.success) {
		favoritesTableBody.clearTable();
		favoritesTableBody.fillTable(data);
		favoritesTableBody.updateUsersList(data);
	} else {
		favoritesMessageBox.setMessage(isSuccess, message);
	}
}

const addUserToFavoritesForm = new FavoritesWidget;
addUserToFavoritesForm.addUserCallback = function(data) {
	ApiConnector.addUserToFavorites(data, callback => {
		if (callback.success) {
			favoritesTableBody.clearTable();
			favoritesTableBody.fillTable(data);
			favoritesTableBody.updateUsersList(data);
		} else {
			favoritesMessageBox.setMessage(isSuccess, message);
		}
	})
}
addUserToFavoritesForm.removeUserCallback = function(data) {
	ApiConnector.removeUserFromFavorites(data, callback => {
		if (callback.success) {
			favoritesTableBody.clearTable();
			favoritesTableBody.fillTable(data);
			favoritesTableBody.updateUsersList(data);
		} else {
			favoritesMessageBox.setMessage(isSuccess, message);
		}
	})
}