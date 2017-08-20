
(function () {

    angular.module("snippetApp")
        .controller('AddSnippetController',AddSnippetController);


    //register page controller
    function AddSnippetController($http, $scope, $window, LanguageService) {

        var vm = this;
        vm.createSnippet = createSnippet;
        vm.types = [];
        vm.ace = null;

        $scope.modes = [];
        $scope.mode = [];


        $scope.aceLoaded = function(_editor) {
            // Options
            vm.ace = _editor;
          //  _editor.setReadOnly(true);
        };


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

     /*   $scope.redirect = function(){
            $window.location.href = "http://" + $window.location.host + "/#!/login";

        }*/


        function createSnippet () {
            console.log("USAO U KREIRANJE SNIPPETA");
            vm.new_snippet = {
                description : vm.newSnippet.description,
                clip : vm.ace.getValue(),
                language: vm.newSnippet.language,
                end_date : vm.newSnippet.end_date
            }


            console.log("novi snippet: " + JSON.stringify(vm.new_snippet) );


            $http.post('/api/snippet/create', vm.new_snippet).then(function (response) {

              //  $scope.redirect();

            },function(response){
                alert("Create new snippet failed");
            });



        }
    }
})();