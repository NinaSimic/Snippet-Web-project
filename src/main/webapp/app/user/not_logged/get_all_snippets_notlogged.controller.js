(function() {
    angular.module("snippetApp").controller("AllSnippetsNotloggedController", allSnippetsNotloggedController);

    function allSnippetsNotloggedController($http, $state, $window, $scope) {
        var vm = this;
        vm.getAllSnippets = getAllSnippets;

        getAllSnippets();

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

