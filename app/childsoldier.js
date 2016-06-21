var app = angular.module('ChildSoldier', ['ngSanitize', 'leaflet-directive']);


    app.controller('MapCtrl', ["$scope", function($scope){
        var local_icons = {
            default_icon: {},
            killings_icon: {
                iconUrl:    'assets/img/killing_marker.png',
                iconSize:   [38, 95],
                iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
                popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
            },
            abductions_icon: {
                iconUrl:    'assets/img/abduction_marker.png',
                iconSize:   [38, 95],
                iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
                popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
            }

        };

        angular.extend($scope, {
            icons: local_icons
        });

        angular.extend($scope, {
            syria: {
                lat: 34.8021,
                lng: 38.9968,
                zoom: 7
            },
            markers: {
                m1: {
                    lat: 36.8021,
                    lng: 36.9968,
                    message: "I'm a static marker",
                    icon: local_icons.killings_icon
                },
                m2: {
                    lat: 35,
                    lng: 36,
                    message: "I'm a static marker",
                    icon: local_icons.killings_icon
                },
                m3: {
                    lat: 34,
                    lng: 39,
                    message: "I'm a static marker",
                    icon: local_icons.abductions_icon
                },
                m4: {
                    lat: 35.8021,
                    lng: 42.9968,
                    message: "I'm a static marker",
                    icon: local_icons.abductions_icon
                }

            }
        });
    }]);

    app.controller('MainCtrl', function ($scope, $timeout, $http) {


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
        vm.mapVisible = false;

        //SCOPE FUNCTIONS

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

        
    });
