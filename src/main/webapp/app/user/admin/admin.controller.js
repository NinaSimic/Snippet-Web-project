
(function() {
    angular.module("snippetApp").controller("AdminController", adminController);

    function adminController($http, $window, $scope, LoginFactory, $state) {
        var vm = this;
        vm.getAllMySnippets = getAllMySnippets;
        vm.deleteSnippet = deleteSnippet;
        vm.allMySnippets = [];

        getAllMySnippets();
      //  loadMap(NgMap);

        vm.userData = angular.fromJson($window.localStorage['loggedUser']);

        console.log("vm.userData = " + JSON.stringify(vm.userData));

        vm.position = "\""+vm.userData.address+" " + vm.userData.anumber + " " + vm.userData.city + " " + vm.userData.country;

        function getAllMySnippets() {

            $http.get('/api/users/admin/getAllMySnippets')
                .then(function(response) {
                    console.log("All my snippets: " + JSON.stringify(response.data));
                    vm.allMySnippets = response.data;
                    for(var i = 0; i < vm.allMySnippets.length; i++){
                        vm.allMySnippets[i].end_date += vm.allMySnippets[i].creation_date;
                        vm.allMySnippets[i].end_date = new Date(vm.allMySnippets[i].end_date);
                    }
                }, function(response) {
                    alert(JSON.stringify(response.data));
                });
        }

        $scope.redirect = function(){
            $window.location.href = "http://" + $window.location.host + "/#!/admin_modify";

        }

        vm.getDetails = function (id) {
            $state.go('single_snippet_admin', {snippetID:id});
        }

        vm.change = function () {
            $scope.redirect();
        }

        vm.modify = function () {
            vm.changed_user = {

                username: vm.userData.username,
                password: vm.userData.password,
                firstname: vm.userData.firstname,
                lastname: vm.userData.lastname,
                phone: vm.userData.phone,
                email: vm.userData.email,
                address: vm.userData.address,
                anumber: vm.userData.anumber,
                city: vm.userData.city,
                country: vm.userData.country

            }

            $http.post('/api/users/admin/modify', vm.changed_user).then(function (response) {

                //dovlace se podaci ulogovanog iz baze
                var promise = LoginFactory.getLoggedUserData(vm.token);
                promise.then(
                    function(loggedUser) {
                        console.log("ucitan u funkciji: " + JSON.stringify(loggedUser));
                        $window.localStorage['loggedUser'] = angular.toJson(loggedUser);
                        $scope.userData = loggedUser;
                        $window.location.href = "#!/profile_admin";
                    }
                );


            },function(response){
                alert(response.data.response);
            });


        }

        function deleteSnippet(id){
            if (confirm("Are you sure you want to erase this snippet: " + id + "?") == true) {

                $http.get('/api/snippet/delete/'+ id)
                    .then(function(response) {


                        getAllMySnippets();
                    }, function(response) {
                        alert(JSON.stringify(response.data));
                    });
            }
        }
    }
})();
