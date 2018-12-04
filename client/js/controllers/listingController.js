angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
  function($scope, Listings) {
    $scope.detailedInfo = undefined;
    $scope.profCourses = [];
    $scope.buildings = [];
    $scope.ta = undefined;
    $scope.getCourseNameFromCode = function(courseCode){
      console.log("Trying to get course name...");
      if(courseCode.length != 7){
        $scope.courseName="";
      }else{
        Listings.getCourseNameFromCode(courseCode).then(function(result) {
          $scope.courseName=result.data[0].COURSES[0].name;
          console.log(result.data[0].COURSES[0].name);
        });
      }
    }
    /* Get all the listings, then bind it to the scope */
    //TODO View Professors from Mongo DB on api/listings
    Listings.getAll().then(function(response) {
      $scope.listings = response.data;
    }, function(error) {
      console.log('Unable to retrieve listings:', error);
    });

    Listings.getAllUsers().then(function(response) {
      $scope.users = response.data;
    }, function(error) {
      console.log('Unable to retrieve listings:', error);
    });
//Stores Variable for Current User Info, Role/Lastname/FirstName/etc.
    Listings.getUser().then(function(response) {

      $scope.user = response.data[0];



    },function(error) {
      console.log('Unable to retrieve listings:', error);
    });

    Listings.getBuildings().then(function(response) {
      $scope.buildings = response.data;

    },function(error) {
      console.log('Unable to retrieve listings:', error);
    });

    Listings.getClasses().then(function(response) {
      $scope.classes = response.data;

    },function(error) {
      console.log('Unable to retrieve listings:', error);
    });

//Creates a new professor with inputted user info
    $scope.addTA = function(tEmail, course) {
      console.log($scope.user);
      console.log("test");
      Listings.findByEmail(tEmail).then(function(response) {
       var student = response.data[0];
       console.log(student);//student is a user



        if (student.role != 'TA'){//is always true because user isnt changed to ta
          var newTA = {
            "name": student.firstname + "-" + student.lastname,
            "email": student.username,
            "role": 'TA',
            "email": student.username,
            "classes": [],
            "createdBy": [],
            "twitter": null,
            "slack": null,
            "linkedin": null,
            "information": null

          }
          console.log(newTA);
          Listings.createProf(newTA).then(function(response){

            var theTA = response.data;
            theTA.createdBy.push($scope.user.username);
            //theTA.class.push(course);

            Listings.update(theTA._id, theTA);
            student.role = 'TA';
            $scope.updateUser(student);
          });
        }
        else{
          console.log('im in else');
          console.log(tEmail);
          Listings.findListingByEmail(tEmail).then(function(response) {//isnt working!!!!!!!!!!!!!!!!!!!!!!!
            var student = response.data[0];
            console.log(response.data);
            //student.createdBy.push($scope.user.username)
            //student.classes.push(course)
            //Listings.update(student._id, student);

          },function(error) {
            console.log('Unable to retrieve listings:', error);
          });

      }
      //window.location.replace('/professor');
    },function(error) {
      console.log('Unable to retrieve listings:', error);
    });
    };




  //TODO Add courses and their Meeting times into array to be used by prof object
    $scope.addCourse = function(courseCode,courseName,location,classType,mondayCheck,mondayStartTime,mondayEndTime,tuesdayCheck,tuesdayStartTime,tuesdayEndTime,wednesdayCheck,wednesdayStartTime,wednesdayEndTime,thursdayCheck,thursdayStartTime,thursdayEndTime,fridayCheck, fridayStartTime,fridayEndTime){

     var locationID;
      for(let i = 0; i < $scope.buildings.length; i++){
        //console.log($scope.buildings[i].code);
        if($scope.buildings[i].code == location){
          locationID = $scope.buildings[i]._id;
         // console.log(locationID);
        }
      }
      var times =[];
      if(mondayCheck){
        times.push('M ' + mondayStartTime + ' ' + mondayEndTime);
        console.log(times);
      }
      if(tuesdayCheck){
        times.push('T ' + tuesdayStartTime + ' ' + tuesdayEndTime);
        console.log(times);

      }
      if(wednesdayCheck){
        times.push('W ' + wednesdayStartTime + ' ' + wednesdayEndTime);
        console.log(times);

      }
      if(thursdayCheck){
        times.push('R ' +thursdayStartTime + ' ' + thursdayEndTime);
        console.log(times);

      }
      if(fridayCheck){
        times.push('F ' + fridayStartTime + ' ' + fridayEndTime);
        console.log(times);

      }


      var newCourse = {
        "code": courseCode,
        "name": courseName,
        "location": locationID,
        "time": times,
        "classType" : classType,
      }
      console.log(newCourse)
    //  $scope.profCourses.push(newCourse);
    //Use Listings.update to apply changes to old professor
    Listings.createCourse(newCourse).then(function(response){

      //$scope.user.classes.push(response.data) needs update User function
      listing.classes.push(response.data)
      $scope.newListing.classes = listing.classes;
      $scope.updateListing(listing);
    });
    }

    //Adds marker to map given coordinates
    $scope.addMarker = function(buildingName, description){
      for(let i = 0; i < $scope.buildings.length; i++){
        if($scope.buildings[i].code == buildingName){
          var latitude =$scope.buildings[i].coordinates.latitude;
          var longitude =$scope.buildings[i].coordinates.longitude;
          var marker = L.marker([latitude, longitude]).addTo(mymap)
          .bindPopup(description);
        }
      }
    };
//TODO JSON API to store all avaiable classes into an array
$scope.signOut = function(){
  Listings.signOut();
  window.location.replace('/logout');
  }
//TODO Professor obj has a list of markers for TAs on map
    $scope.deleteListing = function(index) {
	   /**TODO
        Delete the article using the Listings factory. If the removal is successful,
		navigate back to 'listing.list'. Otherwise, display the error.
       */
       console.log($scope.listings[index]._id);

       Listings.delete($scope.listings[index]._id);

          //Adds marker to map given coordinates
          $scope.addMark = function(id,description){
            for(let i = 0; i < $scope.buildings.length; i++){
              if($scope.buildings[i]._id == id){
                var latitude =$scope.buildings[i].coordinates.latitude;
                var longitude =$scope.buildings[i].coordinates.longitude;
                var marker = L.marker([latitude, longitude]).addTo(mymap)
                .bindPopup(description);
              }
            }
          };
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
          $scope.selectProf = function(listing) {
            console.log($scope.buildings);
            console.log(listing);
            //getClasses
            //$scope.listings[index]
            //forEach class, get location
            for(let i = 0; i < listing.classes.length; i++){
                course = $scope.getClassByID(listing.classes[i]);
                console.log(course.location);
                //location = $scope.getLocationByID(course.location);
            }
          };



    $scope.canEdit = function(listing){
      var username = $scope.user.username;
      $scope.isUser = username == listing.email;
      return (username == listing.email);//is causing error

    };

    $scope.TaForm = false;
    $scope.editInfo = false;
    $scope.editSocial = false;
    $scope.editClicked = false;
    $scope.addCourseForm = false;
    $scope.newListing = {};

    $scope.updateListing = function(listing){
      var index = $scope.listings.indexOf(listing);
      console.log(index);
      //console.log('index: ' + index);
      var id = $scope.listings[index];
      console.log('id: ' + id);

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

      if (!list.twitter){
        list.twitter = listing.twitter;
      }
      if (!list.slack){
        list.slack = listing.slack;
      }
      if (!list.linkedin){
        list.linkedin = listing.linkedin;
      }
      if (!list.information){
        list.information = listing.information;
      }


     // console.log('id' + id);
      listing.twitter = list.twitter,
      listing.slack = list.slack,
      listing.linkedin = list.linkedin,
      listing.information = list.information

      //$scope.listings.push($scope.newListing);
      console.log(id);
      //console.log("list " + list);
      Listings.update(id._id, list);
      window.location.replace('/');
   };


   $scope.updateUser = function(user){


    console.log(user);
    var list = {
      username: user.username,
      password: user.password,
      classes: user.classes,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role,
      class: user.class,
    };

    console.log(list);

    Listings.updateUser(user._id, list);
    window.location.replace('/');
 };




  }
]);
 
