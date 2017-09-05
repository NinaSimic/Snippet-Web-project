
(function () {

    angular.module("snippetApp")
        .controller('ProgLanguageController', ProgLanguageController);


    //register page controller
    function ProgLanguageController($http, $scope, $window, LanguageService) {

        var vm = this;
        vm.createLanguage = createLanguage;


        function createLanguage () {

            if(!$scope.languageForm.$valid){
                alert("Enter name of programme language.");
                return;
            }

     //       console.log("USAO U KREIRANJE Jezika");
            vm.new_language = {
                name : vm.newLanguage.name,
            }


            $http.post('/api/language/create', vm.new_language).then(function (response) {

            //    $scope.redirect();

            },function(response){
                alert("Create new programme language failed");
            });
        }
    }
})();