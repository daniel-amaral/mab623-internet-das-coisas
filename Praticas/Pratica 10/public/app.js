'use strict';

var app = angular.module('app', ['ngAnimate']);

app.controller('controller', ['$scope', '$http',  function($scope, $http){


	$scope.remoteCtrlClick = function(option){

		$http({
			method: 'PUT',
			data: {cmd: option},
			url: '/send-remote-control-cmd'
		}).then(function(response){
			console.log('comando ' + option + ' enviado!');
		}, function(response){
			console.error('Não é possível se conectar ao controle remoto!');
		})
	}

}]);