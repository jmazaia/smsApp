// eslint-disable-next-line no-undef
const SmsApp = angular.module('SmsApp', ['ngRoute']);

SmsApp.config(['$routeProvider', ($routeProvider) => {
  $routeProvider
    .when('/home', {
      templateUrl: 'views/home.html',
      controller: 'SmsController',
    })
    .when('/directory', {
      templateUrl: 'views/directory.html',
      controller: 'SmsController',
    }).otherwise({
      redirectTo: 'home',
    });
}]);

SmsApp.config(['$locationProvider', ($locationProvider) => {
  $locationProvider.hashPrefix('');
}]);


SmsApp.controller('SmsController', ['$scope', '$http',
  function SmsAppController($scope, $http) {
    $scope.addNumber = () => {
      $scope.error = '';
      const r = /[0-9_]/;
      if (r.test($scope.messagenumber) === false) {
        $scope.error = 'Ops! Digite uma sequência de números';
      } else {
        $http.post('https://gswdesafio.herokuapp.com/messagenumber',
          `{"message":"${$scope.messagenumber}"}`)
          .then((res) => {
            $scope.stringReturn = res.data.message;
          });
      }
    };

    $scope.addString = () => {
      $scope.error = '';
      const r = /^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF  +]+$/;
      if (r.test($scope.messagestring) === false) {
        $scope.error = 'Ops! Digite um texto válido';
      } else {
        $http.post('https://gswdesafio.herokuapp.com/messagestring',
          `{"message":"${$scope.messagestring}"}`)
          .then((res) => {
            $scope.numberReturn = res.data.message;
          });
      }
    };
    $scope.messages = [];
    $http.get('https://gswdesafio.herokuapp.com/messages').then((res) => {
      $scope.messages = res.data;
    }).catch((err) => {
      if (err.status === 404) {
        $scope.error = 'Não foi possível encontrar a lista de mensagens';
      }
      $scope.error = 'Erro inesperado';
    });
  }]);
