
(function () {

    angular.module("snippetApp")
        .controller('SingleSnippetController',singleSnippetController);


    //register page controller
    function singleSnippetController($http, $scope, $window, LanguageService, $stateParams, $state) {

        var vm = this;
        vm.getSnippetData = getSnippetData;
        vm.snippetID = $stateParams.snippetID;
        vm.getAllComments = getAllComments;
        vm.deleteComment = deleteComment;
        vm.userData = angular.fromJson($window.localStorage['loggedUser']);
        vm.mineSnippet = false;
        vm.sortMode = "SORT BY POPULARITY" ; //  "SORT BY DATE"

      //  vm.deleteSnippet = deleteSnippet;

        vm.sortComments = sortComments;

        vm.deletedComments = {};


        vm.addPossitiveGrade = addPossitiveGrade;
        vm.addNegativeGrade = addNegativeGrade;

        if(vm.userData !== undefined){
            vm.mineSnippet = false;

        }

        console.log("user data" + vm.userData);
        if(vm.userData === undefined) {
            console.log("usao u if");
            // obj is a valid variable, do something here.
            vm.username = "anonimus";

        }
        else{
            vm.username = vm.userData.username;
        }

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

        };

        function  redirect() {
            if(vm.userData === undefined){
                $window.location.href = "http://" + $window.location.host + "/#!/get_all_snippets_notlogged";
            }
            else{
                $window.location.href = "http://" + $window.location.host + "/#!/profile";
            }

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

        function getAllComments(reverse) {

            $http.get('/api/comment/getAllComments/' + vm.snippetID)
                .then(function(response) {
                    if(reverse) {
                        response.data.reverse();
                    }
                    vm.allComments = response.data;



                    /////////////////////////////////////////////////////////////////////////////
                    /// CHECK EACH CCOMMENT
                    // if the logged in user made this comment
                    // if so, he's the owner...HE CANNOT grade his own comment
                    ///////////////////////////
                    //  if the user IS NOT THE OWNER...
                    // CHECK if he graded that comment before, go through all grades and see if our user is in there
                    for(var i = 0; i < vm.allComments.length; i++) {
                        // check if this is the  user's comment?
                        if(vm.allComments[i].user.username === vm.username) {
                            vm.allComments[i].isOwner = 1;
                            vm.allComments[i].alreadyGraded = 1;
                        } else {
                            vm.allComments[i].isOwner = 0;
                            vm.allComments[i].alreadyGraded = 0;
                            // check if currently logged in user has already graded some of the comments
                            if(vm.allComments[i].grades !== null && vm.allComments[i].grades.length > 0) {
                                for(var j = 0; j < vm.allComments[i].grades.length; j++) {
                                    if(vm.allComments[i].grades[j].user.username === vm.username) {
                                        vm.allComments[i].alreadyGraded = 1;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    //////////////////////////////////////////////////////////////////////////////////////////////////////////



                }, function(response) {
                    alert(JSON.stringify(response.data));
                });
        }

        function deleteComment(id){

            if(  vm.deletedComments.hasOwnProperty(id)) {
                console.log("AngularJS dirty check deleteComment called twice.");
                return;
            }

            if (confirm("Are you sure you want to erase this comment: " + id + "?") === true) {
                vm.deletedComments[id] = true;
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
                    vm.snippetData.end_date += vm.snippetData.creation_date;
                    vm.snippetData.end_date = new Date(vm.snippetData.end_date);
               /*     for(var i = 0; i < vm.snippetData.length; i++){
                        vm.snippetData[i].end_date += vm.snippetData[i].creation_date.getTime();
                    }*/

                    if(vm.snippetData.user != null && vm.userData === undefined){

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
            };

            console.log("username " + vm.userData.username);
            console.log("commentID " + id);

            $http.post('/api/grade/create', vm.new_grade).then(function (response) {

                getAllComments();

            },function(response){
                alert("Something went wrong! Try again.");
            });
        }

        function addNegativeGrade(id){

            vm.new_grade = {
                positive : false,
                username : vm.userData.username,
                commentID : id
            };

            console.log("username " + vm.userData.username);
            console.log("commentID " + id);

            $http.post('/api/grade/create', vm.new_grade).then(function (response) {

                getAllComments();

            },function(response){
                alert("Something went wrong! Try again.");
            });

        }


        function sortComments() {
            if(vm.sortMode === "SORT BY POPULARITY") {

                for(var i = 0; i < vm.allComments.length - 1; i++) {
                    for(var j  = i + 1; j < vm.allComments.length; j++) {
                       if(vm.allComments[j].number_positive > vm.allComments[i].number_positive)  {
                           var temp = vm.allComments[i];
                           vm.allComments[i] = vm.allComments[j];
                           vm.allComments[j] = temp;
                       }
                    }
                }
                vm.sortMode = "SORT BY DATE";
            } else {
                // get all comments but reverse their order, from newest to oldest
                getAllComments(true);
                vm.sortMode = "SORT BY POPULARITY";
            }
        }






    }
})();