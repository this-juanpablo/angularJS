(function () {
    var aplicacionMundial = angular.module('aplicacionMundial', []);

    aplicacionMundial.directive('toolbar', function () {
        return{
            restrict: 'E',
            templateUrl: 'partials/toolbar.html',
            controller: function () {
                this.tab = 1;
                this.selectTab = function (setTab) {
                    this.tab = setTab;
                };
                this.isSelected = function (tabParam) {
                    return this.tab === tabParam;
                };
            },
            controllerAs: 'toolbar'
        };
    });

    aplicacionMundial.directive('competitorInfo', function () {
        return{
            restrict: 'E',
            templateUrl: 'partials/competitor-info.html',
            controller: 'getCompetitors'
        };
    });
    aplicacionMundial.controller("getCompetitors", function ($http, $scope) {
        $http.get('http://localhost:8084/competitors/get').
                success(function (data, status, headers, config) {
                    $scope.competitors = data;
                }).
                error(function (data, status, headers, config) {
                    // log error
                });
    });

    aplicacionMundial.directive('competitorForm', function () {
        return{
            restrict: 'E',
            templateUrl: 'partials/competitor-form.html',
            controller: 'competitorCtrl'
        };
    });
    aplicacionMundial.controller("competitorCtrl", function ($http, $scope) {
        $scope.addCompetitor = function () {
//            console.log($scope.competitor);
            $http.post('http://localhost:8084/competitors/add',
                    JSON.stringify($scope.competitor)).success(function (data, headers) {
                $scope.competitor = {};
                $scope.toolbar.selectTab(2);
            });
        };
    });

    aplicacionMundial.directive('competitorLogin', function () {
        return{
            restrict: 'E',
            templateUrl: 'partials/competitor-login.html',
            controller: 'competitorLogin'
        };
    });
    aplicacionMundial.controller("competitorLogin", function ($http, $scope) {
        let setLogin = function (data) {
            $scope.info = data;
            console.log($scope)
        };
        $scope.loginCompetitor = function () {
            if ($scope.login && $scope.login.address && $scope.login.password) {
                $http.post('http://localhost:8084/competitors/login',
                        JSON.stringify($scope.login)).success(function (data, headers) {
                    if (data.status == false) {
                        alert(data.message);
                    } else {
                        setLogin(data);
                    }
                });
            }
        };
    });
})();

