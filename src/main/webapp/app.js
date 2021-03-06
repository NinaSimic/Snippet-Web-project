
(function(angular) {
    'use strict';
    angular
        .module('snippetApp', [
            'ngResource',
            'ngRoute',
            'ngCookies',
            'restangular',
            'ui.router',
            'ui.ace',
            'ngFileUpload',
            'ngMap'
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
                .state('login', {
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
                            templateUrl: 'app/user/reg_user/reg_user_profile.html',
                            controller: 'RegUserController',
                            controllerAs: 'regUserCtrl'
                        },
                        'navbar': {
                            templateUrl: 'app/navbar/navbar.html',
                            controller: 'NavbarController',
                            controllerAs: 'navbarCtrl'
                        }
                    }
                    ,  params: {
                        'snippetID': null
                    }
                })
                .state('user_modify', {
                    url: '/user_modify',
                    views: {
                        'content': {
                            templateUrl: 'app/user/reg_user/reg_user_modify.html',
                            controller: 'RegUserController',
                            controllerAs: 'regUserCtrl'
                        },
                        'navbar': {
                            templateUrl: 'app/navbar/navbar.html',
                            controller: 'NavbarController',
                            controllerAs: 'navbarCtrl'
                        }
                    }
                })
                .state('get_all_snippets_user', {
                    url: '/get_all_snippets_user',
                    views: {
                        'content': {
                            templateUrl: 'app/user/reg_user/get_all_snippets_user.html',
                            controller: 'AllSnippetsUserController',
                            controllerAs: 'allSnippetsUserCtrl'
                        },
                        'navbar': {
                            templateUrl: 'app/navbar/navbar.html',
                            controller: 'NavbarController',
                            controllerAs: 'navbarCtrl'
                        }
                    }
                })
                .state('single_snippet', {
                    url: '/single_snippet',
                    views: {
                        'content': {
                            templateUrl: 'app/snippet/single_snippet.html',
                            controller: 'SingleSnippetController',
                            controllerAs: 'singleSnippetCtrl'
                        },
                        'navbar': {
                            templateUrl: 'app/navbar/navbar.html',
                            controller: 'NavbarController',
                            controllerAs: 'navbarCtrl'
                        }
                    }
                    ,  params: {
                        'snippetID': null
                    }
                })
                .state('add_comment', {
                    url: '/add_comment',
                    views: {
                        'content': {
                            templateUrl: 'app/comment/add_comment.html',
                            controller: 'AddCommentController',
                            controllerAs: 'addCommentCtrl'
                        },
                        'navbar': {
                            templateUrl: 'app/navbar/navbar.html',
                            controller: 'NavbarController',
                            controllerAs: 'navbarCtrl'
                        }
                    }
                    ,  params: {
                        'snippetID': null
                    }
                })
                .state('profile_admin', {
                    url: '/profile_admin',
                    views: {
                        'content': {
                            templateUrl: 'app/user/admin/admin_profile.html',
                            controller: 'AdminController',
                            controllerAs: 'adminCtrl'
                        },
                        'navbar': {
                            templateUrl: 'app/navbar/navbar_admin.html',
                            controller: 'NavbarAdminController',
                            controllerAs: 'navbarAdminCtrl'
                        }
                    }
                })
                .state('admin_modify', {
                    url: '/admin_modify',
                    views: {
                        'content': {
                            templateUrl: 'app/user/admin/admin_modify.html',
                            controller: 'AdminController',
                            controllerAs: 'adminCtrl'
                        },
                        'navbar': {
                            templateUrl: 'app/navbar/navbar_admin.html',
                            controller: 'NavbarAdminController',
                            controllerAs: 'navbarAdminCtrl'
                        }
                    }
                })
                .state('add_snippet_admin', {
                    url: '/add_snippet_admin',
                    views: {
                        'content': {
                            templateUrl: 'app/snippet/add_snippet_admin.html',
                            controller: 'AddSnippetAdminController',
                            controllerAs: 'addSnippetAdminCtrl'
                        },
                        'navbar': {
                            templateUrl: 'app/navbar/navbar_admin.html',
                            controller: 'NavbarAdminController',
                            controllerAs: 'navbarAdminCtrl'
                        }
                    }
                })
                .state('add_prog_language', {
                    url: '/add_prog_language',
                    views: {
                        'content': {
                            templateUrl: 'app/language/add_prog_language.html',
                            controller: 'ProgLanguageController',
                            controllerAs: 'progLanguageCtrl'
                        },
                        'navbar': {
                            templateUrl: 'app/navbar/navbar_admin.html',
                            controller: 'NavbarAdminController',
                            controllerAs: 'navbarAdminCtrl'
                        }
                    }
                })
                .state('block_user', {
                    url: '/block_user',
                    views: {
                        'content': {
                            templateUrl: 'app/user/admin/block_user.html',
                            controller: 'BlockUserController',
                            controllerAs: 'blockUserCtrl'
                        },
                        'navbar': {
                            templateUrl: 'app/navbar/navbar_admin.html',
                            controller: 'NavbarAdminController',
                            controllerAs: 'navbarAdminCtrl'
                        }
                    }
                })
                .state('get_all_snippets_admin', {
                    url: '/get_all_snippets_admin',
                    views: {
                        'content': {
                            templateUrl: 'app/user/admin/get_all_snippets_admin.html',
                            controller: 'AllSnippetsAdminController',
                            controllerAs: 'AllSnippetsAdminCtrl'
                        },
                        'navbar': {
                            templateUrl: 'app/navbar/navbar_admin.html',
                            controller: 'NavbarAdminController',
                            controllerAs: 'navbarAdminCtrl'
                        }
                    }
                })
                .state('add_comment_admin', {
                    url: '/add_comment_admin',
                    views: {
                        'content': {
                            templateUrl: 'app/comment/add_comment_admin.html',
                            controller: 'AddCommentAdminController',
                            controllerAs: 'AddCommentAdminCtrl'
                        },
                        'navbar': {
                            templateUrl: 'app/navbar/navbar_admin.html',
                            controller: 'NavbarAdminController',
                            controllerAs: 'navbarAdminCtrl'
                        }
                    }
                    ,  params: {
                        'snippetID': null
                    }
                })
                .state('upload_image', {
                    url: '/upload_image',
                    views: {
                        'content': {
                            templateUrl: 'app/auth/register/upload_image.html',
                            controller: 'UploadImageController',
                            controllerAs: 'uploadImageCtrl'
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

                .state('single_snippet_admin', {
                    url: '/single_snippet_admin',
                    views: {
                        'content': {
                            templateUrl: 'app/snippet/single_snippet_admin.html',
                            controller: 'SingleSnippetAdminController',
                            controllerAs: 'SingleSnippetAdminCtrl'
                        },
                        'navbar': {
                            templateUrl: 'app/navbar/navbar_admin.html',
                            controller: 'NavbarAdminController',
                            controllerAs: 'navbarAdminCtrl'
                        }
                    }
                    ,  params: {
                        'snippetID': null
                    }
                })

                .state('get_all_snippets_notlogged', {
                    url: '/get_all_snippets_notlogged',
                    views: {
                        'content': {
                            templateUrl: 'app/user/not_logged/get_all_snippets_notlogged.html',
                            controller: 'AllSnippetsNotloggedController',
                            controllerAs: 'allSnippetsNotloggedCtrl'
                        },
                        'navbar': {
                            templateUrl: 'app/navbar/navbar.html',
                            controller: 'NavbarController',
                            controllerAs: 'navbarCtrl'
                        }
                    }
                })

            /*
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
                      });*/




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
                  ]);

    })


})(angular);
