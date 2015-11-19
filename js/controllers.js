var phoneControllers = angular.module('phoneControllers', []);

phoneControllers.controller('UserListCtrl', ['$scope', '$http',
    function($scope, $http) {
        $('#create_user').show();
        $('#update_user').hide();
        $http.post("sqlfile/insertuser.php", {'action': 'listing'})
                .success(function(response) {
                    console.log(response);
                    $scope.names = response;
                });


        // $scope.orderProperty = 'age';
    }]);
phoneControllers.controller('UserUpdateCtrl', ['$scope', '$http', '$routeParams',
    function($scope, $http, $routeParams, $location) {
        $('#create_user').hide();
        $('#update_user').show();
        $http.post("sqlfile/insertuser.php", {'action': 'updatelisting', 'userId': $routeParams})
                .success(function(response) {
//                    console.log(response);
                    $scope.newFriend = response;
                });


        // $scope.orderProperty = 'age';
        $scope.updateUser = function() {

            $http.post("sqlfile/insertuser.php", {'action': 'updateUser', 'fstname': $scope.newFriend.fname, 'lstname': $scope.newFriend.lname, 'params': $routeParams})
                    .success(function(response) {

                        console.log(response);
                        $scope.newFriend = response;
//                         $location.path('#/user/update');
                        window.location.reload();

                    });
        }
    }


]);
phoneControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams',
    function($scope, $routeParams) {
        $scope.phoneId = $routeParams.phoneId;
        console.log($scope.phoneId);
    }]);
//phoneControllers.controller('UserCreateCtrl', ['$scope', '$routeParams',
//    function($scope, $routeParams,$http) {
//        $scope.addNewFriend = function(add,$http) {
////            var data = {
////                fname: $scope.newFriend.fname,
////                lname: $scope.newFriend.lname
////            }
//            $http.post("../sqlfile/insertuser.php", {'fstname': $scope.newFriend.fname, 'lstname': $scope.newFriend.lname})
//                    .success(function(data, status, headers, config) {
//                        console.log("inserted Successfully");
//                    });
//            $scope.friends.push(data);
//            $scope.newFriend = {
//                fname: "",
//                lname: ""
//            };
//        };
//    }]);

//
phoneControllers.controller('UserCreateCtrl', function($scope, $http) {

    $scope.addNewFriend = function() {
        $http.post("sqlfile/insertuser.php", {'fstname': $scope.newFriend.fname, 'lstname': $scope.newFriend.lname})
                .success(function(data, status, headers, config) {
                    console.log("inserted Successfully");
                    window.location.reload();
                    $scope.newFriend = {
                        fname: "",
                        lname: ""
                    };
                });
    }
//    $scope.onFileSelect = function() {
//        console.log("inserted Successfully");
//        $http.post("sqlfile/insertuser.php", {'fstname': $scope.newFriend.fname, 'lstname': $scope.newFriend.lname})
//                .success(function(data, status, headers, config) {
//                    console.log("inserted Successfully");
//                    window.location.reload();
//                    $scope.newFriend = {
//                        fname: "",
//                        lname: ""
//                    };
//                });
//    }
});


//phoneControllers.controller('UserCreateCtrl', function($scope, $http) {
//
//    $scope.upload = function($scope, $routeParams, $http) {
//        console.log("hii");
//        $http.post("sqlfile/insertuser.php", $scope.files, {'headers': {'Contet-Type': 'multipart/form-data'}})
//                .success(function(data, status, headers, config) {
//                    $('#create_user').show();
//                    $('#update_user').hide();
//                    console.log("inserted Successfully");
//                    window.location.reload();
//                    $scope.newFriend = {
//                        fname: "",
//                        lname: ""
//                    };
//                });
//    }
//});

//inject angular file upload directives and service. 
//angular.module('phonecatApp', ['angularFileUpload']);
//// 
//var phoneControllers = [ '$scope', '$upload', function($scope, $upload) {
//  $scope.onFileSelect = function($files) {
//      console.log("hii");
//    //$files: an array of files selected, each file has name, size, and type. 
//    for (var i = 0; i < $files.length; i++) {
//      var file = $files[i];
//      $scope.upload = $upload.upload({
//        url: 'server/upload/url', //upload.php script, node.js route, or servlet url 
//        
//        data: {myObj: $scope.myModelObj},
//        file: file, // or list of files ($files) for html5 only 
//        
//      }).progress(function(evt) {
//        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
//      }).success(function(data, status, headers, config) {
//        // file is uploaded successfully 
//        console.log(data);
//      });
//    
//    }
//    
//  };
//}];


