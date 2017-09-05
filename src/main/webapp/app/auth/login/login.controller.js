(function () {
    angular.module("snippetApp")
        .controller('LoginController', loginController);

    //login page controller
    function loginController($scope, $http,$window,LoginFactory) {
        var vm = this;
        vm.loggedIn = false;
        vm.login = login;
        vm.logout = logout;
        vm.getLoggedUserData = getLoggedUserData;

        checkIfLogged();

        function checkIfLogged(){

            if($window.localStorage.getItem("token")){
                console.log("Logged");
                vm.loggedIn = true;
                vm.token = $window.localStorage.getItem("token");

                //getLoggedUserData();

                console.log(vm.token);
                var promise = LoginFactory.getLoggedUserData(vm.token);


                promise.then(
                    function(loggedUser) {

                        $window.localStorage['loggedUser'] = angular.toJson(loggedUser);
                        console.log("ucitan u funkciji window.localstorage: " + JSON.stringify($window.localStorage['loggedUser']));
                        $scope.loggedUser = loggedUser;
                        var user = angular.fromJson($window.localStorage['loggedUser']);
                        console.log("pre switcha" , $window.localStorage.getItem("role"));
                        switch ($window.localStorage.getItem("role")){
                            case "ADMIN" :
                                $window.location = "#!/profile_admin"; break;
                            case "USER" :
                                $window.location = "#!/profile"; break;
                        }
                    }
                );
            }
            else{
                vm.loggedIn = false;
            }
            console.log("loggedin = " + vm.loggedIn);
        }


        function login() {

            if(!$scope.loginForm.$valid){
                alert("Enter both required fields correctly!");
                return;
            }
       //     console.log(vm.username+" and "+vm.password);
            var userData =  { "username": vm.username, "password": vm.password };

            $http.post('/api/users/login', userData)
                .then(function(token) {

                    var t= token.data.message.split(" ")[0];
                    var role = token.data.message.split(" ")[1];
                    $window.localStorage.setItem("role",role);
                    $window.localStorage.setItem("token",t);
                    console.log("token = " + $window.localStorage.getItem("token"));
                    console.log("role = " + role);


                    checkIfLogged();

               //     $scope.redirect();
                }, function(response) {
                    alert("Wrong username and password combination");
                //    console.log("Wrong username and password combination");
                });
        }

        function getLoggedUserData() {
            var promise = LoginFactory.getLoggedUserData(vm.token);
            console.log("dobio od login factorija" + promise);
            promise.then(
                function(loggedUser) {

                    $window.localStorage['loggedUser'] = angular.toJson(loggedUser);
                    console.log("ucitan u funkciji window.localstorage: " + JSON.stringify($window.localStorage['loggedUser']));
                    $scope.loggedUser = loggedUser;
                    $scope.approved = loggedUser.approved;
                    return loggedUser;

                }
            );
        };

        // method for deleting user data - token
        function logout() {
            console.log("usao u logout");
            $window.localStorage.removeItem("token");
            $window.localStorage.removeItem("loggedUser");
            checkIfLogged();
            $location.path('/');
        }
        ;

    }
})();