angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
  function($scope, Listings) {
    $scope.companyName = "SwampHacks2019s";
    $scope.jobs = [
        {
            name: "Software Eng. II",
            totalApplicants: 5,
            unreviewedApplicants: 2
        },
        {
            name: "Software Eng. IV",
            totalApplicants: 15,
            unreviewedApplicants: 1
        }
    ];


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
