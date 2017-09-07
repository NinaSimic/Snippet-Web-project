
(function () {

    angular.module("snippetApp")
        .controller('SingleSnippetAdminController',singleSnippetAdminController);


    //register page controller
    function singleSnippetAdminController($http, $scope, $window, LanguageService, $stateParams, $state) {

        var vm = this;
        vm.getSnippetData = getSnippetData;
        vm.snippetID = $stateParams.snippetID;
        vm.getAllComments = getAllComments;
        vm.deleteComment = deleteComment;
        vm.addPossitiveGrade = addPossitiveGrade;
        vm.addNegativeGrade = addNegativeGrade;
        vm.mineSnippet = false;

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
            $state.go('add_comment_admin', {snippetID:id});

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

        function deleteComment(id){
            if (confirm("Are you sure you want to erase this comment: " + id + "?") == true) {

                $http.get('/api/comment/delete/'+ id)
                    .then(function(response) {

                        getAllComments();
                    }, function(response) {
                        alert(JSON.stringify(response.data));
                    });
            }
        }

        function getSnippetData() {

            $http.get('/api/snippet/get_snippet_data/' + vm.snippetID)
                .then(function(response) {
                    console.log("vm.snippetData = " + JSON.stringify(response.data));
                    vm.snippetData = response.data;
                    if(vm.snippetData.user != null){
                        if(vm.snippetData.user.username == vm.userData.username){
                            vm.mineSnippet = true;
                        }
                    }

                }, function(response) {
                    alert(JSON.stringify(response.data));
                });
        }

        function addPossitiveGrade(id){

            vm.new_grade = {
                positive : true,
                username : vm.userData.username,
                commentID : id
            }

            console.log("username " + vm.userData.username);
            console.log("commentID " + id);

            $http.post('/api/grade/create', vm.new_grade).then(function (response) {

              //  $scope.redirect();

            },function(response){
                alert("Something went wrong! Try again.");
            });
        }

        function addNegativeGrade(id){

            vm.new_grade = {
                positive : false,
                username : vm.userData.username,
                commentID : id
            }

            console.log("username " + vm.userData.username);
            console.log("commentID " + id);

            $http.post('/api/grade/create', vm.new_grade).then(function (response) {

                //  $scope.redirect();

            },function(response){
                alert("Something went wrong! Try again.");
            });

        }
    }
})();