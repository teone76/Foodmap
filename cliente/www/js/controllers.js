angular.module('starter.controllers', [])



.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
	
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})




.controller('VenuesCtrl', function($scope, $http) {
	 
	  
	 var str1 = "https://api.foursquare.com/v2/venues/search?radius=5000&ll=";
	 var str2 = "";
	 var str3 = "&client_id=2ELLTUE0XN5NMZ2UZJK1GBLDM5HVIO3551HGCVRR5ACMT20P&client_secret=BYY515Q3JCJB5X2IDJNSRAINOXYWTRRCK1VDRFCMVZDIEEVF&v=20141020&categoryId=4d4b7105d754a06374d81259";
	 var result = "";
	 
	 function update(url){		
	     	
	     	$http.get(url).then(function(resp) {     		
	     		console.log(resp)
	     		$scope.venues =  resp.data.response.venues;
	  }, function(err) {
	    console.error('ERR', err);
	    // err.status will contain the status code
	  }) 
	 }
	 
	 function success(pos) {		 
		 //alert('Posizione rilevata: ' + pos.coords.latitude + ' - ' + pos.coords.longitude);
		 str2 = pos.coords.latitude + ',' + pos.coords.longitude;
		 str1 = "https://api.foursquare.com/v2/venues/search?radius=5000&ll=";		 
		 str3 = "&client_id=2ELLTUE0XN5NMZ2UZJK1GBLDM5HVIO3551HGCVRR5ACMT20P&client_secret=BYY515Q3JCJB5X2IDJNSRAINOXYWTRRCK1VDRFCMVZDIEEVF&v=20141020&categoryId=4d4b7105d754a06374d81259";
		 result = str1 + str2 + str3;
		 update(result);
		 
     }
 
	 function error(err) {
     	  console.warn('ERROR(' + err.code + '): ' + err.message);
     	  alert('Posizione GPS non rilevata');
     	  str2 = "44,12";
     	  result = str1 + str2 + str3;
 		  update(result);  
     	};
 
     	var options = {
       		  enableHighAccuracy: true,
       		  timeout: 5000,
       		  maximumAge: 0    
     	};        
    	    	
     	
     	  // Close the new task modal
     	$scope.updateVenues = function() {
     		if (document.getElementById("addressInput").value=='') {
     			navigator.geolocation.getCurrentPosition(success,error,options);
     		} else { 
     			var strMap1 = "https://maps.googleapis.com/maps/api/geocode/json?address=";
         		var strMap2 = document.getElementById("addressInput").value;
         		var strMapFinal = strMap1 + strMap2 + "&key=AIzaSyBpBEroQRBrqaXsN8MfKUpQ2PXdJ6MatVI";
         		
         		var urlMap = strMapFinal.replace(/ /g, '+');
         		alert(urlMap);
         		$http.get(urlMap).then(function(resp) {     		
    	     		console.log(resp);
    	     		//resp.data.response.venues;
    	     		//alert(resp.data.results[0].geometry.location.lat + " " + resp.data.results[0].geometry.location.lng);
    	     		str2 = resp.data.results[0].geometry.location.lat + ',' + resp.data.results[0].geometry.location.lng;
    	   		    str1 = "https://api.foursquare.com/v2/venues/search?radius=5000&ll=";		 
    	   		    str3 = "&client_id=2ELLTUE0XN5NMZ2UZJK1GBLDM5HVIO3551HGCVRR5ACMT20P&client_secret=BYY515Q3JCJB5X2IDJNSRAINOXYWTRRCK1VDRFCMVZDIEEVF&v=20141020&categoryId=4d4b7105d754a06374d81259";
    	   		    result = str1 + str2 + str3;
    	   		   document.getElementById("addressInput").value=resp.data.results[0].formatted_address;    	   		   
    	   		   update(result);
    	     		
         		}, function(err) {
         				console.error('ERR', err);
         				// err.status will contain the status code
         		}) 
     		}
     		
     	};
     	
})


    	

    		
.controller('VenuesListCtrl', function($scope,$stateParams,$http,$ionicLoading) {    			 
	//$scope.address =   $stateParams.address; 

	 var str1 = "";
	 var str2 = "";
	 var str3 = "";
	 var result = "";
	 var radius =  $stateParams.radius + "000";
	 
	 function update(url){		
	     	
	     	$http.get(url).then(function(resp) {     		
	     		console.log(resp)
	     		$scope.venues =  resp.data.response.venues;
	  }, function(err) {
	    console.error('ERR', err);
	    // err.status will contain the status code
	  }) 
	 }
	 
	 function success(pos) {	
		 var strMap1 = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
  		 var strMap2 = pos.coords.latitude + ',' + pos.coords.longitude;
  		 var strMapFinal = strMap1 + strMap2 + "&key=AIzaSyBpBEroQRBrqaXsN8MfKUpQ2PXdJ6MatVI";
  		 var urlMap = strMapFinal.replace(/ /g, '+');
 		//alert(urlMap);
 		 
 		$http.get(urlMap).then(function(resp) {     		
 			 $scope.address =resp.data.results[0].formatted_address;    		
 		}, function(err) {console.error('ERR', err);})
 	
	 
		
		 //alert('Posizione rilevata: ' + pos.coords.latitude + ' - ' + pos.coords.longitude);
		 str2 = pos.coords.latitude + ',' + pos.coords.longitude;
		 str1 = "https://api.foursquare.com/v2/venues/search?radius="+ radius + "&ll=";		 
		 str3 = "&client_id=2ELLTUE0XN5NMZ2UZJK1GBLDM5HVIO3551HGCVRR5ACMT20P&client_secret=BYY515Q3JCJB5X2IDJNSRAINOXYWTRRCK1VDRFCMVZDIEEVF&v=20141020&categoryId=4d4b7105d754a06374d81259";
		 result = str1 + str2 + str3;
		 update(result);
		 
     }
 
	 function error(err) {
     	  console.warn('ERROR(' + err.code + '): ' + err.message);
     	  alert('Posizione GPS non rilevata');
     	  //update(result);  
     	};
 
     	var options = {
       		  enableHighAccuracy: true,
       		  timeout: 5000,
       		  maximumAge: 0    
     	};   
	 
 	if ($stateParams.address=='') {
 			navigator.geolocation.getCurrentPosition(success,error,options);
 		} else { 
 			var strMap1 = "https://maps.googleapis.com/maps/api/geocode/json?address=";
     		var strMap2 = $stateParams.address;
     		var strMapFinal = strMap1 + strMap2 + "&key=AIzaSyBpBEroQRBrqaXsN8MfKUpQ2PXdJ6MatVI";
     		
     		var urlMap = strMapFinal.replace(/ /g, '+');
     		//alert(urlMap);
     		$http.get(urlMap).then(function(resp) {     		
	     		console.log(resp);
	     		//resp.data.response.venues;
	     		//alert(resp.data.results[0].geometry.location.lat + " " + resp.data.results[0].geometry.location.lng);
	     		str2 = resp.data.results[0].geometry.location.lat + ',' + resp.data.results[0].geometry.location.lng;
	   		    str1 = "https://api.foursquare.com/v2/venues/search?radius="+ radius + "&ll=";		 
	   		    str3 = "&client_id=2ELLTUE0XN5NMZ2UZJK1GBLDM5HVIO3551HGCVRR5ACMT20P&client_secret=BYY515Q3JCJB5X2IDJNSRAINOXYWTRRCK1VDRFCMVZDIEEVF&v=20141020&categoryId=4d4b7105d754a06374d81259";
	   		    result = str1 + str2 + str3;	
	   		    $scope.address = resp.data.results[0].formatted_address
	   		   update(result);
	     		
     		}, function(err) {
     				console.error('ERR', err);
     				// err.status will contain the status code
     		}) 
 		}
})    		
    		
