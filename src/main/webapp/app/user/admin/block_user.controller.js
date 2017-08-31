
(function() {
    angular.module("snippetApp").controller("BlockUserController", blockUserController);

    function blockUserController($http, $window, $scope) {
        var vm = this;
        vm.getAllUsers = getAllUsers;

        getAllUsers();

        function getAllUsers() {

            $http.get('/api/users/admin/getAllUsers')
                .then(function(response) {
                    console.log("All users: " + JSON.stringify(response.data));
                    vm.allUsers = response.data;
                }, function(response) {
                    alert(JSON.stringify(response.data));
                });
        }

        vm.block = function (username) {

            $http.get('/api/users/admin/block_user/' + username).then(function (response) {

                getAllUsers();
            }, function(response) {
                alert(JSON.stringify(response.data));
            });
        }

        vm.approve = function (username) {

            $http.get('/api/users/admin/unblock_user/' + username).then(function (response) {

                getAllUsers();
            }, function(response) {
                alert(JSON.stringify(response.data));
            });
        }

        vm.change = function () {
            $scope.redirect();
        }
    }
})();



/**
 * Created by Korisnik on 6/14/2017.
 */
/*(function() {
    angular.module("snippetApp")
        .controller('RegUserController', regUserController);

    // owner controller
    function regUserController($http, $scope, $cookies, $window,LoginFactory) {
        var vm = this;
        vm.getAllMySnippets = getAllMySnippets;
  //      vm.eraseAdvertisement = eraseAdvertisement;

      //  getAllMySnippets();


        vm.userData = angular.fromJson($window.localStorage['loggedUser']);
        console.log("vm.userData = " + JSON.stringify(vm.userData));
        vm.modify = function () {
            $window.location = "#!/reg_user_modify";
        }


      /*  function getAllMySnippets() {

            $http.get('/api/users/reg_user/getAllMySnippets')
                .then(function(response) {
                    console.log("All my snippets: " + JSON.stringify(response.data));
                    vm.allMySnippets = response.data;
                }, function(response) {
                    alert(JSON.stringify(response.data));
                });
        }

        function eraseAdvertisement(id){
            if (confirm("Are you sure you want to erase this advertisement: " + id + "?") == true) {

                $http.get('/api/advertisement/erase/'+ id)
                    .then(function(response) {


                        getAllMyAdvertisements();
                    }, function(response) {
                        alert(JSON.stringify(response.data));
                    });
            }
        }
    }


})();*/