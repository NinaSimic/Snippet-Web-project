
(function () {

    angular.module("snippetApp")
        .controller('AddSnippetController',AddSnippetController);


    //register page controller
    function AddSnippetController($http, $scope, $window, LanguageService, $state) {

        var vm = this;
        vm.createSnippet = createSnippet;
        vm.types = [];
        vm.ace = null;
        vm.expirations = [ { name: "NEVER", duration: -1},{ name: "2 minutes", duration: 2*60*1000}, { name: "10 days", duration: 10*24*3600*1000}, { name: "1 month", duration: 30*24*3600*1000}] ;

        $scope.modes = [];
        $scope.mode = [];
        vm.userData = angular.fromJson($window.localStorage['loggedUser']);

        vm.newSnippet = {
            description : null,
            clip :  null,
            language:  null,
            url:  null,
            end_date : vm.expirations[0].name,
            username :  null

        };

      //  console.log("vm.userData = " + JSON.stringify(vm.userData));

        vm.todaysDate = new Date();

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
            vm.newSnippet.language = vm.types[0].name;
           console.log("ime jezika je: " , $scope.mode );

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
                $state.go('get_all_snippets_notlogged');
             //   $window.location.href = "http://" + $window.location.host + "/#!/get_all_snippets_notlogged";
            }
            else if(vm.userData.role == "USER"){
                $window.location.href = "http://" + $window.location.host + "/#!/profile";
            }
        }

        console.log("user" + vm.username);
        function createSnippet () {

            // Validacije
            if(!$scope.descriptionForm.$valid){
                alert("All fields are required! Make sure you filled them correctly.");
                return;
            }

            if(!$scope.otherForm.$valid){
                alert("All fields are required! Make sure you filled them correctly.");
                return;
            }


        //    console.log("USAO U KREIRANJE SNIPPETA");
            // za datum...
            // https://stackoverflow.com/questions/29086764/set-min-date-to-current-date-in-angularjs-input
            if(vm.ace.getValue() == null || vm.ace.getValue() ==  "") {
                alert("Snippet content cannot be empty!");
                return;
            }

            // find language because it expects id not name
            for(var i = 0; i < vm.types.length; i++){
                if(vm.types[i].name === vm.newSnippet.language){
                    vm.newSnippet.language = vm.types[i].id;
                }
            }

            console.log("jezik je " + vm.newSnippet.language);

            vm.new_snippet = {
                description : vm.newSnippet.description,
                clip : vm.ace.getValue(),
                language: vm.newSnippet.language,
                url: vm.newSnippet.url,
                end_date : -1,
                username : vm.username

            }

            for(var i = 0; i < vm.expirations.length; i++){
                if(vm.newSnippet.end_date === vm.expirations[i].name){
                    vm.new_snippet.end_date = vm.expirations[i].duration;
                }
            }

            $http.post('/api/snippet/create', vm.new_snippet).then(function (response) {

                $scope.redirect();

            },function(response){
                alert("You are blocked and unable to proceed this function!");
            });



        }
    }
})();