.controller('VenuesSearchCtrl', function($scope, $http,$ionicLoading) {     	
	 $scope.radius = 5;
})


.controller('VenueCtrl', function($scope, $stateParams, $http, $state,$ionicSlideBoxDelegate,$ionicLoading) {
	     

		$scope.activeSlide = 1;
		
	 var str1 = "https://api.foursquare.com/v2/venues/";
	 var str2 = $stateParams.venueId;
	 var str3 = "?client_id=2ELLTUE0XN5NMZ2UZJK1GBLDM5HVIO3551HGCVRR5ACMT20P&client_secret=BYY515Q3JCJB5X2IDJNSRAINOXYWTRRCK1VDRFCMVZDIEEVF&v=20141020";
	 var result = str1 + str2 + str3;
	 
	 //$scope.params = $stateParams	 
	 
	 //$http.get('https://api.foursquare.com/v2/venues/4c2efacc452620a10bcc1c0f?client_id=2ELLTUE0XN5NMZ2UZJK1GBLDM5HVIO3551HGCVRR5ACMT20P&client_secret=BYY515Q3JCJB5X2IDJNSRAINOXYWTRRCK1VDRFCMVZDIEEVF&v=20141020').then(function(resp) {
	 $http.get(result).then(function(resp) {
		 
		 	console.log(resp)
		    $scope.venue =  resp.data.response.venue
		    $scope.phrases =  resp.data.response.venue.phrases
     		$scope.photos = resp.data.response.venue.photos.groups[0].items;
		 
		  }, function(err) {
		    console.error('ERR', err);
		    // err.status will contain the status code
		  })
		  
		
	 
		    // Call this functions if you need to manually control the slides
		    $scope.next = function() {
		      $ionicSlideBoxDelegate.next();
		    };
		  
		    $scope.previous = function() {
		      $ionicSlideBoxDelegate.previous();
		    };
		  
		    // Called each time the slide changes
		    $scope.slideChanged = function(index) {
		      $scope.slideIndex = index;
		      $ionicSlideBoxDelegate.update();
		    };
		    
		    $scope.updateSlider = function () {
	            $ionicSlideBoxDelegate.update(); //or just return the function
	        }
		 
})

