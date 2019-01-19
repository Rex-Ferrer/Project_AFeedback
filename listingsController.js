angular.module('listings').controller('ListingsController', ['$scope',
  function($scope) {
    $scope.companyName = "SwampHacks2019s";
    $scope.jobs = [
        {
            id: 123456,
            company: "Google",
            name: "Software Eng. II",
            totalApplicants: 5,
            unreviewedApplicants: 2,
            params: ["Critical Thinking", "Leadership", "Teamwork"],
            applications: [
                {"rank": 2, "applicantName": "Luis", "Critical Thinking": 1, "Leadership": 2, "Teamwork": 3 },
                {"rank": 1, "applicantName": "Rex", "Critical Thinking": 7, "Leadership": 2, "Teamwork": 5 }
            ]
        },
        {
            id: 654321,
            company: "Google",
            name: "Software Eng. IV",
            totalApplicants: 15,
            unreviewedApplicants: 1,
            params: ["Problem Solving", "Teamwork"],
            applications: []
        }
    ];

    // Data Tables
    $(document).ready(function() {
        $('.applicantTable').DataTable( {
            lengthChange: false,
            columnDefs: [
                {
                    targets: [ 0, 1, 2 ],
                    className: 'mdl-data-table__cell--non-numeric'
                }
            ]
        } );
    } );

    $scope.toggleElement = function(element){
        var toggleElement = element.children('.applicantTable');
        console.log(toggleElement);
        if(toggleElement.style.display != "none"){
            toggleElement.style.display = "none";
        }else{
            toggleElement.style.display = "block";
        }
    };
    
  }
]);