/**
 * Created by Korisnik on 6/11/2017.
 */
(function () {

    angular.module("snippetApp")
        .controller('RegisterController',RegisterController);


    //register page controller
    function RegisterController($http, $scope, $window, CompanyService) {

        var vm = this;
        vm.register = register;
        vm.types = ['Owner', 'Company', 'Private Acc in Company'];

        findAllCompanies();


        function findAllCompanies(){
            CompanyService.findAll()
                .then(function (data) {
                    console.log(JSON.stringify(data.data));
                    vm.companies = data.data;
                });
        }

        $scope.redirect = function(){
            $window.location.href = "http://" + $window.location.host + "/#!/login";

        }

        //method for user registration
        function register () {
            console.log("USAO U REGISTER FUNKCIJU");
            vm.new_user = {
                type : vm.newUser.userType,
                role : "owner",
                username: vm.newUser.username,
                password: vm.newUser.password,
                email: vm.newUser.email,
                name: vm.newUser.name,
                surname: vm.newUser.surname,
                birthDate: vm.newUser.birthdate,
                phoneNumber: vm.newUser.phoneNumber,
                address: vm.newUser.address,
                city: vm.newUser.city,
                country: vm.newUser.country,
                accountNumber: vm.newUser.accountNumber,
                imageUrl: 'images/img1.jpg'

            }



            if(vm.newUser.password != vm.newUser.repeatpass){
                alert("Passwords must match!");
                return;
            }

            var type = "owner";

            switch(vm.new_user.type) {
                case "Owner":
                    type = "owner";
                    break;
                case "Company":
                    type = "company";
                    vm.new_user.pib = vm.newUser.pib;
                    vm.new_user.site = vm.newUser.site;
                    vm.new_user.fax = vm.newUser.fax;
                    break;
                case "Private Acc in Company":
                    type = "privateAcc";
                    vm.new_user.companyId = vm.newUser.companyId;
                    break;
            }
            vm.new_user.type = type;
            console.log("novi korisnik: " + JSON.stringify(vm.new_user) );


            $http.post('/api/users/'+type+'/register', vm.new_user).then(function (response) {

                $scope.redirect();

            },function(response){
                alert("Registration failed");
            });



        }



    }
})();