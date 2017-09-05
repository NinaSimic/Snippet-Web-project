
(function () {

    angular.module("snippetApp")
        .controller('AddCommentController',addCommentController);

    function addCommentController($http, $scope, $window, $state, $stateParams) {

        var vm = this;
        vm.createComment = createComment;
        vm.snippetID = $stateParams.snippetID;

        console.log("dobacio snippet ID " + vm.snippetID);

        vm.userData = angular.fromJson($window.localStorage['loggedUser']);


        console.log("vm.userData = " + JSON.stringify(vm.userData));
      //  vm.username = vm.userData.username;


        console.log("user data" + vm.userData);
        if(vm.userData === undefined) {
            console.log("usao u if");
            // obj is a valid variable, do something here.
            vm.username = "anonimus";
        }
        else{
            vm.username = vm.userData.username;
        }

        $scope.redirect = function(){
            if(vm.userData === undefined){
                $state.go('single_snippet', {snippetID:vm.snippetID});
            }
            else if(vm.userData.role == "USER"){
                $state.go('single_snippet', {snippetID:vm.snippetID});
            //    $window.location.href = "http://" + $window.location.host + "/#!/get_all_snippets_user";
            }
        }


        function createComment () {
         //   console.log("USAO U KREIRANJE COMMENTA");
            if(!$scope.commentForm.$valid){
                alert("Enter comment content!");
                return;
            }

            vm.new_comment = {
                description : vm.newComment.description,
                user : vm.username,
                snippet: vm.snippetID

            }

            $http.post('/api/comment/create', vm.new_comment).then(function (response) {

                $scope.redirect();

            },function(response){
                alert("You are blocked and unable to proceed this function!");
            });



        }
    }
})();