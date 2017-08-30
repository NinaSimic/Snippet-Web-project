/**
 * Created by Nina on 17-Jun-17.
 */
(function (angular) {

    'use strict';

    var BASE_URL = '/api/language';

    angular
        .module('snippetApp')
        .service('LanguageService', ['$http', languageService]);

    function languageService($http) {
        return {
        //    addAct: addAct,
            getAllLanguages: getAllLanguages,

        };

        function getAllLanguages() {
            return $http({
                method: 'GET',
                url: BASE_URL + "/all",
                headers: {"Content-Type": 'application/json'}
            });
        }


    }

}(angular));