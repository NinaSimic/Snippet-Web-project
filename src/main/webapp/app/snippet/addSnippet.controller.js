
(function () {

    angular.module("snippetApp")
        .controller('AddSnippetController',AddSnippetController);


    //register page controller
    function AddSnippetController($http, $scope, $window, LanguageService,LoginFactory) {

        var vm = this;
        vm.createSnippet = createSnippet;
        vm.types = [];
        vm.ace = null;

        $scope.modes = [];
        $scope.mode = [];
        vm.userData = angular.fromJson($window.localStorage['loggedUser']);

        console.log("vm.userData = " + JSON.stringify(vm.userData));

        $scope.aceLoaded = function(_editor) {
            // Options
            vm.ace = _editor;
            //  _editor.setReadOnly(true);
        };

        console.log("user data" + vm.userData);
        if(vm.userData === undefined) {
            console.log("usao u if");
            // obj is a valid variable, do something here.
            vm.username = "anonimus";
        }
        else{
            vm.username = vm.userData.username;
        }



        LanguageService.getAllLanguages().then(function(response){
            vm.types = response.data;

            for(var i = 0; i < vm.types.length; i++) {
                $scope.modes.push(vm.types[i].name);

            }
            $scope.mode = $scope.modes[0];
           console.log("imena jezika: " , $scope.mode );

            $scope.aceOption = {
                mode: $scope.mode.toLowerCase(),

                onLoad: function (_ace) {
                    vm.ace = _ace;
                    // HACK to have the ace instance in the scope...
                    $scope.modeChanged = function () {
                        _ace.getSession().setMode('ace/mode/' + $scope.mode.toLowerCase());
                    };

                }
            };


        }).catch(function(err){

        });

        $scope.redirect = function(){
            if(vm.userData === undefined){
                $window.location.href = "http://" + $window.location.host + "/#!/home";
            }
            else if(vm.userData.role == "ADMIN") {
                $window.location.href = "http://" + $window.location.host + "/#!/profile_admin";
            }
            else if(vm.userData.role == "USER"){
                $window.location.href = "http://" + $window.location.host + "/#!/profile";
            }
        }

        console.log("user" + vm.username);
        function createSnippet () {
            console.log("USAO U KREIRANJE SNIPPETA");

            vm.new_snippet = {
                description : vm.newSnippet.description,
                clip : vm.ace.getValue(),
                language: vm.newSnippet.language,
                url: vm.newSnippet.url,
                end_date : vm.newSnippet.end_date,
                username : vm.username

            }

            $http.post('/api/snippet/create', vm.new_snippet).then(function (response) {

                $scope.redirect();

            },function(response){
                alert("You are blocked and unable to proceed this function!");
            });



        }
    }
})();