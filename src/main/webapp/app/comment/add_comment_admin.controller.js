
(function () {

    angular.module("snippetApp")
        .controller('AddCommentAdminController',addCommentAdminController);

    function addCommentAdminController($http, $scope, $state, $window, $stateParams) {

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
          if(vm.userData.role == "ADMIN"){
              $state.go('single_snippet_admin', {snippetID:vm.snippetID});
            }
        }


        function createComment () {
            //     console.log("USAO U KREIRANJE COMMENTA");
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