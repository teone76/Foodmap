angular.module('starter.controllers', ['ui.router'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
    console.log('AppCtrl called...');
    
    // Form data for the login modal
    $scope.loginData = {};
    
    $scope.restaurantKey = '123abc'; // chiave hardcodata che identifica il ristorare
    
    $scope.serverHost = 'http://young-gorge-3211.herokuapp.com'; //'http://192.168.1.246:8080';
    $scope.uploadUri = '/offerta/save'; //'/iwxTest/iwxupload';
    
    $scope.offerta = new Object();
    $scope.offerta.restaurantKey = $scope.restaurantKey;
  
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

.controller('EditOffertaCtrl', ['$scope', '$state', '$window', '$location', '$ionicLoading', '$ionicPopup', 'GetUU', function($scope, $state, $window, $location, $ionicLoading, $ionicPopup, GetUU) {
    console.log('EditOffertaCtrl called...');
    
    $scope.offerta = new Object();
    $scope.offerta.restaurantKey = $scope.restaurantKey;
    
    var from = new Date();
    $scope.mindate = getDateISO2(from, null); // data minima che puo' essere settata
    
    $scope.offerta.datefrom = getDateForAngularInput(from);
    $scope.offerta.timefrom = getDateForAngularInput(from);
    //alert('Init input date from: ' + $scope.offerta.datefrom + ' - ' + $scope.offerta.timefrom);
    
    var to = new Date();
    to.setHours(to.getHours() + 1);
    
    $scope.offerta.dateto = getDateForAngularInput(to);
    $scope.offerta.timeto = getDateForAngularInput(to);
    //alert('Init input date to: ' + $scope.offerta.dateto + ' - ' + $scope.offerta.timeto);
    
    $scope.data = {};
	
    $scope.mypicture = '';
    var pictureSource = ''; // picture source
	var destinationType = ''; // sets the format of returned value
	
    var previewImage = document.getElementById('cameraPreviewImage');
    previewImage.style.display = 'none';
    previewImage.src = '';
    
    // on DeviceReady check if already logged in (in our case CODE saved)
	ionic.Platform.ready(function() {
		if (!navigator.camera) {
			// error handling
			return;
        }
		//pictureSource = navigator.camera.PictureSourceType.PHOTOLIBRARY;
		pictureSource = navigator.camera.PictureSourceType.CAMERA;
		destinationType = navigator.camera.DestinationType.FILE_URI;
	});
	
	// get upload URL for FORM
    GetUU.query(function(response) {
        $scope.data = response;
        console.log('got upload URL: ' + $scope.data.uploadurl);
    });
    
    // Alert dialog
    $scope.showAlert = function(title, message, isError) {
        var alertPopup = $ionicPopup.alert({
            title: title,
            template: message,
            okText: 'OK',
            okType: (isError) ? 'button-assertive' : 'button-balanced'
        });
        alertPopup.then(function(res) {
            //console.log('close alert');
            if (!isError) {
                //$window.location.reload(true);
                $state.go($state.current, {}, {reload: true});
            }
        });
   };
    
    // Confirm dialog
    $scope.showConfirm = function() {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Pubblicazione dell\'offerta',
            template: 'Sei sicuro di voler procedere con la pubblicazione dell\'offerta?',
            cancelText: 'No',
            cancelType: 'button-default',
            okText: 'Si',
            okType: 'button-positive',
        });
        confirmPopup.then(function(res) {
            if (res) {
                $scope.publish();
                //console.log('You are sure');
            } else {
                //console.log('You are not sure');
            }
     });
   };

    // take picture
    $scope.takePicture = function() {
        console.log('Got camera button click, destinationType: ' + destinationType);
        
        var options =   {
            quality: 50,
            destinationType: destinationType,
            sourceType: pictureSource,
            encodingType: 0
        };
        
        if (!navigator.camera) {
            $scope.showAlert('ERRORE', 'Impossibile accedere alla fotocamera', true);
            return;
        }
		
        navigator.camera.getPicture(
            function (imageURI) {
                console.log('Got camera success, imageURI: ' + imageURI);
                //alert('imageURI: ' + imageURI);
                $scope.mypicture = imageURI;
                
                var previewImage = document.getElementById('cameraPreviewImage');
                previewImage.style.display = 'block';
                previewImage.src = $scope.mypicture;
            },
            
            function (err) {
                // error handling camera plugin
                console.log('Got camera error: ' + err);
                $scope.showAlert('ERRORE', 'Errore nel recupero della foto: ' + err, true);
            },
            
            options
        );
    };
    
    // check data values (onchange event on begin date/time)
    $scope.checkDates = function() {
        console.log('TODO verificare che la data iniziale sia successiva alla data finale');
    }

    // do POST on upload url form by http / html form    
    $scope.publish = function() {
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
        
        //alert('update');
        $scope.data.uploadurl = $scope.serverHost + $scope.uploadUri;
        console.log('upload url: ' + $scope.data.uploadurl);
        if (!$scope.data.uploadurl) {
            // questo caso non si dovrebbe mai verificare
            $ionicLoading.hide();
            $scope.showAlert('ERRORE', 'Impossibile identificare l\'URL di uplaod', true);
            
            return;
        }
        
        if (!$scope.offerta.titolo) {
            $ionicLoading.hide();
            $scope.showAlert('TITOLO MANCANTE', 'Non è stato specificato il titolo dell\'offerta', true);
            
            return;
        }
        
        if (!$scope.offerta.datefrom || !$scope.offerta.timefrom) {
            $ionicLoading.hide();
            $scope.showAlert('INIZIO OFFERTA MANCANTE', 'Non è stata specificata la data e ora di inizio dell\'offerta', true);
            
            return;
        }
        
        if (!$scope.offerta.dateto || !$scope.offerta.timeto) {
            $ionicLoading.hide();
            $scope.showAlert('FINE OFFERTA MANCANTE', 'Non è stata specificata la data e ora di fine dell\'offerta', true);
            
            return;
        }
        
        if (!$scope.offerta.prezzo) {
            $ionicLoading.hide();
            $scope.showAlert('PREZZO MANCANTE', 'Non è stato specificato il prezzo dell\'offerta', true);
            
            return;
        }
        
        if (!$scope.mypicture) {
            $ionicLoading.hide();
            $scope.showAlert('FOTO MANCANTE', 'Non è stata caricata nessuna foto', true);
            // error handling no picture given
            
            return;
        }
        
        // some other POST fields
        var params = {};
        params.registrationID = $scope.offerta.restaurantKey ; 
        params.titolo = $scope.offerta.titolo;
        params.descrizione = $scope.offerta.descrizione;
        params.prezzo = $scope.offerta.prezzo;
        params.dataInizio = getDateParamValue($scope.offerta.datefrom, $scope.offerta.timefrom);
        params.dataFine = getDateParamValue($scope.offerta.dateto, $scope.offerta.timeto);
        
        if (params.dataInizio > params.dataFine) {
            $ionicLoading.hide();
            $scope.showAlert('FORMATO DATI NON VALIDO', 'La data e ora impostata come termine dell\'offerta non può essere antecedene alla data e ora di inzio della stessa', true);
            
            params = {};
            return;
        }
        
        var options = new FileUploadOptions();
        options.fileKey = "ffile";
        options.fileName = $scope.mypicture.substr($scope.mypicture.lastIndexOf('/')+1);
        options.mimeType = "image/jpeg";
        
        options.params = params;
        
        //prompt("new imp: prepare upload now");
        //alert('new imp: prepare upload now');
        var ft = new FileTransfer();
        ft.upload($scope.mypicture, encodeURI($scope.data.uploadurl), uploadSuccess, uploadError, options);
        
        function uploadSuccess(result) {
            console.log('Got upload success, CODE: ' + result.responseCode);
            console.log('Got upload success, RESPONSE: ' + result.response);
            
            // TODO analisi del messaggio di ritorno
            alert(result.response);
            
            $ionicLoading.hide();
            $scope.showAlert('CARICAMENTO COMPLETATO', 'Offerta pubblicata con successo', false);
        }
        
        function uploadError(error) {
            console.log('Got upload error, HTTP STATUS: ' + error.http_status);
            console.log('Got upload error, CODE: ' + error.code);
            console.log('Got upload error, SOURCE: ' + error.source);
            console.log('Got upload error, TARGET: ' + error.target);
            
            $ionicLoading.hide();
            $scope.showAlert('ERRORE IN PUBBLICAZIONE', 'Riscontrato errore nella fase di pubblicazione dell\'offerta\n\n[Error Code: ' + error.code + ']', true);
        }
    };
}])

