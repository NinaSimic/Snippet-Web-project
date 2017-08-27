(function(angular) {
    angular.module('snippetApp')
        .factory('LoginFactory', function($http) {

            return {
                getLoggedUserData: function(token) {
                    return $http.get('/api/users/d', token)
                        .then(function(loggedUserData) {
                            console.log("tralala" + JSON.stringify(loggedUserData));
                            return loggedUserData.data;
                        });
                }

            }

        });
})(angular);



