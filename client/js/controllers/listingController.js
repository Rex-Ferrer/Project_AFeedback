angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
  function($scope, Listings) {
    $scope.detailedInfo = undefined;
    $scope.latitude = undefined;
    $scope.longitude = undefined;
    $scope.profCourses = undefined;
    /* Get all the listings, then bind it to the scope */
    Listings.getAll().then(function(response) {
      $scope.listings = response.data;
    }, function(error) {
      console.log('Unable to retrieve listings:', error);
    });

    $scope.editInfo = function(profTwitter, profInfo, profSlack, profLinked, profCourses) {
      var newProfessor = {
        "twitter": profTwitter,
        "information": profInfo,
        "slack": profSlack,
        "linkedin" : profLinked,
        "classes" : profCourses
      }
    };
    $scope.addMarker = function(latitude,longitude){
      var marker = L.marker([latitude, longitude]).addTo(mymap);
    };

    /*
    $scope.addListing = function() {
      var obj = {
        "code": $scope.newListing.code,
        "name": $scope.newListing.name,
        "address": $scope.newListing.adress
      }

      $scope.listings.push(obj);

      Listings.create(obj);
      */


	  /**TODO
	  *Save the article using the Listings factory. If the object is successfully
	  saved redirect back to the list page. Otherwise, display the error
	 */

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
  }
]);
