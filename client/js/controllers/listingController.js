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

//Creates a new professor with inputted user info
    $scope.addTA = function(tEmail) {
      Listings.findByEmail(tEmail).then(function(response) {
        $scope.ta = response.data[0];
        console.log($scope.ta);
        var newTA = {
          "name": $scope.ta.firstname + " " + $scope.ta.lastname,
          "email": $scope.ta.username,
          "role": 'TA',
          "password": $scope.ta.password,
          "createdBy": $scope.user.username,
          "classes": $scope.profCourses,
        }
        console.log(newTA);
        $scope.listings.push(newTA);
        console.log($scope.listings);
      //Use Listings.update to apply changes to old professor
        Listings.createProf(newTA);
      },function(error) {
        console.log('Unable to retrieve listings:', error);
      });
      return;
    };
  //TODO Add courses and their Meeting times into array to be used by prof object
    $scope.addCourse = function(courseCode, days, startTime,endTime, location){

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
      Listings.createCourse(newCourse);
      console.log($scope.user.classes);
      $scope.user.classes.push(newCourse);
      console.log($scope.user.classes);
      //$scope.updateListing($scope.user);
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
      $scope.isUser = $scope.user.username == listing.email;
      return ($scope.user.username == listing.email);//is causing error

    };

    $scope.TaForm = false;
    $scope.editInfo = false;
    $scope.editSocial = false;
    $scope.editClicked = false;
    $scope.addCourseForm = false;
    $scope.newListing = {};

    $scope.updateListing = function(listing){
      var index = $scope.listings.indexOf(listing);
      console.log('index: ' + index);
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
        information: $scope.newListing.information
      };

      console.log('list.name: ' + list.name);

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


      console.log('id' + id);
      listing.twitter = list.twitter,
      listing.slack = list.slack,
      listing.linkedin = list.linkedin,
      listing.information = list.information

      //$scope.listings.push($scope.newListing);
      console.log(id);
      console.log("list " + list);
      Listings.update(id._id, list);
      window.location.replace('/');
   };




  }
]);
 
