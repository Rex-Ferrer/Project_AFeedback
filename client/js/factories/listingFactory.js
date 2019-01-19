angular.module('listings', []).factory('Listings', function ($http) {
  var methods = {
    getAll: function () {
      return $http.get('/api/listings');
    },

    getAllUsers: function () {
      return $http.get('/api/users');
    },

    //Gets current user info from site page
    getUser: function () {
      return $http.get('/api/users/getCurrentUser');
    },
    findListingByEmail: function (email) {
      return $http.get('/api/listings/' + email);//its not working
    },
    findByEmail: function (email) {
      return $http.get('/api/users/' + email);
    },
    signOut: function () {
      return $http.get('/logout');
    },

    updateUser: function (id, user) {
      return $http.put('/api/users/' + id, user);
    },

    update: function (id, listing) {
      return $http.put('/api/listings/' + id, listing);
    },
    getBuildings: function () {
      return $http.get('/api/buildings');
    },

    getClasses: function () {
      return $http.get('/api/classes');
    },

    createProf: function (newProfessor) {
      return $http.post('/api/listings', newProfessor);
    },
    createCourse: function (newCourse) {
      return $http.post('/api/classes', newCourse);
    },
    getCourseNameFromCode: function (classCode) {
      return $http.get('https://cors-anywhere.herokuapp.com/https://one.ufl.edu/apix/soc/schedule?category=CWSP&term=2188&course-code=' +
        classCode, {
          headers: { 'x-requested-with': 'foo' }
        });
    }
  };

  return methods;
});
