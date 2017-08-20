/**
 * Created by Sandra on 7/13/2017.
 */
(function(angular) {
    angular.module('snippetApp')
        .factory('LoginFactory', function($http) {

            return {
                getLoggedUserData: function(token) {

                    return $http.get('/api/users/data', token)
                        .then(function(loggedUserData) {
                            //console.log("tralala" + JSON.stringify(loggedUserData));
                            return loggedUserData.data;
                        });
                }

            }

        });
})(angular);
