var conversor = angular.module('conversorModel', []);

conversor.controller('conversor-box',[ '$scope', function ($scope) {
    $scope.moneyIn = "";
    $scope.origen = "";
    $scope.destino = "";

    $scope.valorOrigen = [
        {
            value: "1",
            label: "EUR"
        },
        {
            value: "1.20",
            label: "USD"
        },
        {
            value: "0.71",
            label: "GBP"
        },
    ];
    //$scope.origen = $scope.valorOrigen[0].value;

    $scope.valorDestino = [

        {
            value: "1",
            label: "EUR"
        },
        {
            value: "1.20",
            label: "USD"
        },
        {
            value: "0.71",
            label: "GBP"
        },
    ];
    //$scope.destino = $scope.valorDestino[0].value;

}]);