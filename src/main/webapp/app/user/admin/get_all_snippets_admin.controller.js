(function() {
    angular.module("snippetApp").controller("AllSnippetsAdminController", allSnippetsAdminController);

    function allSnippetsAdminController($http, $window, $scope, $state) {
        var vm = this;
        vm.getAllSnippets = getAllSnippets;

        getAllSnippets();

        vm.getDetails = function (id) {
            $state.go('single_snippet_admin', {snippetID:id});
        };

        vm.search = function(){

        };

        vm.block = function (id) {

            $http.get('/api/users/admin/block_snippet/' + id).then(function (response) {

                getAllSnippets();
            }, function(response) {
                alert(JSON.stringify(response.data));
            });
        };

        vm.approve = function (id) {

            $http.get('/api/users/admin/unblock_snippet/' + id).then(function (response) {

                getAllSnippets();
            }, function(response) {
                alert(JSON.stringify(response.data));
            });
        };
        function getAllSnippets() {

            $http.get('/api/users/admin/getAllSnippets')
                .then(function(response) {
                    vm.allSnippets = response.data;
                }, function(response) {
                    alert(JSON.stringify(response.data));
                });
        }


    }
})();

