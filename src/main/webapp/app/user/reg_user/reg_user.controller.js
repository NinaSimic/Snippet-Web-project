
(function() {
    angular.module("snippetApp").controller("RegUserController", regUserController);

    function regUserController($http, $window, $scope, LoginFactory, $state, Upload) {
        var vm = this;
        vm.getAllMySnippets = getAllMySnippets;
        vm.deleteSnippet = deleteSnippet;
        vm.allMySnippets = [];
        vm.uploadImage = uploadImage;

        getAllMySnippets();

        vm.userData = angular.fromJson($window.localStorage['loggedUser']);
        console.log("vm.userData = " + JSON.stringify(vm.userData));

        vm.position = "\""+vm.userData.address+" " + vm.userData.anumber + " " + vm.userData.city + " " + vm.userData.country;


        $scope.redirect = function(){
            $window.location.href = "http://" + $window.location.host + "/#!/profile";
        };

        vm.getDetails = function (id) {
            $state.go('single_snippet', {snippetID:id});
        };

        vm.change = function () {
            $window.location.href = "http://" + $window.location.host + "/#!/user_modify";
        };

        function uploadImage () {

            Upload.upload({
                url: '/api/users/uploadImage',
                data: {file: vm.file, 'id': $window.localStorage.getItem("id")}
            }).then(function (response) {
                // console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                alert(response.data.message);
                vm.userData.image = response.data.message;
                //vm.image = response.data;

            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        };


        function getAllMySnippets() {

            $http.get('/api/users/reg_user/getAllMySnippets')
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
                country: vm.userData.country,
            };

            $http.post('/api/users/reg_user/modify', vm.changed_user).then(function (response) {

                //dovlace se podaci ulogovanog iz baze
                var promise = LoginFactory.getLoggedUserData(vm.token);
                promise.then(
                    function(loggedUser) {
                        console.log("ucitan u funkciji: " + JSON.stringify(loggedUser));
                        $window.localStorage['loggedUser'] = angular.toJson(loggedUser);
                        $scope.userData = loggedUser;
                        $scope.redirect();

                      //  $window.location.href = "#!/profile";
                    }
                );


            },function(response){
                alert(response.data.response);
            });


        };

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