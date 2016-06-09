var app = angular.module('ChildSoldier', ['ngSanitize', 'uiGmapgoogle-maps']);

    app.config(function(uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyAHBFelgsXR2n2QyoDQHcKbyXYLTM72d98',
            v: '3.25', //defaults to latest 3.X anyhow
            libraries: 'weather,geometry,visualization'
        });
    });

    app.controller('MainCtrl', function ($scope, $timeout, $http, uiGmapGoogleMapApi) {

        var vm = this; // 'view model'; controller

        //SCOPE VARIABLES
        //data retrieved from API
        vm.openSections = [];
        vm.countries = null;
        vm.reports = null;
        vm.sections = null;

        vm.isCreating = false;
        vm.isEditing = false;

        vm.currentCountry = null;
        vm.currentReport = null;

        //init myMap for control of map refresh and default position.
        vm.myMap = {};
        vm.mapVisible = false;
        vm.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };

        //SCOPE FUNCTIONS
        vm.refreshMap = function(){
            return vm.myMap.refresh();
        };

        vm.setMapVisible = function(visible){
            vm.mapVisible = visible;
        };

        vm.selectSection = function(section){
            if (vm.openSections.indexOf(section.id) == -1) {
                vm.openSections.push(section.id);
            } else {
                vm.openSections.pop(section.id);
            }
        };

        vm.isCurrentCountry = function(country){
            return vm.currentCountry !== null && country.id === vm.currentCountry.id;
        };

        vm.setCurrentCountry = function(country){
            vm.currentCountry = country;
            vm.currentReport = null;
            //set the map visibility whenever a country is selected, so that it can be refreshed.
            //Otherwise the map will be blank a blank without context.
            vm.setMapVisible(country !== null);
        };

        vm.isCurrentReport = function(report){
            return vm.currentReport !== null && report.id === vm.currentReport.id;
        };

        vm.setCurrentReport = function(report) {
            vm.currentReport = report;
        };

        <!--CONSIDER REFACTORING INTO A PROMISE. This could do to fail more gracefully -->
        <!-- Retrieve information from API, update this path if neccesary in future -->
        $http.get('http://childsoldiers-api.herokuapp.com/countries/').success(function(data) {
            vm.countries = data;
        });

        $http.get('http://childsoldiers-api.herokuapp.com/countryreports/').success(function(data) {
            vm.reports = data;
        });

        $http.get('http://childsoldiers-api.herokuapp.com//sections/').success(function(data) {
            vm.sections = data;
        });

        //The google API may need future promises:
        //uiGmapGoogleMapApi.then(function(map) {

        //});

        // A watch that makes sure that the map is updated when open.
        // Otherwise there will be a grey box instead of a map.
        $scope.$watch('vm.mapVisible', function(newVal, oldVal){
           if(newVal === true && newVal !== oldVal) {
                $timeout(function(){
                    vm.refreshMap(vm.map.center);
                }, 300);
           }
        });

        
    });
