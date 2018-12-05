angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
  function ($scope, Listings) {
    $scope.detailedInfo = undefined;
    $scope.profCourses = [];
    $scope.buildings = [];
    $scope.markers = [];
    $scope.courseCodeRegex = '[A-Z]{3}[0-9]{4}[A-Z]{0,1}'
    $scope.ta = undefined;
    $scope.startTimes = [{ time: '7:25AM' }, { time: '8:30AM' }, { time: '9:35AM' }, { time: '10:40AM' }, { time: '11:45AM' }, { time: '12:50PM' }, { time: '1:55PM' }, { time: '3:00PM' }, { time: '4:05PM' }, { time: '5:10PM' }, { time: '6:15PM' }, { time: '7:20PM' }, { time: '8:20PM' }, { time: '9:20PM' }],
      $scope.endTimes = [{ time: '8:15AM' }, { time: '9:20AM' }, { time: '10:25AM' }, { time: '11:30AM' }, { time: '12:35PM' }, { time: '1:40PM' }, { time: '2:45PM' }, { time: '3:50PM' }, { time: '4:55PM' }, { time: '6:00PM' }, { time: '7:05PM' }, { time: '8:10PM' }, { time: '9:10PM' }, { time: '10:10PM' }],

      $scope.getCourseNameFromCode = function (courseCode) {
        console.log("Trying to get course name...");
        if (courseCode.length != 7 || courseCode.length!=8) {
          $scope.courseName = "";
        } else {
          Listings.getCourseNameFromCode(courseCode).then(function (result) {
            $scope.courseName = result.data[0].COURSES[0].name;
            console.log(result.data[0].COURSES[0].name);
          });
        }
      }
    /* Get all the listings, then bind it to the scope */
    //TODO View Professors from Mongo DB on api/listings
    Listings.getAll().then(function (response) {
      $scope.listings = response.data;
    }, function (error) {
      console.log('Unable to retrieve listings:', error);
    });
    //Stores Variable for Current User Info, Role/Lastname/FirstName/etc.
    Listings.getUser().then(function (response) {

      $scope.user = response.data[0];



    }, function (error) {
      console.log('Unable to retrieve listings:', error);
    });

    Listings.getBuildings().then(function (response) {
      $scope.buildings = response.data;

    }, function (error) {
      console.log('Unable to retrieve listings:', error);
    });

    Listings.getClasses().then(function (response) {
      $scope.classes = response.data;

    }, function (error) {
      console.log('Unable to retrieve listings:', error);
    });
    //Creates a new professor with inputted user info
    $scope.addTA = function (tEmail, course) {
      Listings.findByEmail(tEmail).then(function (response) {
        var student = {
          "username": response.data[0].username,
          "firstname": response.data[0].firstname,
          "lastname": response.data[0].lastname,
          "password": response.data[0].password
        }


        if (student.role != 'TA') {//is always true because user isnt changed to ta
          var newTA = {
            "name": student.firstname + " " + student.lastname,
            "email": student.username,
            "role": 'TA',
            "password": student.password,
            "createdBy": [],
            "class": []
          }
          Listings.createProf(newTA).then(function(response){
            newTA.createdBy.push($scope.user.username);
            newTA.class.push(course);
            $scope.updateListing(newTA);
          });
        }
        else {

          newTA.createdBy.push($scope.user.username)
          newTA.classes.push(course)
          $scope.updateListing(newTA);

        }
        window.location.replace('/professor');
      }, function (error) {
        console.log('Unable to retrieve listings:', error);
      });
    };




    //TODO Add courses and their Meeting times into array to be used by prof object
    $scope.addCourse = function (courseCode, courseName, location, classType, mondayCheck, mondayStartTime, mondayEndTime, tuesdayCheck, tuesdayStartTime, tuesdayEndTime, wednesdayCheck, wednesdayStartTime, wednesdayEndTime, thursdayCheck, thursdayStartTime, thursdayEndTime, fridayCheck, fridayStartTime, fridayEndTime, listing,courseRoom) {

      var locationID;
      for (let i = 0; i < $scope.buildings.length; i++) {
        //console.log($scope.buildings[i].code);
        if ($scope.buildings[i].code == location) {
          locationID = $scope.buildings[i]._id;
          // console.log(locationID);
        }
      }
      var times = [];
      if (mondayCheck) {
        times.push('M ' + mondayStartTime.time + '-' + mondayEndTime.time);
        console.log(times);
      }
      if (tuesdayCheck) {
        times.push('T ' + tuesdayStartTime.time + '-' + tuesdayEndTime.time);
        console.log(times);

      }
      if (wednesdayCheck) {
        times.push('W ' + wednesdayStartTime.time + '-' + wednesdayEndTime.time);
        console.log(times);

      }
      if (thursdayCheck) {
        times.push('R ' + thursdayStartTime.time + '-' + thursdayEndTime.time);
        console.log(times);

      }
      if (fridayCheck) {
        times.push('F ' + fridayStartTime.time + '-' + fridayEndTime.time);
        console.log(times);

      }

      //console.log(courseRoom);

      var newCourse = {
        "code": courseCode,
        "name": courseName,
        "location": locationID,
        "room" : courseRoom,
        "time": times,
        "classType": classType,
      }
      console.log(newCourse)
      //  $scope.profCourses.push(newCourse);
      //Use Listings.update to apply changes to old professor
      Listings.createCourse(newCourse).then(function (response) {
        console.log(response)
        console.log(response.data)
        //$scope.user.classes.push(response.data) needs update User function
        listing.classes.push(response.data)
        $scope.newListing.classes = listing.classes;
        $scope.updateListing(listing);
      });
    }
    //Useless in liu of addMark
    //Adds marker to map given coordinates
    $scope.addMarker = function (buildingName, description) {
      for (let i = 0; i < $scope.buildings.length; i++) {
        if ($scope.buildings[i].code == buildingName) {
          var latitude = $scope.buildings[i].coordinates.latitude;
          var longitude = $scope.buildings[i].coordinates.longitude;
          var marker = L.marker([latitude, longitude]).addTo(mymap)
            .bindPopup(description);
        }
      }
    };
    //TODO JSON API to store all avaiable classes into an array
    $scope.signOut = function () {
      Listings.signOut();
      window.location.replace('/logout');
    }

  //TODO JSON API to store all avaiable classes into an array
  $scope.signOut = function(){
    Listings.signOut();
    window.location.replace('/logout');
    }

    $scope.deleteListing = function(index) {
       Listings.delete($scope.listings[index]._id);
    };

    //Gets class object given its id
    $scope.getClassByID = function(id){
      for(let i = 0; i < $scope.classes.length; i++){
        if ($scope.classes[i]._id == id){
          return $scope.classes[i];
        }
      }
    }
    $scope.getLocationByID = function(id){
      for(var i = 0; i < $scope.buildings.length; i++){
        if ($scope.buildings[i]._id == id){
          return $scope.buildings[i];
        }
      }
    }
    //Adds marker to map given coordinates
    $scope.addMark = function(id,description){
      for(let i = 0; i < $scope.buildings.length; i++){
        if($scope.buildings[i]._id == id){
          var latitude =$scope.buildings[i].coordinates.latitude;
          var longitude =$scope.buildings[i].coordinates.longitude;
          var marker = L.marker([latitude, longitude]).addTo(mymap).bindPopup(description).openPopup();
          $scope.markers.push(marker);
        }
      }
    };
    $scope.removeMarkers = function(){

      for(let i = 0; i < $scope.markers.length; i++){
        mymap.removeLayer($scope.markers[i]);
      }
    }
    $scope.selectProf = function(listing) {
      //mymap._layers.clearLayers();
      $scope.removeMarkers();
      for(let i = 0; i < listing.classes.length; i++){
          var course = $scope.getClassByID(listing.classes[i]);
          var location = $scope.getLocationByID(course.location);
          var description = course.code + " - " + course.classType +" - " +"Room: "+ course.room;
          $scope.addMark(location._id, description );
      }
    };




    $scope.canEdit = function (listing) {
      if($scope.user.username){
        var username = $scope.user.username;

      }
      if(username){
        $scope.isUser = username == listing.email;

      }
      return (username == listing.email);//is causing error

    };

    $scope.TaForm = false;
    $scope.editInfo = false;
    $scope.editSocial = false;
    $scope.editClicked = false;
    $scope.addCourseForm = false;
    $scope.newListing = {};

    $scope.updateListing = function (listing) {
      var index = $scope.listings.indexOf(listing);
      //console.log('index: ' + index);
      var id = $scope.listings[index];
      //console.log('id: ' + id);

      var list = {
        name: listing.name,
        role: listing.role,
        classes: listing.classes,
        twitter: $scope.newListing.twitter,
        slack: $scope.newListing.slack,
        linkedin: $scope.newListing.linkedin,
        email: listing.email,
        information: $scope.newListing.information,
        createdBy: listing.createdBy
      };

      //console.log('list.name: ' + list.name);

      if (!list.twitter) {
        list.twitter = listing.twitter;
      }
      if (!list.slack) {
        list.slack = listing.slack;
      }
      if (!list.linkedin) {
        list.linkedin = listing.linkedin;
      }
      if (!list.information) {
        list.information = listing.information;
      }


      // console.log('id' + id);
      listing.twitter = list.twitter,
        listing.slack = list.slack,
        listing.linkedin = list.linkedin,
        listing.information = list.information

      //$scope.listings.push($scope.newListing);
      //console.log(id);
      //console.log("list " + list);
      Listings.update(id._id, list);
      window.location.replace('/');
    };




  }
]);
