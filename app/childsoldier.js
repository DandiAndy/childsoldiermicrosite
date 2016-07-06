var app = angular.module('ChildSoldier', ['ngSanitize', 'leaflet-directive'/*, 'ngMaterial', 'ngMessages'*/]);

    app.controller('MapCtrl', ['$scope', 'MapService', function($scope, MapService){
        //VARIABLES
        $scope.maps = null;
        $scope.currentMap = null;
        
        $scope.checkBoxValues = {
            murderMaimingFilter: true,
            recruitmentFilter: true,
            sexualViolenceFilter: true,
            attacksFilter: true,
            humanitarianDenialFilter: true,
            abductionFilter: true,
            otherFilter: true
        };

        var local_icons = {
            default_icon: {},
            murder_maiming: {
                iconUrl:    'assets/img/murder_maiming_marker.png',
                iconSize:   [38, 40],
                iconAnchor:   [22, 40], // point of the icon which will correspond to marker's location
                popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
            },
            recruitment: {
                iconUrl:    'assets/img/recruitment_marker.png',
                iconSize:   [38, 40],
                iconAnchor:   [22, 40], // point of the icon which will correspond to marker's location
                popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
            },
            sexual_violence: {
                iconUrl:    'assets/img/sexual_violence_marker.png',
                iconSize:   [38, 40],
                iconAnchor:   [22, 40], // point of the icon which will correspond to marker's location
                popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
            },
            attack: {
                iconUrl:    'assets/img/attack_marker.png',
                iconSize:   [38, 40],
                iconAnchor:   [22, 40], // point of the icon which will correspond to marker's location
                popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
            },
            hum_denial: {
                iconUrl:    'assets/img/hum_denial_marker.png',
                iconSize:   [38, 40],
                iconAnchor:   [22, 40], // point of the icon which will correspond to marker's location
                popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
            },
            abduction: {
                iconUrl:    'assets/img/abduction_marker.png',
                iconSize:   [38, 40],
                iconAnchor:   [22, 40], // point of the icon which will correspond to marker's location
                popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
            },
            other: {
                iconUrl:    'assets/img/other_marker.png',
                iconSize:   [38, 40],
                iconAnchor:   [22, 40], // point of the icon which will correspond to marker's location
                popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
            }

        };
        //SCOPE EXTENSION
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

            }

        });

        //FUNCTIONS
        //Sets the current map based on the country name passed in. The maps should be named by country.
        $scope.setCurrentMap = function(country){
            $scope.currentMap = $scope.maps[0];
            for(var i = 0; i <= $scope.maps.length; i++){
                if($scope.maps[i] != null && $scope.maps[i].title === country.name){
                    $scope.currentMap = $scope.maps[i];
                }
            }
            $scope.changeMarkerFilter();
            console.log(country);
        };

        //Changes the markers according to the current current filter.
        $scope.changeMarkerFilter = function() {
            //copy the points to a new object
            var allMarkers = jQuery.extend(true, {}, $scope.currentMap.points);
            //filter murders. If not checked, set allMarkers to all points not containing 'murder_maiming' as a title
            if (!$scope.checkBoxValues.murderMaimingFilter){
                allMarkers = _.filter(allMarkers, function (n) {
                    return n.title !== 'murder_maiming';
                });
            }
            //filters recruitment
            if (!$scope.checkBoxValues.recruitmentFilter) {
                allMarkers = _.filter(allMarkers, function (n) {
                    return n.title !== 'recruitment';
                });
            }
            //filters sexual violence
            if (!$scope.checkBoxValues.sexualViolenceFilter) {
                allMarkers = _.filter(allMarkers, function (n) {
                    return n.title !== 'sexual_violence';
                });
            }
            //filters attacks
            if (!$scope.checkBoxValues.attacksFilter) {
                allMarkers = _.filter(allMarkers, function (n) {
                    return n.title !== 'attack';
                });
            }
            //filters humanitarian denial
            if (!$scope.checkBoxValues.humanitarianDenialFilter) {
                allMarkers = _.filter(allMarkers, function (n) {
                    return n.title !== 'hum_denial';
                });
            }
            //filters abductions
            if (!$scope.checkBoxValues.abductionFilter) {
                allMarkers = _.filter(allMarkers, function (n) {
                    return n.title !== 'abduction';
                });
            }
            //appropriate each object to match what is needed for the leaflet map to work.
            $scope.markers = $scope.appropriateObject(allMarkers);
        };

        //Changes the objects from the given map to match leaflet marker requirements. We should consider changing he data in the db.
        $scope.appropriateObject = function(points) {
            console.log(points);
            for(var i = 0; i <= _.size(points); i++){
                //Remove non-leaflet map data and create the data needed.
                if(points[i] != null){
                    //grab necessary data
                    var description = points[i]["description"];
                    var title = points[i]["title"];

                    //change latlon to digits from string and change long to lng
                    points[i]["lat"] = parseFloat(points[i]["lat"]);
                    points[i]["lng"] = parseFloat(points[i]["long"]);

                    //add icon and message.
                    points[i]["icon"] = $scope.icons[title];
                    points[i]["message"] = description.toString();

                    //delete useless data
                    delete points[i]["long"];
                    delete points[i]["description"];
                    delete points[i]["map"];
                    delete points[i]["id"];
                    delete points[i]["map"];
                    delete points[i]["title"];

                    //name each marker to required name 'm' followed by integer.
                    var markerName = 'm' + (i+1);
                    points[markerName] = points[i];
                    delete points[i];
                }

            }
            console.log(points);
            return points;
        };

        $scope.$watch('checkBoxValues', function() {
            if($scope.currentMap != null)
                $scope.changeMarkerFilter();
        }, true);

        $scope.promiseMap = function(){
            MapService.getMap()
                .then(function(data) {
                    if (data != null){
                        $scope.maps = data;
                    }
            }, function(error){
                console.log('error', error)
            });
        };

        $scope.promiseMap();

    }]);


    app.factory('MapService', function ($http, $q){
        return {
            getMap: getMap
        };
        function getMap() {
            return $http.get('http://childsoldiers-api.herokuapp.com//maps/')
                .then(function (response) {
                //check if the response is what we need. If not return with error.
                if (typeof response.data === 'object') {
                    return response.data;
                } else {
                    return $q.reject(response.data);
                }
            }, function (response) {
                //error while connecting
                return $q.reject(response.data);
            });
        }
    });


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
        vm.legendVisible = false;

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
            vm.setLegendVisible(country  !== null);
        };

        vm.isCurrentReport = function(report){
            return vm.currentReport !== null && report.id === vm.currentReport.id;
        };

        vm.setCurrentReport = function(report) {
            vm.currentReport = report;
        };

        vm.setLegendVisible = function (visible) {
            vm.legendVisible = visible;
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

    app.controller('DateCtrl', function($scope) {
        $scope.startingDate = new Date();
        $scope.endingDate = new Date();


    });
