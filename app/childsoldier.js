var app = angular.module('ChildSoldier', ['ngSanitize', 'leaflet-directive', 'ngMaterial']);

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

        // Date Variables/Flags
        $scope.startingDate = new Date();
        $scope.endingDate = new Date();

        // Set beginnging dates arbitrarily low/high.
        $scope.startingDate.setDate("January 1, 1800");
        $scope.endingDate.setDate("January 1, 2800");

        $scope.startingDateChange = false;
        $scope.endingDateChange = false;
        $scope.showFilter = false;

        //SCOPE EXTENSION
        angular.extend($scope, {
            icons: local_icons
        });

        angular.extend($scope, {
            country: {
                lat: 34.8021,
                lng: 38.9968,
                zoom: 7
            },
            markers: {

            }

        });

        //FUNCTIONS

        //Filter hotspots performs a switch statement which ultimately just changes the button from not pressed to pressed.
        //This could probably be made smaller.
        $scope.filterHotspots = function(type){
            switch(type){
                case 1:
                    if($scope.checkBoxValues.murderMaimingFilter == true) {
                        $scope.checkBoxValues.murderMaimingFilter = false;

                        angular.element("#hotspot_1").removeClass("btn btn-primary");
                        angular.element("#hotspot_1").addClass("btn btn-danger active");
                    }
                    else{
                        $scope.checkBoxValues.murderMaimingFilter = true;

                        angular.element("#hotspot_1").removeClass("btn btn-danger active");
                        angular.element("#hotspot_1").addClass("btn btn-primary");
                    }

                    break;
                case 2:
                    if($scope.checkBoxValues.recruitmentFilter == true){
                        $scope.checkBoxValues.recruitmentFilter = false;

                        angular.element("#hotspot_2").removeClass("btn btn-primary");
                        angular.element("#hotspot_2").addClass("btn btn-danger active");
                    }
                    else{
                        $scope.checkBoxValues.recruitmentFilter = true;

                        angular.element("#hotspot_2").removeClass("btn btn-danger active");
                        angular.element("#hotspot_2").addClass("btn btn-primary");
                    }

                    break;
                case 3:
                    if($scope.checkBoxValues.sexualViolenceFilter == true){
                        $scope.checkBoxValues.sexualViolenceFilter = false;

                        angular.element("#hotspot_3").removeClass("btn btn-primary");
                        angular.element("#hotspot_3").addClass("btn btn-danger active");
                    }
                    else{
                        $scope.checkBoxValues.sexualViolenceFilter = true;

                        angular.element("#hotspot_3").removeClass("btn btn-danger active");
                        angular.element("#hotspot_3").addClass("btn btn-primary");
                    }

                    break;
                case 4:
                    if($scope.checkBoxValues.attacksFilter == true){
                        $scope.checkBoxValues.attacksFilter = false;

                        angular.element("#hotspot_4").removeClass("btn btn-primary");
                        angular.element("#hotspot_4").addClass("btn btn-danger active");
                    }
                    else{
                        $scope.checkBoxValues.attacksFilter = true;

                        angular.element("#hotspot_4").removeClass("btn btn-danger active");
                        angular.element("#hotspot_4").addClass("btn btn-primary");
                    }

                    break;
                case 5:
                    if($scope.checkBoxValues.humanitarianDenialFilter == true){
                        $scope.checkBoxValues.humanitarianDenialFilter = false;

                        angular.element("#hotspot_5").removeClass("btn btn-primary");
                        angular.element("#hotspot_5").addClass("btn btn-danger active");
                    }
                    else{
                        $scope.checkBoxValues.humanitarianDenialFilter = true;

                        angular.element("#hotspot_5").removeClass("btn btn-danger active");
                        angular.element("#hotspot_5").addClass("btn btn-primary");
                    }

                    break;
                case 6:
                    if($scope.checkBoxValues.abductionFilter == true){
                        $scope.checkBoxValues.abductionFilter = false;

                        angular.element("#hotspot_6").removeClass("btn btn-primary");
                        angular.element("#hotspot_6").addClass("btn btn-danger active");
                    }
                    else{
                        $scope.checkBoxValues.abductionFilter = true;

                        angular.element("#hotspot_6").removeClass("btn btn-danger active");
                        angular.element("#hotspot_6").addClass("btn btn-primary");
                    }

                    break;
                case 7:
                    if($scope.checkBoxValues.otherFilter == true){
                        $scope.checkBoxValues.otherFilter = false;

                        angular.element("#hotspot_7").removeClass("btn btn-primary");
                        angular.element("#hotspot_7").addClass("btn btn-danger active");
                    }
                    else{
                        $scope.checkBoxValues.otherFilter = true;

                        angular.element("#hotspot_7").removeClass("btn btn-danger active");
                        angular.element("#hotspot_7").addClass("btn btn-primary");
                    }

                    break;
            }
        };

        //Sets the current map based on the country name passed in. The maps should be named by country.
        $scope.setCurrentMap = function(country){
            $scope.currentMap = $scope.maps[0];
            for(var i = 0; i <= $scope.maps.length; i++){
                if($scope.maps[i] != null && $scope.maps[i].title === country.name){
                    $scope.currentMap = $scope.maps[i];
                }
            }
            console.log($scope.country);
            $scope.country["lat"] = parseFloat($scope.currentMap["lat"]);
            $scope.country["lng"] = parseFloat($scope.currentMap["long"]);
            $scope.country["zoom"] = parseInt($scope.currentMap["default_zoom"]);
            $scope.changeMarkerFilter();
            console.log(country);
        };

        $scope.switchFilterVisible = function(){
            $scope.showFilter = !$scope.showFilter;
        };

        // Watches for changes in the Starting Date filter and updates the markers accordingly.
        $scope.$watch('startingInput.value', function(newVal) {
            
            // Checks for the value coming in to be an actual value.
            if (newVal != undefined) {
                
                // If so, log the change, and clear the 'filter clear' message if a clear has been done recently.
                console.log('Change in Starting Date: ' + newVal);
                document.getElementById("startDateClearMessage").innerHTML = ("");
                
                // Set starting date to new date value, and set the date change flag to true for filter function. 
                $scope.startingDate = newVal;
                $scope.startingDateChange = true;
                
                // Check for invalid date, if so display error message, or clear the error message if now valid.
                if ($scope.endingDate != undefined) {
                    if ($scope.startingDate.getFullYear() > $scope.endingDate.getFullYear()) {
                        document.getElementById("errorMessage").innerHTML = ("Error: starting date is later than ending date.");
                    }
                    else if ($scope.startingDate.getFullYear() == $scope.endingDate.getFullYear() && ($scope.startingDate.getMonth() + 1) > ($scope.endingDate.getMonth() + 1)) {
                        document.getElementById("errorMessage").innerHTML = ("Error: starting date is later than ending date.");
                    }
                    else if (($scope.startingDate.getMonth() + 1) == ($scope.endingDate.getMonth() + 1) && $scope.startingDate.getDate() > $scope.endingDate.getDate()) {
                        document.getElementById("errorMessage").innerHTML = ("Error: starting date is later than ending date.");
                    }
                    else {
                        document.getElementById("errorMessage").innerHTML = (" ");
                    }
                }
                
                // Call for the filtering function.
                $scope.changeMarkerFilter();
            }
        });

        // Watches for changes in the Ending Date filter and updates the markers accourdingly.
        $scope.$watch('endingInput.value', function(newVal) {
            
            // Checks for the value coming in to be an actual value.
            if (newVal != undefined) {
                
                // If so, log the change, and clear the 'filter clear' message if a clear has been done recently.
                console.log('Change in Ending Date: ' + newVal);
                document.getElementById("endDateClearMessage").innerHTML = ("");
                
                // Set starting date to new date value, and set the date change flag to true for filter function.
                $scope.endingDate = newVal;
                $scope.endingDateChange = true;
                
                // Check for invalid date, if so display error message, or clear the error message if now valid.
                if ($scope.startingDate != undefined) {
                    if ($scope.startingDate.getFullYear() > $scope.endingDate.getFullYear() && startingDate != null) {
                        document.getElementById("errorMessage").innerHTML = ("Error: starting date is later than ending date.");
                    }
                    else if ($scope.startingDate.getFullYear() == $scope.endingDate.getFullYear() && ($scope.startingDate.getMonth() + 1) > ($scope.endingDate.getMonth() + 1) && $scope.startingDate != null) {
                        document.getElementById("errorMessage").innerHTML = ("Error: starting date is later than ending date.");
                    }
                    else if (($scope.startingDate.getMonth() + 1) == ($scope.endingDate.getMonth() + 1) && $scope.startingDate.getDate() > $scope.endingDate.getDate() && $scope.startingDate != null) {
                        document.getElementById("errorMessage").innerHTML = ("Error: starting date is later than ending date.");
                    }
                    else {
                        document.getElementById("errorMessage").innerHTML = (" ");
                    }
                }
                
                // Call the filtering function.
                $scope.changeMarkerFilter();
            }
        });

        // Clears the starting date on button press.
        $scope.clearStartingDate = function() {
            // Set date to undefined, call filter, and display filter change message.
            $scope.startingDate = undefined;
            $scope.changeMarkerFilter();
            document.getElementById("startDateClearMessage").innerHTML = ("Start Date Filter Cleared on Map.");
        };

        // Clears the ending date on button press.
        $scope.clearEndingDate = function() {
            // Set date to undefined, call filter, and display filter change message.
            $scope.endingDate = undefined;
            $scope.changeMarkerFilter();
            document.getElementById("endDateClearMessage").innerHTML = ("End Date Filter Cleared on Map.");
        };
        
        // Changes the markers according to the current current filter.
        $scope.changeMarkerFilter = function() {
            
            // copy the points to a new object
            var allMarkers = jQuery.extend(true, {}, $scope.currentMap.points);
            
            // filter marker types.
            if (!$scope.checkBoxValues.murderMaimingFilter){
                allMarkers = _.filter(allMarkers, function (n) {
                    return n.title !== 'murder_maiming';
                });
            }
            // recruitment
            if (!$scope.checkBoxValues.recruitmentFilter) {
                allMarkers = _.filter(allMarkers, function (n) {
                    return n.title !== 'recruitment';
                });
            }
            // sexual violence
            if (!$scope.checkBoxValues.sexualViolenceFilter) {
                allMarkers = _.filter(allMarkers, function (n) {
                    return n.title !== 'sexual_violence';
                });
            }
            // attacks
            if (!$scope.checkBoxValues.attacksFilter) {
                allMarkers = _.filter(allMarkers, function (n) {
                    return n.title !== 'attack';
                });
            }
            // humanitarian denial
            if (!$scope.checkBoxValues.humanitarianDenialFilter) {
                allMarkers = _.filter(allMarkers, function (n) {
                    return n.title !== 'hum_denial';
                });
            }
            // abductions
            if (!$scope.checkBoxValues.abductionFilter) {
                allMarkers = _.filter(allMarkers, function (n) {
                    return n.title !== 'abduction';
                });
            }

            // filters based on starting date value.
            if ($scope.startingDateChange && $scope.startingDate != undefined) {
                allMarkers = _.filter(allMarkers, function (n) {

                    // parsing of the date
                    var startDateComponents = n.date.split("-");
                    var startYear = parseInt(startDateComponents[0]);
                    var startMonth = parseInt(startDateComponents[1]);
                    var startDay = parseInt(startDateComponents[2]);

                    // check to see which filters are before the input date, and filter them out (return valid points)
                    if ($scope.startingDate.getFullYear() < startYear) {
                        return n;
                    }
                    else if ($scope.startingDate.getFullYear() == startYear && ($scope.startingDate.getMonth() + 1) < startMonth) {
                        return n;
                    }
                    else if (($scope.startingDate.getMonth() + 1) == startMonth && $scope.startingDate.getDate() <= startDay) {
                        return n;
                    }
                });
            }

            // filters based on ending date value.
            if ($scope.endingDateChange && $scope.endingDate != undefined) {
                allMarkers = _.filter(allMarkers, function (n) {

                    // parsing of the date
                    var endDateComponents = n.date.split("-");
                    var endYear = parseInt(endDateComponents[0]);
                    var endMonth = parseInt(endDateComponents[1]);
                    var endDay = parseInt(endDateComponents[2]);

                    // check to see which filters are after the input date, and filter them out (return valid points)
                    if ($scope.endingDate.getFullYear() > endYear) {
                        return n;
                    }
                    else if ($scope.endingDate.getFullYear() == endYear && ($scope.endingDate.getMonth() + 1) > endMonth) {
                        return n;
                    }
                    else if (($scope.endingDate.getMonth() + 1) == endMonth && $scope.endingDate.getDate() >= endDay) {
                        return n;
                    }
                });
            }

            //appropriate each object to match what is needed for the leaflet map to work.
            $scope.markers = $scope.appropriateObject(allMarkers);
        };

        //Changes the objects from the given map to match leaflet marker requirements.
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

        // Watch for changes in filter by type.
        $scope.$watch('checkBoxValues', function() {
            if($scope.currentMap != null)
                $scope.changeMarkerFilter();
        }, true);

        // Promise to ensure app loads properly.
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
        vm.mainPage = true;
        vm.reportExtended = false;

        //scrollable style
        vm.reportPanel = {
            "height": "100vh",
            "width": "50%",
            "position": "inherit",
            "padding-left": "10px",
            "padding-right": "0px",
            "z-index" : "1000"
        };

        //SCOPE FUNCTIONS
        // changes the size of the map to show and hide the map.
        vm.changeReportSize = function(){
            vm.reportExtended = !vm.reportExtended;
            if(vm.reportExtended){
                vm.reportPanel.width = "100%";
            }else{
                vm.reportPanel.width = "50%";
            }
        };

        //A change background function used to switch backgrounds between homepage and tabs.
        vm.changeBackground = function(section){
            if(section=="home"){
                vm.mainPage = true;
                //Be sure to clear all prior classes. There is one class built into angular on the body tag that needs to stay, so you can't remove all.
                if(angular.element("#homepage").hasClass("tab-background"))
                    angular.element("#homepage").removeClass("tab-background");
                angular.element("#homepage").addClass("homepage");
            } else if(section=="tab") {
                vm.mainPage = false;
                if(angular.element("#homepage").hasClass("homepage"))
                    angular.element("#homepage").removeClass("homepage");
                angular.element("#homepage").addClass("tab-background");
            }
        };

        //Functions for switching between country tabs
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
            setTimeout(vm.triggerMapLoad, 75);
            vm.currentCountry = country;
            vm.currentReport = null;
            //set the map visibility whenever a country is selected, so that it can be refreshed.
            //Otherwise the map will be blank a blank without context.
            vm.setMapVisible(country !== null);
            vm.setLegendVisible(country  !== null);
        };

        vm.triggerMapLoad = function(country) {
            window.dispatchEvent(new Event('resize'));
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
