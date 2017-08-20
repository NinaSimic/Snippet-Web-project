
(function(angular) {
    'use strict';
    angular
        .module('snippetApp', [
            'ngResource',
            'ngRoute',
            'ngCookies',
            'restangular',
            'ui.router',
            'ui.ace'
        ])
        .config(function($routeProvider,$stateProvider,$urlRouterProvider, $httpProvider){

            $urlRouterProvider.otherwise("/home");
            $stateProvider
                .state('notLoggedHome', {
                    url: '/home',
                    views: {
                        'content': {
                            templateUrl: 'app/static/notlogged_home.html',
                        },
                        'navbar': {
                            templateUrl: 'app/navbar/navbar.html',
                            controller: 'NavbarController',
                            controllerAs: 'navbarCtrl'
                        }
                    },

                })
                .state('register', {
                    url: '/register',
                    views: {
                        'content': {
                            templateUrl: 'app/auth/register/register.html',
                            controller: 'RegisterController',
                            controllerAs: 'registerCtrl'
                        },
                        'navbar': {
                            templateUrl: 'app/navbar/navbar.html',
                            controller: 'NavbarController',
                            controllerAs: 'navbarCtrl'
                        }
                    }
                })
                .state('addSnippet', {
                    url: '/addSnippet',
                    views: {
                        'content': {
                            templateUrl: 'app/snippet/addSnippet.html',
                            controller: 'AddSnippetController',
                            controllerAs: 'addSnippetCtrl'
                        },
                        'navbar': {
                            templateUrl: 'app/navbar/navbar.html',
                            controller: 'NavbarController',
                            controllerAs: 'navbarCtrl'
                        }
                    }
                })
         /*       .state('login', {
                    url: '/login',
                    views: {
                        'content': {
                            templateUrl: 'app/auth/login/login.html',
                            controller: 'LoginController',
                            controllerAs: 'loginCtrl'
                        },
                        'navbar': {
                            templateUrl: 'app/navbar/navbar.html',
                            controller: 'NavbarController',
                            controllerAs: 'navbarCtrl'
                        }
                    }
                })

                .state('profile', {
                    url: '/profile',
                    views: {
                        'content': {
                            templateUrl: 'app/user/owner/owner_profile.html',
                            controller: 'OwnerController',
                            controllerAs: 'ownerCtrl'
                        },
                        'navbar': {
                            templateUrl: 'app/navbar/navbar.html',
                            controller: 'NavbarController',
                            controllerAs: 'navbarCtrl'
                        }
                    }
                })
                .state('ownerModify', {
                    url: '/owner_modify',
                    views: {
                        'content': {
                            templateUrl: 'app/user/owner/owner_modify.html',
                            controller: 'OwnerModifyController',
                            controllerAs: 'ownerModifyCtrl'
                        },
                        'navbar': {
                            templateUrl: 'app/navbar/navbar.html',
                            controller: 'NavbarController',
                            controllerAs: 'navbarCtrl'
                        }
                    }
                })
                .state('admin', {
                    url: '/admin',
                    views: {
                        'content': {
                            templateUrl: 'app/user/admin/admin_profile.html',
                            controller: 'AdminController',
                            controllerAs: 'adminCtrl'
                        },
                        'navbar': {
                            templateUrl: 'app/navbar/navbarAdmin.html',
                            controller: 'NavbarAdminController',
                            controllerAs: 'navbarAdminCtrl'
                        }
                    }
                })
                .state('adminModify', {
                    url: '/admin_modify',
                    views: {
                        'content': {
                            templateUrl: 'app/user/admin/modify/adminModify.html',
                            controller: 'AdminModifyController',
                            controllerAs: 'adminModifyCtrl'
                        },
                        'navbar': {
                            templateUrl: 'app/navbar/navbarAdmin.html',
                            controller: 'NavbarAdminController',
                            controllerAs: 'navbarAdminCtrl'
                        }
                    }
                })
                .state('addAdmin', {
                    url: '/add_admin',
                    views: {
                        'content': {
                            templateUrl: 'app/user/admin/addAdmin/addAdmin.html',
                            controller: 'AddAdminController',
                            controllerAs: 'addAdminCtrl'
                        },
                        'navbar': {
                            templateUrl: 'app/navbar/navbarAdmin.html',
                            controller: 'NavbarAdminController',
                            controllerAs: 'navbarAdminCtrl'
                        }
                    }
                })
                .state('addVerifier', {
                    url: '/add_verifier',
                    views: {
                        'content': {
                            templateUrl: 'app/user/admin/addVerifier/addVerifier.html',
                            controller: 'AddVerifierController',
                            controllerAs: 'addVerifierCtrl'
                        },
                        'navbar': {
                            templateUrl: 'app/navbar/navbarAdmin.html',
                            controller: 'NavbarAdminController',
                            controllerAs: 'navbarAdminCtrl'
                        }
                    }
                })
                .state('eraseOwner', {
                    url: '/erase_owner',
                    views: {
                        'content': {
                            templateUrl: 'app/user/admin/eraseOwner/eraseOwner.html',
                            controller: 'EraseOwnerController',
                            controllerAs: 'eraseOwnerCtrl'
                        },
                        'navbar': {
                            templateUrl: 'app/navbar/navbarAdmin.html',
                            controller: 'NavbarAdminController',
                            controllerAs: 'navbarAdminCtrl'
                        }
                    }
                })
                .state('eraseVerifier', {
                    url: '/erase_verifier',
                    views: {
                        'content': {
                            templateUrl: 'app/user/admin/eraseVerifier/eraseVerifier.html',
                            controller: 'EraseVerifierController',
                            controllerAs: 'eraseVerifierCtrl'
                        },
                        'navbar': {
                            templateUrl: 'app/navbar/navbarAdmin.html',
                            controller: 'NavbarAdminController',
                            controllerAs: 'navbarAdminCtrl'
                        }
                    }
                })
                .state('approveCompany', {
                    url: '/approve_company',
                    views: {
                        'content': {
                            templateUrl: 'app/user/admin/approveCompany/approveCompany.html',
                            controller: 'ApproveCompanyController',
                            controllerAs: 'approveCompanyCtrl'
                        },
                        'navbar': {
                            templateUrl: 'app/navbar/navbarAdmin.html',
                            controller: 'NavbarAdminController',
                            controllerAs: 'navbarAdminCtrl'
                        }
                    }
                })
                .state('approvePrivateAccount', {
                    url: '/approve_private_account',
                    views: {
                        'content': {
                            templateUrl: 'app/user/company/approvePrivateAccount/approvePrivateAccount.html',
                            controller: 'ApprovePrivateAccountController',
                            controllerAs: 'approvePrivateAccountCtrl'
                        },
                        'navbar': {
                            templateUrl: 'app/navbar/navbarAdmin.html',
                            controller: 'NavbarAdminController',
                            controllerAs: 'navbarAdminCtrl'
                        }
                    }
                })
                .state('verifyer', {
                    url: '/verifyer',
                    views: {
                        'content': {
                            templateUrl: 'app/user/verifyer/verifyerProfile.html',
                            controller: 'VerifyerController',
                            controllerAs: 'verifyerCtrl'
                        },
                        'navbar': {
                            templateUrl: 'app/navbar/navbarVerifier.html',
                            controller: 'NavbarVerifierController',
                            controllerAs: 'navbarCtrl'
                        }
                    }
                })
                .state('verifyerModify', {
                    url: '/verifyer_modify',
                    views: {
                        'content': {
                            templateUrl: 'app/user/verifyer/verifyerModify.html',
                            controller: 'VerifyerModifyController',
                            controllerAs: 'verifyerModifyCtrl'
                        },
                        'navbar': {
                            templateUrl: 'app/navbar/navbarVerifier.html',
                            controller: 'NavbarVerifierController',
                            controllerAs: 'navbarCtrl'
                        }
                    }
                })
                .state('approveAdvertisement', {
                    url: '/approve_advertisement',
                    views: {
                        'content': {
                            templateUrl: 'app/user/verifyer/approveAdvertisement/approveAdvertisement.html',
                            controller: 'ApproveAdvertisementController',
                            controllerAs: 'approveAdvertisementCtrl'
                        },
                        'navbar': {
                            templateUrl: 'app/navbar/navbarVerifier.html',
                            controller: 'NavbarVerifierController',
                            controllerAs: 'navbarCtrl'
                        }
                    }
                })
                .state('reportBanedAdvertisement', {
                    url: '/report_baned_advertisement',
                    views: {
                        'content': {
                            templateUrl: 'app/user/verifyer/approveAdvertisement/reportBannedAdvertisement.html',
                            controller: 'ReportBanedAdvertisementController',
                            controllerAs: 'reportBanedAdvertisementCtrl'
                        },
                        'navbar': {
                            templateUrl: 'app/navbar/navbarVerifier.html',
                            controller: 'NavbarVerifierController',
                            controllerAs: 'navbarCtrl'
                        }
                    }
                })
                .state('listing', {
                    url: '/listings',
                    views: {
                        'content': {
                            templateUrl: 'app/advertisement/getAllListings.html',
                            controller: 'GetAllListingsController',
                            controllerAs: 'getAllListingsCtrl'
                        },
                        'navbar': {
                            templateUrl: 'app/navbar/navbar.html',
                            controller: 'NavbarController',
                            controllerAs: 'navbarCtrl'
                        }
                    }
                })
                .state('about', {
                    url: '/about',
                    views: {
                        'content': {
                            templateUrl: 'app/static/about.html',

                        },
                        'navbar': {
                            templateUrl: 'app/navbar/navbar.html',
                            controller: 'NavbarController',
                            controllerAs: 'navbarCtrl'
                        }
                    }
                })
                .state('contact', {
                    url: '/contact',
                    views: {
                        'content': {
                            templateUrl: 'app/static/contact.html'
                        },
                        'navbar': {
                            templateUrl: 'app/navbar/navbar.html',
                            controller: 'NavbarController',
                            controllerAs: 'navbarCtrl'
                        }
                    }
                })
                .state('single', {
                    url: '/single_advertisement',
                    views: {
                        'content': {
                            templateUrl: 'app/advertisement/singleAdvertisement.html',
                            controller: 'SingleAdvertisementController',
                            controllerAs: 'singleAdvertisementCtrl'
                        },
                        'navbar': {
                            templateUrl: 'app/navbar/navbar.html',
                            controller: 'NavbarController',
                            controllerAs: 'navbarCtrl'
                        }
                    }
                })
                .state('addNewAdvertisement', {
                    url: '/add_new_advertisement',
                    views: {
                        'content': {
                            templateUrl: 'app/advertisement/addNewAdvertisement.html',
                            controller: 'AddNewAdvertisementController',
                            controllerAs: 'addNewAdvertisementCtrl'
                        },
                        'navbar': {
                            templateUrl: 'app/navbar/navbar.html',
                            controller: 'NavbarController',
                            controllerAs: 'navbarCtrl'
                        }
                    }
                })
                .state('addNewRealEstate', {
                    url: '/add_new_real_estate',
                    views: {
                        'content': {
                            templateUrl: 'app/realEstate/addNewRealEstate.html',
                            controller: 'AddNewRealEstateController',
                            controllerAs: 'addNewRealEstateCtrl'
                        },
                        'navbar': {
                            templateUrl: 'app/navbar/navbar.html',
                            controller: 'NavbarController',
                            controllerAs: 'navbarCtrl'
                        }
                    }
                })
                .state('getAllRealEstates', {
                    url: '/get_all_real_estates',
                    views: {
                        'content': {
                            templateUrl: 'app/realEstate/getAllRealEstates.html',
                            controller: 'GetAllRealEstatesController',
                            controllerAs: 'getAllRealEstatesCtrl'
                        },
                        'navbar': {
                            templateUrl: 'app/navbar/navbar.html',
                            controller: 'NavbarController',
                            controllerAs: 'navbarCtrl'
                        }
                    }
                })
                .state('sendRequest', {
                    url: '/send_request',
                    views: {
                        'content': {
                            templateUrl: 'app/advertisement/sendRequest.html',
                            controller: 'sendRequestController',
                            controllerAs: 'sendRequestCtrl'
                        },
                        'navbar': {
                            templateUrl: 'app/navbar/navbar.html',
                            controller: 'NavbarController',
                            controllerAs: 'navbarCtrl'
                        }
                    }
                })
                .state('filterAdvertisement', {
                url: '/filterAdvertisement',
                views: {
                    'content': {
                        templateUrl: 'app/advertisement/filterAdvertisement.html',
                        controller: 'FilterAdvertisementController',
                        controllerAs: 'filterAdvertisementCtrl'
                    },
                    'navbar': {
                        templateUrl: 'app/navbar/navbar.html',
                        controller: 'NavbarController',
                        controllerAs: 'navbarCtrl'
                    }
                }

            })


                .state('verify', {
                    url: '/authenticate/{id:int}',
                    templateUrl: 'page/authentication.html',
                    controller: 'verificationController'
                });




            $httpProvider
                .interceptors.push(['$q', '$window',
                function($q, $window) {
                    return {
                        'request': function(config) {
                            config.headers = config.headers || {};
                            if($window.localStorage.token) {
                                config.headers["X-Auth-Token"] = $window.localStorage.token;
                            }
                            return config;
                        },
                        'responseError': function(response) {
                            if (response.status === 401 || response.status === 403) {

                                console.log("nesto kod interseptora je pogresno");
                            }
                            return $q.reject(response);
                        }
                    };
                }
            ]);*/

    })


})(angular);