.controller('VenuePhotoCtrl', function($scope, $stateParams, $http) {

	 var str1 = "https://api.foursquare.com/v2/venues/";
	 var str2 = $stateParams.venueId;
	 var str3 = "/photos?client_id=2ELLTUE0XN5NMZ2UZJK1GBLDM5HVIO3551HGCVRR5ACMT20P&client_secret=BYY515Q3JCJB5X2IDJNSRAINOXYWTRRCK1VDRFCMVZDIEEVF&v=20141020";
	 var result = str1 + str2 + str3;
	 
	 //$scope.params = $stateParams	 
	 
	 //$http.get('https://api.foursquare.com/v2/venues/4c2efacc452620a10bcc1c0f?client_id=2ELLTUE0XN5NMZ2UZJK1GBLDM5HVIO3551HGCVRR5ACMT20P&client_secret=BYY515Q3JCJB5X2IDJNSRAINOXYWTRRCK1VDRFCMVZDIEEVF&v=20141020').then(function(resp) {
	 $http.get(result).then(function(resp) {
		 
		 	console.log(resp)		    
     		$scope.photo = resp.data.response.photos.items[$stateParams.photoId];
		 
		  }, function(err) {
		    console.error('ERR', err);
		    // err.status will contain the status code
		  })
	 
})

.controller('PromotionsSearchCtrl', function($scope,$http) {  
	$scope.radius = 5;

})