.controller('ListOfferteCtrl', function($scope) {
    console.log('ListOfferteCtrl called...');
    
    $scope.offerte = [
        { title: 'Pollo', id: 101 },
        { title: 'Lasagne', id: 22 },
        { title: 'Fritto misto', id: 25 }
    ];
})

.controller('ViewOffertaCtrl', function($scope, $stateParams) {
    console.log('ViewOffertaCtrl called...');
    
    var id = $stateParams.offertaId;
    
    //alert('caricamento offerta ' + id + ' ... TODO');
    // TODO caricamento dei dati dell'offerta
    
    $scope.offerta.titolo = 'Titolo offerta ' + id;
    $scope.offerta.descrizione = 'Descrizione offerta ' + id + '... ';
});

// format date for angular datetime-local input
function getDateForAngularInput(date) {
    if (date == undefined || date == null)
        date = new Date();
    //alert(date.toDateString());
    
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());
}

// format date for angular date input (html5)
function getDateForAngularDateInput(date) {
    if (date == undefined || date == null)
        date = new Date();
    //alert(date.toDateString());
    return formatDateYYYY_MM_DD(date);
}

// format date for angular time input (html5)
function getDateForAngularTimeInput(date) {
    if (date == undefined || date == null)
        date = new Date();
    //alert(date.toDateString());
    return formatTimeHH_MM_SS(date);
}

