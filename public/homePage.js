'use strict'

const logoutBtn = new LogoutButton;
logoutBtn.action = function() {
	ApiConnector.logout(callback => {
		if (callback.success) {
			location.reload();
		}
	})
}

ApiConnector.current(callback => {
	if (callback.success) {
		ProfileWidget.showProfile(callback.data);
	}
})

const tableBody = new RatesBoard;

function currencyRates() {
	ApiConnector.getStocks(callback => {
		if (callback.success) {
			tableBody.clearTable();
			tableBody.fillTable(callback.data);
		} else {
			console.log("Ошибка получения данных о курсе валют")
		}
	})
}
currencyRates();
setInterval(currencyRates, 60000);

const addMoneyForm = new MoneyManager;
addMoneyForm.addMoneyCallback = function(data) {
	ApiConnector.addMoney(data, callback => {
		if (callback.success) {
			ProfileWidget.showProfile(callback.data);
			console.log("Баланс успешно пополнен");
		} else {
			errorMessageBlock.setMessage(false, callback.error);
		}
	})
}

const conversionMoneyForm = new MoneyManager;
conversionMoneyForm.conversionMoneyCallback = function(data) {
	ApiConnector.convertMoney(data, callback => {
		if (callback.success) {
			ProfileWidget.showProfile(callback.data);
			console.log("Конвертация выполнена");
		} else {
			errorMessageBlock.setMessage(false, callback.error);
		}
	})
}

const sendMoneyForm = new MoneyManager;
sendMoneyForm.sendMoneyCallback = function(data) {
	ApiConnector.transferMoney(data, callback => {
		if (callback.success) {
			ProfileWidget.showProfile(callback.data);
			console.log("Перевод выполнен");
		} else {
			errorMessageBlock.setMessage(false, callback.error);
		}
	})
}

const favoritesTableBody = new FavoritesWidget;
ApiConnector.getFavorites = function(callback) {
	if (callback.success) {
		favoritesTableBody.clearTable();
		favoritesTableBody.fillTable(callback.data);
		favoritesTableBody.updateUsersList(callback.data);
	} else {
		favoritesMessageBox.setMessage(false, callback.error);
	}
}

const addUserToFavoritesForm = new FavoritesWidget;
addUserToFavoritesForm.addUserCallback = function(data) {
	ApiConnector.addUserToFavorites(data, callback => {
		if (callback.success) {
			favoritesTableBody.clearTable();
			favoritesTableBody.fillTable(callback.data);
			favoritesTableBody.updateUsersList(callback.data);
		} else {
			favoritesMessageBox.setMessage(false, callback.error);
		}
	})
}
addUserToFavoritesForm.removeUserCallback = function(data) {
	ApiConnector.removeUserFromFavorites(data, callback => {
		if (callback.success) {
			favoritesTableBody.clearTable();
			favoritesTableBody.fillTable(callback.data);
			favoritesTableBody.updateUsersList(callback.data);
		} else {
			favoritesMessageBox.setMessage(false, callback.error);
		}
	})
}