.controller('PromotionsListCtrl', function($scope,$stateParams,  $http) {    			 
	//$scope.address =   $stateParams.address; 
	var promotionsUrl = "";
	var radius =  $stateParams.radius ;
	var now = new Date();
	 
	function getPromotions(url){		
		$http.get(url).then(function(resp) {     		
		console.log(resp);
		$scope.esercenti =  resp.data;		
		}, function(err) {
			console.error('ERR', err);
			// 	err.status will contain the status code
		}) 
	}
	
	//promotionsUrl = "http://young-gorge-3211.herokuapp.com/offerta/listByPositionAndRaggio.json?lat=44&lng=44&raggio=2";
	//getPromotions(promotionsUrl);
	 
	function success(pos) {	
		 var strMap1 = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
  		 var strMap2 = pos.coords.latitude + ',' + pos.coords.longitude;
  		 var strMapFinal = strMap1 + strMap2 + "&key=AIzaSyBpBEroQRBrqaXsN8MfKUpQ2PXdJ6MatVI";
  		 var urlMap = strMapFinal.replace(/ /g, '+');
 		alert(urlMap);
 		 
 		$http.get(urlMap).then(function(resp) {     		
 			 $scope.address =resp.data.results[0].formatted_address;    		
 		}, function(err) {console.error('ERR', err);})
 	
	 
		
		 alert('Posizione rilevata: ' + pos.coords.latitude + ' - ' + pos.coords.longitude);
		 promotionsUrl = "http://young-gorge-3211.herokuapp.com/offerta/listByPositionAndRaggio.json?lat=" +  pos.coords.latitude + "&lng=" + pos.coords.longitude + "&raggio=" + radius;
 		 getPromotions(promotionsUrl);	
		 
     }
 
	 function error(err) {
     	  console.warn('ERROR(' + err.code + '): ' + err.message);
     	  alert('Posizione GPS non rilevata');
     	};
 
     	var options = {
       		  enableHighAccuracy: true,
       		  timeout: 5000,
       		  maximumAge: 0    
     	};   
	 
 	if ($stateParams.address=='') {
 			navigator.geolocation.getCurrentPosition(success,error,options);
 		} else { 
 			var strMap1 = "https://maps.googleapis.com/maps/api/geocode/json?address=";
     		var strMap2 = $stateParams.address;
     		var strMapFinal = strMap1 + strMap2 + "&key=AIzaSyBpBEroQRBrqaXsN8MfKUpQ2PXdJ6MatVI";
     		var urlMap = strMapFinal.replace(/ /g, '+');
     		// Debug
     		alert(urlMap); 
     	    // End debug
     		
     		$http.get(urlMap).then(function(resp) {     		
	     		// Debug
     			console.log(resp);	     		
	     		alert(resp.data.results[0].geometry.location.lat + " " + resp.data.results[0].geometry.location.lng);
	     		// End debug
	     		promotionsUrl = "http://young-gorge-3211.herokuapp.com/offerta/listByPositionAndRaggio.json?lat="  + resp.data.results[0].geometry.location.lat + "&lng=" + resp.data.results[0].geometry.location.lng + "&raggio=" + radius;	
	   		    $scope.address = resp.data.results[0].formatted_address
	   		    getPromotions(promotionsUrl);	     		
     		}, function(err) {
     				console.error('ERR', err);
     				// err.status will contain the status code
     		}) 
 		}
})


.controller('PromotionDetailsCtrl', function($scope, $stateParams, $http) {	 
	 $scope.params = $stateParams	 
})

.controller('PromotionPhotoCtrl', function($scope, $stateParams, $http) {

	 var str1 = "https://api.foursquare.com/v2/venues/";
	 var str2 = $stateParams.venueId;
	 var str3 = "/photos?client_id=2ELLTUE0XN5NMZ2UZJK1GBLDM5HVIO3551HGCVRR5ACMT20P&client_secret=BYY515Q3JCJB5X2IDJNSRAINOXYWTRRCK1VDRFCMVZDIEEVF&v=20141020";
	 var result = str1 + str2 + str3;
	 
	 //$scope.params = $stateParams	 
	 
	 //$http.get('https://api.foursquare.com/v2/venues/4c2efacc452620a10bcc1c0f?client_id=2ELLTUE0XN5NMZ2UZJK1GBLDM5HVIO3551HGCVRR5ACMT20P&client_secret=BYY515Q3JCJB5X2IDJNSRAINOXYWTRRCK1VDRFCMVZDIEEVF&v=20141020').then(function(resp) {
	 $http.get(result).then(function(resp) {
		 
		 	console.log(resp)		    
     		$scope.photo = resp.data.response.photos.items[$stateParams.photoId];
		 
		  }, function(err) {
		    console.error('ERR', err);
		    // err.status will contain the status code
		  })
	 
})

.controller('MapCtrl', function($scope, $ionicLoading) {
    //alert('Map1'); 	
    //alert(google.maps.event.addDomListener);
    google.maps.event.addDomListener(window, 'load', function() {
    	alert(' Map2');
        var myLatlng = new google.maps.LatLng(37.3000, -120.4833);
 
        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        
        alert('Map3');
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
        
        function success(pos) {
        	map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: map,
                title: "My Location"
            });
        }
        function error(err) {
        	  console.warn('ERROR(' + err.code + '): ' + err.message);
        	};
        var options = {
          		  enableHighAccuracy: true,
          		  timeout: 5000,
          		  maximumAge: 0
        };        
        
        navigator.geolocation.getCurrentPosition(success,error,options);
 
        $scope.map = map;
    });
 
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
	$scope.params = $stateParams
	
});
