describe('SmsController', () => {
  beforeEach(angular.mock.module('SmsApp'));

  let $controller;
  let $rootScope;
  let httpLocalBackend;
  let $scope;
  let controller;
  beforeEach(inject((_$controller_, _$rootScope_) => {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
    $rootScope = _$rootScope_;
  }));
  beforeEach(inject(($httpBackend) => {
    httpLocalBackend = $httpBackend;
    $scope = $rootScope.$new();
    controller = $controller('SmsController', { $scope });
  }));

  describe('$scope.messagenumber', () => {
    it('Se o texto digitado no campo de números para mensagem conter caracteres'
    + ' diferentes de números ou _ deve retornar um error', () => {
      $scope.messagenumber = 'AAA';
      $scope.addNumber();
      expect($scope.error).toBe('Ops! Digite uma sequência de números');
      $scope.messagenumber = '#!114213';
      expect($scope.error).toBe('Ops! Digite uma sequência de números');
    });

    it('Se o texto digitado no campo de mensagem para números conter caracteres'
    + ' diferentes de letras deve retornar um erro', () => {
      $scope.messastring = '13123131';
      $scope.addString();
      expect($scope.error).toBe('Ops! Digite um texto válido');
      $scope.messagestring = '#!114213';
      expect($scope.error).toBe('Ops! Digite um texto válido');
    });
    it('Se o texto digitado no campo de mensagem para números for válido'
    + ' não deve retornar erro', () => {
      $scope.messagestring = 'TESTE DE MESA';
      $scope.addString();
      expect($scope.error).toBe('');
    });
    it('Se a sequência de números digitados no campo de números para mensagem'
    + ' for válida não deve retornar erro', () => {
      $scope.messagenumber = '123314012142214401414214';
      $scope.addNumber();
      expect($scope.error).toBe('');
    });
  });
});
