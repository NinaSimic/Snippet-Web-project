
(function () {

    angular.module("snippetApp")
        .controller('SingleSnippetAdminController',singleSnippetAdminController);


    //register page controller
    function singleSnippetAdminController($http, $scope, $window, LanguageService, $stateParams) {

        var vm = this;
        vm.getSnippetData = getSnippetData;
        vm.snippetID = $stateParams.snippetID;

        console.log("primio snippetid " + vm.snippetID);

        getSnippetData();
        vm.types = [];
        vm.ace = null;

        $scope.modes = [];
        $scope.mode = [];
    //    vm.userData = angular.fromJson($window.localStorage['loggedUser']);

    //    console.log("vm.userData = " + JSON.stringify(vm.userData));

        $scope.aceLoaded = function(_editor) {
            // Options
            vm.ace = _editor;
            _editor.setReadOnly(true);
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

        function getSnippetData(snippetID) {

            $http.get('/api/snippet/get_snippet_data/' + vm.snippetID)
                .then(function(response) {
                    console.log("vm.snippetData = " + JSON.stringify(response.data));
                    vm.snippetData = response.data;
                }, function(response) {
                    alert(JSON.stringify(response.data));
                });
        }
    }
})();