// get date in ISO format
function getDateISO(date) {
    if (date == undefined || date == null)
        date = new Date();
    //alert(date.toDateString());
    
    return date.toISOString();
}

// get date in format yyyy-MM-ddTHH:mm:ss
function getDateISO2(date, time) {
    if (date == undefined || date == null)
        date = new Date();
    
    var strdate = formatDateYYYY_MM_DD(date);
    if (time != undefined && time != null) {
        strdate += 'T' + formatTimeHH_MM_SS(time);
    }
    //alert(strdate);
    return strdate;
}

// format date: yyyy-MM-dd
function formatDateYYYY_MM_DD(date) {
    var value = '';
    if (date != undefined && date != null) {
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        if (month.toString().length == 1)
            month = '0' + month;
        var day = date.getDate();
        if (day.toString().length == 1)
            day = '0' + day;

        value = year + '-' + month + '-' + day;
    }
    return value;
}

// format time: HH:mm:SS
function formatTimeHH_MM_SS(time) {
    var value = '';
    if (time != undefined && time != null) {
        var hours = time.getHours();
        if (hours.toString().length == 1)
            hours = '0' + hours;
        var minutes = time.getMinutes();
        if (minutes.toString().length == 1)
            minutes = '0' + minutes;
        var seconds = time.getSeconds();
        if (seconds.toString().length == 1)
            seconds = '0' + seconds;
        
        value = hours + ':' + minutes + ':' + seconds;
    }
    return value;
}

// format request param value for date time (yyyy-MM-ddTHH:mm:SSZ)
function getDateParamValue(date, time) {
    var value = '';
    console.log('Make date param value from: ' + date + ' - ' + time);
    if (date != undefined && date != null && time != undefined && time != null) {
        value = getDateISO2(date, time) + 'Z';   
        console.log('Date param value: ' + value);
    }
    return value;
}
