angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
  function($scope, Listings) {
    $scope.detailedInfo = undefined;
    //Example Definitions for Building and Course
    $scope.reitz = {
      name: "Reitz",
      coordinates: {
        latitude: 29.6463,
        longitude: -82.3478
      }
    };
    $scope.cop3530 = {
      code:"cop3530",
      name: "Data Structures",
      location: undefined,
      day: "T 1pm TR 3pm"
    };

    $scope.profCourses = [];
    $scope.buildings = [];
    $scope.buildings.push($scope.reitz);
    $scope.buildings.push($scope.cop3530);

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
//Creates a new professor with inputted user info
    $scope.editInfo = function(profTwitter, profInfo, profSlack, profLinked, profCourses) {
      var newProfessor = {
        "twitter": profTwitter,
        "information": profInfo,
        "slack": profSlack,
        "linkedin" : profLinked,
        "classes" : profCourses
      }
    //  $scope.listings.push(newProfessor);
    //Use Listings.update to apply changes to old professor
    //  Listings.create(newProfessor);
    };

    //Adds marker to map given coordinates
    $scope.addMarker = function(buildingName){
      for(let i = 0; i < $scope.buildings.length; i++){
        if($scope.buildings[i].name == buildingName){
          var latitude =$scope.buildings[i].coordinates.latitude;
          var longitude =$scope.buildings[i].coordinates.longitude;
          var marker = L.marker([latitude, longitude]).addTo(mymap);
        }
      }
    };
//TODO Add courses and their Meeting times into array to be used by prof object
    $scope.addCourse = function(code){
    }
//TODO JSON API to store all avaiable classes into an array

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




    $scope.editClicked = false;
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
   };




  }
]);
