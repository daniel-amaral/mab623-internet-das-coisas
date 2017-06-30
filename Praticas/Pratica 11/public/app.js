'use strict';

var app = angular.module('app', ['ngAnimate', 'nvd3']);

app.controller('controller', ['$scope', '$http', '$interval', '$timeout',  function($scope, $http, $interval, $timeout){

	$scope.refreshMode = 'auto';

	// $scope.temperatureChart2 = {
	// 	options: {
	// 		chart: {
	// 		    type: 'lineChart',
	// 		    height: 150,
	// 		    margin : {
	// 		        top: 20,
	// 		        right: 20,
	// 		        bottom: 50,
	// 		        left: 55
	// 		    },
	// 		    x: function(d){return d.label;},
	// 		    y: function(d){return d.value;},
	// 		    showValues: true,
	// 		    valueFormat: function(d){
	// 		        return d3.format(',.2f')(d);
	// 		    },
	// 		    duration: 500,
	// 		    deepWatchOptions: true,
	// 		    deepWatchData: true,
	// 		    xAxis: {
	// 		        axisLabel: 'Amostras'
	// 		    },
	// 		    yAxis: {
	// 		        axisLabel: 'Temperatura °C',
	// 		        axisLabelDistance: 20
	// 		    },
	// 		    color: [
	// 		    	"#146386"
	// 		    ]
	// 		}
	// 	},
	// 	data: [
	// 		{
	// 		    key: "Temperatura",
	// 		    values: [],
	// 		    area: true
	// 	}]

	// };

	// $scope.pressureChart2 = {
	// 	options: {
	// 		chart: {
	// 		    type: 'lineChart',
	// 		    height: 150,
	// 		    margin : {
	// 		        top: 20,
	// 		        right: 20,
	// 		        bottom: 50,
	// 		        left: 55
	// 		    },
	// 		    x: function(d){return d.label;},
	// 		    y: function(d){return d.value;},
	// 		    showValues: true,
	// 		    valueFormat: function(d){
	// 		        return d3.format(',.2f')(d);
	// 		    },
	// 		    duration: 500,
	// 		    deepWatchOptions: true,
	// 		    deepWatchData: true,
	// 		    xAxis: {
	// 		        axisLabel: 'Amostras'
	// 		    },
	// 		    yAxis: {
	// 		        axisLabel: 'Pressão (kpa)',
	// 		        axisLabelDistance: 20
	// 		    },
	// 		    color: [
	// 		    	"#bd6905"
	// 		    ]
	// 		}
	// 	},
	// 	data: [
	// 		{
	// 		    key: "Pressão",
	// 		    values: [],
	// 		    area: true
	// 	}]
	// }


	$scope.temperatureChart = {
		options: {
			chart: {
			    type: 'discreteBarChart',
			    height: 150,
			    margin : {
			        top: 20,
			        right: 20,
			        bottom: 50,
			        left: 55
			    },
			    x: function(d){return d.label;},
			    y: function(d){return d.value;},
			    showValues: true,
			    valueFormat: function(d){
			        return d3.format(',.2f')(d);
			    },
			    duration: 750,
			    xAxis: {
			        axisLabel: 'Amostras'
			    },
			    yAxis: {
			        axisLabel: 'Temperatura °C',
			        axisLabelDistance: 10
			    },
			    color: [
			    	"#146386"
			    ]
			}
		},
		data: [
			{
			    key: "data1",
			    values: []
		}]

	};

	$scope.pressureChart = {
		options: {
			chart: {
			    type: 'discreteBarChart',
			    height: 150,
			    margin : {
			        top: 20,
			        right: 20,
			        bottom: 50,
			        left: 55
			    },
			    x: function(d){return d.label;},
			    y: function(d){return d.value;},
			    showValues: true,
			    valueFormat: function(d){
			        return d3.format(',.2f')(d);
			    },
			    duration: 750,
			    xAxis: {
			        axisLabel: 'Amostras'
			    },
			    yAxis: {
			        axisLabel: 'Pressão (kpa)',
			        axisLabelDistance: 10
			    },
			    color: [
			    	"#bd6905"
			    ]
			}
		},
		data: [
			{
			    key: "data2",
			    values: []
		}]
	}




	$timeout(function() {
		$scope.api.refresh();
		$scope.api2.refresh();
		// $scope.apiTemperature.refresh();
		// $scope.apiPressure.refresh();
	}, 500);


	$scope.refreshTempChart = function(){
		$http.get('/temperature-data-from-broker')
			.then(function(response){
				var message = response.data;
				// var localData = $scope.temperatureChart2.data[0].values;
				var originalData = $scope.temperatureChart.data[0].values;
				$scope.temperatureChart.data[0].values = insertData(originalData, message, 'temperature');
				$scope.api.refresh();
				// $scope.apiTemperature.refresh();
			})
	}

	$scope.refreshPressureChart = function(){
		$http.get('/pressure-data-from-broker')
			.then(function(response){
				var message = response.data;
				// var localData = $scope.pressureChart2.data[0].values;
				var originalData = $scope.pressureChart.data[0].values;
				$scope.pressureChart.data[0].values = insertData(originalData, message, 'pressure');
				$scope.api2.refresh();
				// $scope.apiPressure.refresh();
			})
	}

	var maxDataSize = 25;
	var temperatureLastSampleNumber = 0;
	var pressureLastSampleNumber = 0;

	var insertData = function(originalData, message, type){

		var actualSize;
		if (type === 'temperature'){
			actualSize = temperatureLastSampleNumber;
		} else {
			actualSize = pressureLastSampleNumber;
		}

		var localDataSize = originalData.length;
		if (localDataSize + message.length > maxDataSize){
			var tempData = angular.copy(originalData);
			for(var item of message){
				tempData.push({
					label: '' + ++actualSize,
					value: Number(item)
				})
			}
			tempData = tempData.slice(message.length, tempData.length);
			originalData = tempData;				
		} else {
			for(var item of message){
				originalData.push({
					label: '' + ++actualSize,
					value: Number(item)
				})
			}
		}

		if (type === 'temperature'){
			temperatureLastSampleNumber = actualSize;
		} else {
			pressureLastSampleNumber = actualSize;
		}
		return originalData;
	}

	var refreshIntervalInSecs = 4;

	$interval(function(){
		if($scope.refreshMode === 'auto'){
			$scope.refreshTempChart();
			$scope.refreshPressureChart();
		}
	}, refreshIntervalInSecs * 1000)

}]);