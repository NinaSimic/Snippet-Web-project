
(function() {
    angular.module("snippetApp").controller("RegUserController", regUserController);

    function regUserController($http, $window, $scope, LoginFactory) {
        var vm = this;
        vm.userData = angular.fromJson($window.localStorage['loggedUser']);
        console.log("vm.userData = " + JSON.stringify(vm.userData));

        $scope.redirect = function(){
            $window.location.href = "http://" + $window.location.host + "/#!/user_modify";

        }

        vm.change = function () {
            $scope.redirect();
        }

        vm.modify = function () {
            vm.changed_user = {

                firstname: vm.newUser.firstname,
                lastname: vm.newUser.lastname,
                phone: vm.newUser.phone,
                email: vm.newUser.email,
                address: vm.newUser.address,
                anumber: vm.newUser.anumber,
                city: vm.newUser.city,
                country: vm.newUser.country

            }

            $http.post('/api/users/poslanik/modify', vm.changed_user).then(function (response) {

                //dovlace se podaci ulogovanog iz baze
                var promise = LoginFactory.getLoggedUserData(vm.token);
                promise.then(
                    function(loggedUser) {
                        console.log("ucitan u funkciji: " + JSON.stringify(loggedUser));
                        $window.localStorage['loggedUser'] = angular.toJson(loggedUser);
                        $scope.userData = loggedUser;
                        $window.location.href = "#!/profil";
                    }
                );


            },function(response){
                alert(response.data.response);
            });


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