angular.module('listings', []).factory('Listings', function($http) {
  var methods = {
    getAll: function() {
      return $http.get('/api/listings');
    },

    getBuildings: function() {
      //crossOrigin proxy serve to avoid CORS issues
      return $http.get("https://crossorigin.me/https://campusmap.ufl.edu/library/cmapjson/search.json");
    },
  delete: function(id) {
    Listings.findById(id, function(err,listing){
      if(err) throw err;

      listing.remove(function(err){
        if (err) throw err;
      });
    });
    return $http.delete('127.0.0.1/api/listings/' + id);
  }
};

  return methods;
});
