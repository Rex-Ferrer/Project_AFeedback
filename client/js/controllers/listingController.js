angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
  function($scope, Listings) {
    $scope.detailedInfo = undefined;
    $scope.profCourses = [];
    $scope.buildings = [];
    $scope.ta = undefined;
    /* Get all the listings, then bind it to the scope */
    //TODO View Professors from Mongo DB on api/listings
    Listings.getAll().then(function(response) {
      $scope.listings = response.data;
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
      Listings.findByEmail(tEmail).then(function(response) {
       var student = {"username": response.data[0].username,
                      "firstname": response.data[0].firstname,
                      "lastname": response.data[0].lastname,
                      "password": response.data[0].password
                    }


        if (student.role != 'TA'){//is always true because user isnt changed to ta
          var newTA = {
            "name": student.firstname + " " + student.lastname,
            "email": student.username,
            "role": 'TA',
            "password": student.password,
            "createdBy": [],
            "class": []
          }
          Listings.createProf(newTA).then(function(response){
            newTA.createdBy.push($scope.user.username)
            newTA.class.push(course)
            $scope.updateListing(newTA);
          });
        }
        else{

        newTA.createdBy.push($scope.user.username)
        newTA.classes.push(course)
        $scope.updateListing(newTA);

      }
      window.location.replace('/professor');
    },function(error) {
      console.log('Unable to retrieve listings:', error);
    });
    };




  //TODO Add courses and their Meeting times into array to be used by prof object
    $scope.addCourse = function(courseCode, days, startTime,endTime, location,listing){

     var locationID;
      for(let i = 0; i < $scope.buildings.length; i++){
        //console.log($scope.buildings[i].code);
        if($scope.buildings[i].code == location){
          locationID = $scope.buildings[i]._id;
         // console.log(locationID);
        }
      }


      var newCourse = {
        "code": courseCode,
        "name": "test",
        "location": locationID,
        //"time": startTime + endTime + days
      }
    //  $scope.profCourses.push(newCourse);
    //Use Listings.update to apply changes to old professor
    Listings.createCourse(newCourse).then(function(response){
      console.log(response)
      console.log(response.data)
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

      console.log($scope.listings[index]._id);


    };

    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.listings[index];
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
      //console.log(id);
      //console.log("list " + list);
      Listings.update(id._id, list);
      window.location.replace('/');
   };




  }
]);
 
