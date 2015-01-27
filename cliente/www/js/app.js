// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform,$rootScope, $ionicLoading) {
	 $rootScope.$on('loading:show', function() {
		    $ionicLoading.show({template: 'Loading'})
		  })

		  $rootScope.$on('loading:hide', function() {
		    $ionicLoading.hide()
		  })
		  
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
	  
})

.config(function($stateProvider, $urlRouterProvider,$httpProvider) {
	$httpProvider.interceptors.push(function($rootScope) {
	    return {
	      request: function(config) {
	        $rootScope.$broadcast('loading:show')
	        return config
	      },
	      response: function(response) {
	        $rootScope.$broadcast('loading:hide')
	        return response
	      }
	    }
	  })
	  
	$stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.search', {
      url: "/search",
      views: {
        'menuContent' :{
          templateUrl: "templates/search.html"
        }
      }
    })

    .state('app.browse', {
      url: "/browse",
      views: {
        'menuContent' :{
          templateUrl: "templates/browse.html"
        }
      }
    })
    
    .state('app.map', {
      url: "/map",
      views: {
        'menuContent' :{
          templateUrl: "templates/map.html",
          controller: 'MapCtrl'
        }
      }
    })

    .state('app.venues', {
      url: "/venues",
      views: {
        'menuContent' :{
          templateUrl: "templates/venues.html",
          controller: 'VenuesCtrl'
        }
      }
    })
    
    .state('app.venuesSearch', {
      url: "/venuesSearch",
      views: {
        'menuContent' :{
          templateUrl: "templates/venuesSearch.html",
          controller: 'VenuesSearchCtrl'
        }
      }
    })
    
    .state('app.venuesList', {
      url: "/venuesList?address&radius",
      views: {
        'menuContent' :{
          templateUrl: "templates/venuesList.html",
          controller: 'VenuesListCtrl'
        }
      }
    })
    
    .state('app.promotionsSearch', {
      url: "/promotionsSearch",
      views: {
        'menuContent' :{
          templateUrl: "templates/promotionsSearch.html",
          controller: 'PromotionsSearchCtrl'
        }
      }
    })
    
    .state('app.promotionsList', {
      url: "/promotionsList?address&radius",
      views: {
        'menuContent' :{
          templateUrl: "templates/promotionsList.html",
          controller: 'PromotionsListCtrl'
        }
      }
    })
   
    .state('app.promotionDetails', {
      url: "/promotionDetails?esercenteNome&distance&class&id&dataFine&dataInizio&descrizione&prezzo&imageUrl&titolo",
      views: {
        'menuContent' :{
          templateUrl: "templates/promotionDetails.html",
          controller: 'PromotionDetailsCtrl'
        }
      }
    })
    
    .state('app.venueDetail', {
      url: "/venues/:venueId",
      views: {
        'menuContent' :{
          templateUrl: "templates/venue.html",
          controller: 'VenueCtrl'
        }
      }
    })
    
    .state('app.venuePhoto', {
      url: "/venues/:venueId/:photoId",
      views: {
        'menuContent' :{
          templateUrl: "templates/venuePhoto.html",
          controller: 'VenuePhotoCtrl'
        }
      }
    })

    .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })

    .state('app.single', {
      url: "/playlists/:playlistId",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlist.html",
          controller: 'PlaylistCtrl'
        }
      }
    })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/venuesSearch');
});

