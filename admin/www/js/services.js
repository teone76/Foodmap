angular.module('starter.services', [])

// get upload url for file transfer (upload to http post service)
.factory('GetUU', function() {
    //var uploadurl = "http://localhost/upl";
    var uploadurl = "http://localhost:8080/FileManager/upload";

    return {
        query: function() {
            return uploadurl;
        }
	}
});
