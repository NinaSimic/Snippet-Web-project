(function() {
    angular.module("snippetApp").controller("AllSnippetsUserController", allSnippetsUserController);

    function allSnippetsUserController($http, $state, $scope, LanguageService) {
        var vm = this;
        vm.getAllSnippets = getAllSnippets;
        vm.types = [];
        $scope.modes = [];
        $scope.mode = [];
        vm.backupSnippets = [];
        vm.expirations = [ {name:"ALL", duration: 99999999}, { name: "NEVER", duration: -1},{ name: "2 minutes", duration: 2*60*1000}, { name: "10 days", duration: 10*24*3600*1000}, { name: "1 month", duration: 30*24*3600*1000}] ;

        vm.filterConteiner = {
            description: null,
            language: null,
            date: null,
            end_date: vm.expirations[0].name
        };

        getAllSnippets();

        vm.setFilter = function () {
            var filtered_snippets = [];

            for (var i = 0; i < vm.backupSnippets.length; i++) {
                var found = false;
                if (vm.filterConteiner.description !== null && vm.filterConteiner.description !== "") {
                    var description = vm.filterConteiner.description.split(" ");
                    console.log("des " + description);
                    for (var j = 0; j < description.length; j++) {
                        if (vm.backupSnippets[i].description.indexOf(description[j]) !== -1) {
                            found = true;
                        }
                    }
                    if (!found) {
                        continue;
                    }
                }

                if (vm.filterConteiner.language !== null && vm.filterConteiner.language !== "Not Selected") {
                    found = false;
                    if (vm.backupSnippets[i].language.name === vm.filterConteiner.language) {
                        found = true;
                    }

                    if (!found) {
                        continue;
                    }
                }

                if (vm.filterConteiner.end_date !== null

                    && vm.filterConteiner.end_date !== "ALL") {
                    found = false;
                    var duration = -1;

                    for(var j = 0; j < vm.expirations.length; j++){
                        if(vm.filterConteiner.end_date === vm.expirations[i].name){
                            duration = vm.expirations[i].duration;
                        }
                    }



                    var currentPlusSelected = Date.now() + duration; // sada + 2 minuta
                    var endDate = vm.backupSnippets[i].creation_date + vm.backupSnippets[i].end_date;





                    if (endDate <= currentPlusSelected) {
                        found = true;
                    }

                    if (!found) {
                        continue;
                    }
                }

                filtered_snippets.push(vm.backupSnippets[i]);
            }
            vm.allSnippets = filtered_snippets;
        };

        LanguageService.getAllLanguages().then(function (response) {
            vm.types = response.data;
            vm.types.unshift({id:-1, name:"Not Selected"});
            for (var i = 0; i < vm.types.length; i++) {
                $scope.modes.push(vm.types[i].name);

            }
            vm.filterConteiner.language =  vm.types[0].name;
            $scope.mode = $scope.modes[0];
            console.log("imena jezika: ", $scope.mode);

        }).catch(function (err) {

        });

        vm.getDetails = function (id) {
            $state.go('single_snippet', {snippetID: id});
        };

        function getAllSnippets() {

            $http.get('/api/snippet/getAllSnippets')
                .then(function(response) {
                    vm.allSnippets = response.data;
                    for(var i = 0; i < vm.allSnippets.length; i++){
                        vm.allSnippets[i].end_date += vm.allSnippets[i].creation_date;
                        vm.allSnippets[i].end_date = new Date(vm.allSnippets[i].end_date);
                    }
                    vm.backupSnippets = response.data;
                }, function(response) {
                    alert(JSON.stringify(response.data));
                });
        }

        vm.addComment = function (id) {

            //$window.location.href = "http://" + $window.location.host + "/#!/activateSednica";
            $state.go('add_comment', {snippetID:id});

        }
    }
})();

