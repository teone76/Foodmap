// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.services', 'starter.controllers'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {
    
    $stateProvider
    
    .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'AppCtrl'
    })

    .state('app.editofferta', {
        cache: false,
        url: "/editofferta",
        views: {
            'menuContent': {
                templateUrl: "templates/editofferta.html",
                controller: 'EditOffertaCtrl'
            }
        }
    })
     
    .state('app.listofferte', {
        cache: false,
        url: "/listofferte",
        views: {
            'menuContent' :{
                templateUrl: "templates/listofferte.html",
                controller: 'ListOfferteCtrl'
            }
        }
    })

    .state('app.viewofferta', {
        cache: false,
        url: "/listofferte/:offertaId",
        views: {
            'menuContent': {
                templateUrl: "templates/viewofferta.html",
                controller: 'ViewOffertaCtrl'
            }
        }
    })
    
    .state('app.intro', {
        url: "/intro",
        views: {
            'menuContent': {
                templateUrl: "templates/intro.html"
            }
        }
    });
    
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/intro');
});
