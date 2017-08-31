(function() {
    angular.module("snippetApp").controller("AllSnippetsUserController", allSnippetsUserController);

    function allSnippetsUserController($http, $state, $window, $scope) {
        var vm = this;
        vm.getAllSnippets = getAllSnippets;

        getAllSnippets();

        function getAllSnippets() {

            $http.get('/api/users/reg_user/getAllSnippets')
                .then(function(response) {
                    vm.allSnippets = response.data;
                }, function(response) {
                    alert(JSON.stringify(response.data));
                });
        }

        vm.addComment = function (id) {

            //$window.location.href = "http://" + $window.location.host + "/#!/activateSednica";
            $state.go('add_comment', {snippetID:id});

        }
    }
})();

