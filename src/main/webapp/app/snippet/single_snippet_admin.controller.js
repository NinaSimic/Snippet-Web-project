
(function () {

    angular.module("snippetApp")
        .controller('SingleSnippetAdminController',singleSnippetAdminController);


    //register page controller
    function singleSnippetAdminController($http, $scope, $window, LanguageService, $stateParams, $state) {

        var vm = this;
        vm.getSnippetData = getSnippetData;
        vm.snippetID = $stateParams.snippetID;
        vm.getAllComments = getAllComments;

        console.log("primio snippetid " + vm.snippetID);

        getSnippetData();
        getAllComments();
        vm.types = [];
        vm.ace = null;
        vm.redirect = redirect;

        $scope.modes = [];
        $scope.mode = [];
        vm.userData = angular.fromJson($window.localStorage['loggedUser']);

        $scope.aceLoaded = function(_editor) {
            // Options
            vm.ace = _editor;
            _editor.setReadOnly(true);
        };

        vm.addComment = function (id) {

            //$window.location.href = "http://" + $window.location.host + "/#!/activateSednica";
            $state.go('add_comment', {snippetID:id});

        }

        function redirect(){
                $window.location.href = "http://" + $window.location.host + "/#!/profile_admin";
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


        function getAllComments() {

            $http.get('/api/comment/getAllComments/' + vm.snippetID)
                .then(function(response) {
                    vm.allComments = response.data;
                }, function(response) {
                    alert(JSON.stringify(response.data));
                });
        }

        function getSnippetData() {

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