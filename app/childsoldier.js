var app = angular.module('ChildSoldier', ['ngSanitize', 'leaflet-directive', 'ngMaterial']);

    app.controller('MapCtrl', ['$scope', 'MapService', function($scope, MapService){

        //mm stands for map model
        var mm = this;

        //VARIABLES
        mm.maps = null;
        mm.currentMap = null;

        mm.checkBoxValues = {
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
        mm.startingDate = new Date();
        mm.endingDate = new Date();

        // Set beginning dates arbitrarily low/high.
        mm.startingDate.setDate("January 1, 1800");
        mm.endingDate.setDate("January 1, 2800");

        mm.startingDateChange = false;
        mm.endingDateChange = false;
        mm.showFilter = false;

        //SCOPE EXTENSION
        angular.extend(mm, {
            icons: local_icons
        });

        angular.extend(mm, {
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
        mm.filterHotspots = function(type){
            switch(type){
                case 1:
                    if(mm.checkBoxValues.murderMaimingFilter == true) {
                        mm.checkBoxValues.murderMaimingFilter = false;

                        angular.element("#hotspot_1").removeClass("btn btn-primary");
                        angular.element("#hotspot_1").addClass("btn btn-danger active");
                    }
                    else{
                        mm.checkBoxValues.murderMaimingFilter = true;

                        angular.element("#hotspot_1").removeClass("btn btn-danger active");
                        angular.element("#hotspot_1").addClass("btn btn-primary");
                    }

                    break;
                case 2:
                    if(mm.checkBoxValues.recruitmentFilter == true){
                        mm.checkBoxValues.recruitmentFilter = false;

                        angular.element("#hotspot_2").removeClass("btn btn-primary");
                        angular.element("#hotspot_2").addClass("btn btn-danger active");
                    }
                    else{
                        mm.checkBoxValues.recruitmentFilter = true;

                        angular.element("#hotspot_2").removeClass("btn btn-danger active");
                        angular.element("#hotspot_2").addClass("btn btn-primary");
                    }

                    break;
                case 3:
                    if(mm.checkBoxValues.sexualViolenceFilter == true){
                        mm.checkBoxValues.sexualViolenceFilter = false;

                        angular.element("#hotspot_3").removeClass("btn btn-primary");
                        angular.element("#hotspot_3").addClass("btn btn-danger active");
                    }
                    else{
                        mm.checkBoxValues.sexualViolenceFilter = true;

                        angular.element("#hotspot_3").removeClass("btn btn-danger active");
                        angular.element("#hotspot_3").addClass("btn btn-primary");
                    }

                    break;
                case 4:
                    if(mm.checkBoxValues.attacksFilter == true){
                        mm.checkBoxValues.attacksFilter = false;

                        angular.element("#hotspot_4").removeClass("btn btn-primary");
                        angular.element("#hotspot_4").addClass("btn btn-danger active");
                    }
                    else{
                        mm.checkBoxValues.attacksFilter = true;

                        angular.element("#hotspot_4").removeClass("btn btn-danger active");
                        angular.element("#hotspot_4").addClass("btn btn-primary");
                    }

                    break;
                case 5:
                    if(mm.checkBoxValues.humanitarianDenialFilter == true){
                        mm.checkBoxValues.humanitarianDenialFilter = false;

                        angular.element("#hotspot_5").removeClass("btn btn-primary");
                        angular.element("#hotspot_5").addClass("btn btn-danger active");
                    }
                    else{
                        mm.checkBoxValues.humanitarianDenialFilter = true;

                        angular.element("#hotspot_5").removeClass("btn btn-danger active");
                        angular.element("#hotspot_5").addClass("btn btn-primary");
                    }

                    break;
                case 6:
                    if(mm.checkBoxValues.abductionFilter == true){
                        mm.checkBoxValues.abductionFilter = false;

                        angular.element("#hotspot_6").removeClass("btn btn-primary");
                        angular.element("#hotspot_6").addClass("btn btn-danger active");
                    }
                    else{
                        mm.checkBoxValues.abductionFilter = true;

                        angular.element("#hotspot_6").removeClass("btn btn-danger active");
                        angular.element("#hotspot_6").addClass("btn btn-primary");
                    }

                    break;
                case 7:
                    if(mm.checkBoxValues.otherFilter == true){
                        mm.checkBoxValues.otherFilter = false;

                        angular.element("#hotspot_7").removeClass("btn btn-primary");
                        angular.element("#hotspot_7").addClass("btn btn-danger active");
                    }
                    else{
                        mm.checkBoxValues.otherFilter = true;

                        angular.element("#hotspot_7").removeClass("btn btn-danger active");
                        angular.element("#hotspot_7").addClass("btn btn-primary");
                    }

                    break;
            }
        };

        //Sets the current map based on the country name passed in. The maps should be named by country.
        mm.setCurrentMap = function(country){
            //Sets the current map to the first in the set.
            mm.currentMap = mm.maps[0];
            //Finds the first with the country name as it's map title.
            for(var i = 0; i <= mm.maps.length; i++){
                if(mm.maps[i] != null && mm.maps[i].title === country.name){
                    mm.currentMap = mm.maps[i];
                }
            }
            console.log(mm.country);
            //Changes the current country objects lat, lng and zoom.
            //The each need to be changed from strings to numbers and long attribute needs to be called "lng".
            mm.country["lat"] = parseFloat(mm.currentMap["lat"]);
            mm.country["lng"] = parseFloat(mm.currentMap["long"]);
            mm.country["zoom"] = parseInt(mm.currentMap["default_zoom"]);
            //Changes the Marker filter after the countries map has been selected.
            mm.changeMarkerFilter();
            console.log(country);
        };

        mm.switchFilterVisible = function(){
            mm.showFilter = !mm.showFilter;
        };

        // Clears the starting date on button press.
        mm.clearStartingDate = function() {
            // Set date to undefined, call filter, and display filter change message.
            mm.startingDate = undefined;
            mm.changeMarkerFilter();
            document.getElementById("startDateClearMessage").innerHTML = ("Start Date Filter Cleared on Map.");
        };

        // Clears the ending date on button press.
        mm.clearEndingDate = function() {
            // Set date to undefined, call filter, and display filter change message.
            mm.endingDate = undefined;
            mm.changeMarkerFilter();
            document.getElementById("endDateClearMessage").innerHTML = ("End Date Filter Cleared on Map.");
        };
        
        // Changes the markers according to the current current filter.
        mm.changeMarkerFilter = function() {
            
            // copy the points to a new object
            var allMarkers = jQuery.extend(true, {}, mm.currentMap.points);
            
            // filter marker types.
            if (!mm.checkBoxValues.murderMaimingFilter){
                allMarkers = _.filter(allMarkers, function (n) {
                    return n.title !== 'murder_maiming';
                });
            }
            // recruitment
            if (!mm.checkBoxValues.recruitmentFilter) {
                allMarkers = _.filter(allMarkers, function (n) {
                    return n.title !== 'recruitment';
                });
            }
            // sexual violence
            if (!mm.checkBoxValues.sexualViolenceFilter) {
                allMarkers = _.filter(allMarkers, function (n) {
                    return n.title !== 'sexual_violence';
                });
            }
            // attacks
            if (!mm.checkBoxValues.attacksFilter) {
                allMarkers = _.filter(allMarkers, function (n) {
                    return n.title !== 'attack';
                });
            }
            // humanitarian denial
            if (!mm.checkBoxValues.humanitarianDenialFilter) {
                allMarkers = _.filter(allMarkers, function (n) {
                    return n.title !== 'hum_denial';
                });
            }
            // abductions
            if (!mm.checkBoxValues.abductionFilter) {
                allMarkers = _.filter(allMarkers, function (n) {
                    return n.title !== 'abduction';
                });
            }

            // filters based on starting date value.
            if (mm.startingDateChange && mm.startingDate != undefined) {
                allMarkers = _.filter(allMarkers, function (n) {

                    // parsing of the date
                    var startDateComponents = n.date.split("-");
                    var startYear = parseInt(startDateComponents[0]);
                    var startMonth = parseInt(startDateComponents[1]);
                    var startDay = parseInt(startDateComponents[2]);

                    // check to see which filters are before the input date, and filter them out (return valid points)
                    if (mm.startingDate.getFullYear() < startYear) {
                        return n;
                    }
                    else if (mm.startingDate.getFullYear() == startYear && (mm.startingDate.getMonth() + 1) < startMonth) {
                        return n;
                    }
                    else if ((mm.startingDate.getMonth() + 1) == startMonth && mm.startingDate.getDate() <= startDay) {
                        return n;
                    }
                });
            }

            // filters based on ending date value.
            if (mm.endingDateChange && mm.endingDate != undefined) {
                allMarkers = _.filter(allMarkers, function (n) {

                    // parsing of the date
                    var endDateComponents = n.date.split("-");
                    var endYear = parseInt(endDateComponents[0]);
                    var endMonth = parseInt(endDateComponents[1]);
                    var endDay = parseInt(endDateComponents[2]);

                    // check to see which filters are after the input date, and filter them out (return valid points)
                    if (mm.endingDate.getFullYear() > endYear) {
                        return n;
                    }
                    else if (mm.endingDate.getFullYear() == endYear && (mm.endingDate.getMonth() + 1) > endMonth) {
                        return n;
                    }
                    else if ((mm.endingDate.getMonth() + 1) == endMonth && mm.endingDate.getDate() >= endDay) {
                        return n;
                    }
                });
            }

            //appropriate each object to match what is needed for the leaflet map to work.
            mm.markers = mm.appropriateObject(allMarkers);
        };

        //Changes the objects from the given map to match leaflet marker requirements.
        mm.appropriateObject = function(points) {
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
                    points[i]["icon"] = mm.icons[title];
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
        $scope.$watch('mm.checkBoxValues', function() {
            console.log("HELOO");
            if(mm.currentMap != null)
                mm.changeMarkerFilter();
        }, true);

        // Watches for changes in the Starting Date filter and updates the markers accordingly.
        $scope.$watch('startingInput.value', function(newVal) {

            // Checks for the value coming in to be an actual value.
            if (newVal != undefined) {
                console.log("HELLO");
                // If so, log the change, and clear the 'filter clear' message if a clear has been done recently.
                console.log('Change in Starting Date: ' + newVal);
                document.getElementById("startDateClearMessage").innerHTML = ("");

                // Set starting date to new date value, and set the date change flag to true for filter function.
                mm.startingDate = newVal;
                mm.startingDateChange = true;

                // Check for invalid date, if so display error message, or clear the error message if now valid.
                if (mm.endingDate != undefined) {
                    if (mm.startingDate.getFullYear() > mm.endingDate.getFullYear()) {
                        document.getElementById("errorMessage").innerHTML = ("Error: starting date is later than ending date.");
                    }
                    else if (mm.startingDate.getFullYear() == mm.endingDate.getFullYear() && (mm.startingDate.getMonth() + 1) > (mm.endingDate.getMonth() + 1)) {
                        document.getElementById("errorMessage").innerHTML = ("Error: starting date is later than ending date.");
                    }
                    else if ((mm.startingDate.getMonth() + 1) == (mm.endingDate.getMonth() + 1) && mm.startingDate.getDate() > mm.endingDate.getDate()) {
                        document.getElementById("errorMessage").innerHTML = ("Error: starting date is later than ending date.");
                    }
                    else {
                        document.getElementById("errorMessage").innerHTML = (" ");
                    }
                }

                // Call for the filtering function.
                mm.changeMarkerFilter();
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
                mm.endingDate = newVal;
                mm.endingDateChange = true;

                // Check for invalid date, if so display error message, or clear the error message if now valid.
                if (mm.startingDate != undefined) {
                    if (mm.startingDate.getFullYear() > mm.endingDate.getFullYear() && startingDate != null) {
                        document.getElementById("errorMessage").innerHTML = ("Error: starting date is later than ending date.");
                    }
                    else if (mm.startingDate.getFullYear() == mm.endingDate.getFullYear() && (mm.startingDate.getMonth() + 1) > (mm.endingDate.getMonth() + 1) && mm.startingDate != null) {
                        document.getElementById("errorMessage").innerHTML = ("Error: starting date is later than ending date.");
                    }
                    else if ((mm.startingDate.getMonth() + 1) == (mm.endingDate.getMonth() + 1) && mm.startingDate.getDate() > mm.endingDate.getDate() && mm.startingDate != null) {
                        document.getElementById("errorMessage").innerHTML = ("Error: starting date is later than ending date.");
                    }
                    else {
                        document.getElementById("errorMessage").innerHTML = (" ");
                    }
                }

                // Call the filtering function.
                mm.changeMarkerFilter();
            }
        });

        // Promise to ensure app loads properly.
        mm.promiseMap = function(){
            MapService.getMap()
                .then(function(data) {
                    if (data != null){
                        mm.maps = data;
                    }
            }, function(error){
                console.log('error', error)
            });
        };

        mm.promiseMap();

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

        //Checks current country.
        vm.isCurrentCountry = function(country){
            return vm.currentCountry !== null && country.id === vm.currentCountry.id;
        };

        //sets the current country to change the current report being shown and the current map being show.
        vm.setCurrentCountry = function(country){
            setTimeout(vm.triggerMapLoad, 75);
            vm.currentCountry = country;
            vm.currentReport = null;
            //set the map visibility whenever a country is selected, so that it can be refreshed.
            //Otherwise the map will be blank a blank without context.
            vm.setMapVisible(country !== null);
            vm.setLegendVisible(country  !== null);
        };

        //Loads map on resizing of the window.
        vm.triggerMapLoad = function() {
            window.dispatchEvent(new Event('resize'));
        };

        //Checks the current report.
        vm.isCurrentReport = function(report){
            return vm.currentReport !== null && report.id === vm.currentReport.id;
        };

        //Sets the current report.
        vm.setCurrentReport = function(report) {
            vm.currentReport = report;
        };

        //Sets the legend/filter visible.
        vm.setLegendVisible = function (visible) {
            vm.legendVisible = visible;
        };

        <!-- Retrieve information from API, update this path if neccesary in future -->
        // Consider putting this into a promise
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
