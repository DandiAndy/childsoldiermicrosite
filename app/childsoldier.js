angular.module('ChildSoldier', ['ngSanitize'])

    .controller('MainCtrl', function ($scope, $http) {

        <!-- Retrieve information from API, update this path if neccesary in future -->
        $http.get('http://childsoldiers-api.herokuapp.com/countries/').success(function(data) {
            $scope.countries = data;
        });

        $http.get('http://childsoldiers-api.herokuapp.com/countryreports/').success(function(data) {
            $scope.reports = data;
        });

        $http.get('http://childsoldiers-api.herokuapp.com//sections/').success(function(data) {
            $scope.sections = data;
        });

        $scope.isCreating = false;
        $scope.isEditing = false;
        $scope.currentCountry = null;

        function isCurrentCountry(country) {
            return $scope.currentCountry !== null && country.id === $scope.currentCountry.id;
        }

        function setCurrentCountry(country) {
            $scope.currentCountry = country;
            $scope.currentReport = null;
        }

        $scope.isCurrentCountry = isCurrentCountry;
        $scope.setCurrentCountry = setCurrentCountry;

        $scope.currentReport = null;
        function isCurrentReport(report) {
            return $scope.currentReport !== null && report.id === $scope.currentReport.id;
        }

        function setCurrentReport(report) {
            $scope.currentReport = report;
        }

        $scope.isCurrentReport = isCurrentReport;
        $scope.setCurrentReport = setCurrentReport;

        $scope.openSections = [];
        function selectSection(section) {
            if ($scope.openSections.indexOf(section.id) == -1) {
                $scope.openSections.push(section.id);
            } else {
                $scope.openSections.pop(section.id);
            }
        }
        $scope.selectSection = selectSection;
    })
;