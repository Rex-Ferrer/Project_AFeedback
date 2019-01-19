angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
  function($scope, Listings) {

    //Stores Variable for Current User Info, Role/Lastname/FirstName/etc.
    Listings.getUser().then(function(response) {
      $scope.user = response.data[0];

    },function(error) {
      console.log('Unable to retrieve listings:', error);
    });
    $scope.jobs = [
        {
            name: "Software Eng. II",
            totalApplicants: 5,
            unreviewedApplicants: 2,
            createdBy: "Google"
        },
        {
            name: "Software Eng. IV",
            totalApplicants: 15,
            unreviewedApplicants: 1,
            createdBy: "Google"
        }
    ];
    //Displays jobs for a specific company
    $scope.displayJobs = function(){
      for (i = 0; i < $scope.jobs.length; i++) {
        if($scope.user.firstname == $scope.jobs[i].company){
          $scope.listedJobs.push($scope.jobs[i])
        }
      }
    };

    //Displays jobs for a specific company
    $scope.displayJobs = function(){
      for (i = 0; i < $scope.jobs.length; i++) {
        if($scope.companyName == $scope.jobs[i].company){
          $scope.listedJobs.push($scope.jobs[i])
        }
      }
    };



    /*
      Implement these functions in the controller to make your application function
      as described in the assignment spec.
     */
    $scope.addListing = function(code_, name_, latitude_,longitude_,address_) {
      var obj = {
        "code": code_,
        "name": name_,
        "coordinates": {
          "latitude": latitude_,
          "longitude": longitude_,
        },
        "address": address_
      };
      $scope.listings.push(obj);
    };

  }
]);
