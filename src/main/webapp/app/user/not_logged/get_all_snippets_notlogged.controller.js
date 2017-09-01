(function() {
    angular.module("snippetApp").controller("AllSnippetsNotloggedController", allSnippetsNotloggedController);

    function allSnippetsNotloggedController($http, $state, $scope, LanguageService) {
        var vm = this;
        vm.getAllSnippets = getAllSnippets;
        vm.types = [];
        $scope.modes = [];
        $scope.mode = [];

        getAllSnippets();

        LanguageService.getAllLanguages().then(function(response){
            vm.types = response.data;

            for(var i = 0; i < vm.types.length; i++) {
                $scope.modes.push(vm.types[i].name);

            }
            $scope.mode = $scope.modes[0];
            console.log("imena jezika: " , $scope.mode );

        }).catch(function(err){

        });

        function getAllSnippets() {

            $http.get('/api/snippet/getAllSnippets')
                .then(function(response) {
                    vm.allSnippets = response.data;
                }, function(response) {
                    alert(JSON.stringify(response.data));
                });
        }

        vm.addComment = function (id) {
            console.log("usao");
            //$window.location.href = "http://" + $window.location.host + "/#!/activateSednica";
            $state.go('add_comment', {snippetID:id});

        }
    }
})();

