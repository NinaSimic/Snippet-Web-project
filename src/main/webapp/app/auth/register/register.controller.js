/**
 * Created by Korisnik on 6/11/2017.
 */
(function () {

    angular.module("snippetApp")
        .controller('RegisterController',registerController);


    //register page controller
    function registerController(RegisterService, $scope, $window) {

        var vm = this;
        vm.register = register;

        $scope.redirect = function(){
            $window.location.href = "http://" + $window.location.host + "/#!/upload_image";

        }

        //method for user registration
        function register () {
            console.log("USAO U REGISTER FUNKCIJU");
            vm.new_user = {
                username: vm.newUser.username,
                password: vm.newUser.password,
                firstname: vm.newUser.firstname,
                lastname: vm.newUser.lastname,
                phone: vm.newUser.phone,
                email: vm.newUser.email,
                address: vm.newUser.address,
                anumber: vm.newUser.anumber,
                city: vm.newUser.city,
                country: vm.newUser.country
            }


            console.log("novi korisnik: " + JSON.stringify(vm.newUser))
            checkRepeatedPassword(vm.newUser.password, vm.newUser.repeatpass)

            RegisterService.register(vm.new_user).then(function (response) {
                $window.localStorage.setItem("id", response.data.id);
                $scope.redirect();
            }, function (response) {
                alert(response.data);
            });


            function checkRepeatedPassword(pass, repeatPass) {
                if (vm.newUser.password != vm.newUser.repeatpass) {
                    alert("Passwords must match!");
                    return;
                }

            }
        }


    }
})();