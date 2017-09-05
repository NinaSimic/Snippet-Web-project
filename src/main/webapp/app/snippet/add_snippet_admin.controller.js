
(function () {

    angular.module("snippetApp")
        .controller('AddSnippetAdminController',addSnippetAdminController);


    //register page controller
    function addSnippetAdminController($http, $scope, $window, LanguageService) {

        var vm = this;
        vm.createSnippet = createSnippet;
        vm.types = [];
        vm.ace = null;
        vm.expirations = [ { name: "NEVER", duration: -1},{ name: "2 minutes", duration: 2*60*1000}, { name: "10 days", duration: 10*24*3600*1000}, { name: "1 month", duration: 30*24*3600*1000}] ;

        $scope.modes = [];
        $scope.mode = [];
        vm.userData = angular.fromJson($window.localStorage['loggedUser']);
        vm.username = vm.userData.username;

        vm.newSnippet = {
            description : null,
            clip :  null,
            language:  null,
            url:  null,
            end_date : vm.expirations[0].name,
            username :  null

        };

        $scope.aceLoaded = function(_editor) {
            // Options
            vm.ace = _editor;
            //  _editor.setReadOnly(true);
        };

        vm.todaysDate = new Date();


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

                $window.location.href = "http://" + $window.location.host + "/#!/profile_admin";

        }

        console.log("user" + vm.username);
        function createSnippet () {
         //   console.log("USAO U KREIRANJE SNIPPETA");

            // Validacije
            if(!$scope.descriptionForm.$valid){
                alert("All fields are required! Make sure you filled them correctly.");
                return;
            }

            if(!$scope.otherForm.$valid){
                alert("All fields are required! Make sure you filled them correctly.");
                return;
            }

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