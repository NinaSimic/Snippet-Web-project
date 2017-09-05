/**
 * Created by Korisnik on 6/11/2017.
 */
(function () {

    angular.module("snippetApp")
        .controller('UploadImageController',uploadImageController);

    //register page controller
    function uploadImageController( $scope, $window, Upload) {

        var vm = this;
        vm.uploadImage = uploadImage;
        vm.file = null;
        vm.image = "/images/no-image.png";


        vm.redirect = function(){
            $window.location.href = "http://" + $window.location.host + "/#!/login";
        }


        function uploadImage () {

                Upload.upload({
                    url: '/api/users/uploadImage',
                    data: {file: vm.file, 'id': $window.localStorage.getItem("id")}
                }).then(function (response) {
                   // console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                    alert(response.data.message);
                    vm.image = response.data.message;
                    //vm.image = response.data;

                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });
            };

    }
})();