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

const myManager = new MoneyManager;
myManager.addMoneyCallback = function(data) {
	ApiConnector.addMoney(data, callback => {
		if (callback.success) {
			ProfileWidget.showProfile(callback.data);
			console.log("Баланс успешно пополнен");
			myManager.setMessage(true, "Баланс успешно пополнен");
		} else {
			myManager.setMessage(false, callback.error);
		}
	})
}

myManager.conversionMoneyCallback = function(data) {
	ApiConnector.convertMoney(data, callback => {
		if (callback.success) {
			ProfileWidget.showProfile(callback.data);
			console.log("Конвертация выполнена");
			myManager.setMessage(true, "Конвертация выполнена");
		} else {
			myManager.setMessage(false, callback.error);
		}
	})
}

myManager.sendMoneyCallback = function(data) {
	ApiConnector.transferMoney(data, callback => {
		if (callback.success) {
			ProfileWidget.showProfile(callback.data);
			console.log("Перевод выполнен");
			myManager.setMessage(true, "Перевод выполнен");
		} else {
			myManager.setMessage(false, callback.error);
		}
	})
}

const myFavorites = new FavoritesWidget;
ApiConnector.getFavorites((callback) => {
	if (callback.success) {
		myFavorites.clearTable();
		myFavorites.fillTable(callback.data);
		myFavorites.updateUsersList(callback.data);
	} else {
		myFavorites.setMessage(false, callback.error);
	}
});

myFavorites.addUserCallback = function(data) {
	ApiConnector.addUserToFavorites(data, callback => {
		if (callback.success) {
			myFavorites.clearTable();
			myFavorites.fillTable(callback.data);
			myFavorites.updateUsersList(callback.data);
			myFavorites.setMessage(true, "Пользователь добавлен в избранное");
		} else {
			myFavorites.setMessage(false, callback.error);
		}
	})
}

myFavorites.removeUserCallback = function(data) {
	ApiConnector.removeUserFromFavorites(data, callback => {
		if (callback.success) {
			myFavorites.clearTable();
			myFavorites.fillTable(callback.data);
			myFavorites.updateUsersList(callback.data);
			myFavorites.setMessage(true, "Пользователь удалён из избранного");
		} else {
			myFavorites.setMessage(false, callback.error);
		}
	})
}