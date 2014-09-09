(function(exports) {

  'use strict';

  /*
   * This class will be in charge of the connections with the server.
   */
  
  var SERVER_URL = 'http://localhost:5000/api/v1/';
  // var SERVER_URL = 'http://morning-plains-7310.herokuapp.com/api/v1/';

  

  // // Perform a request against the simplepushclient server
  // function executeRequest(target, action, callType, data, cb) {
  //   var uri = SERVER_URL + target;
  //   action && uri += '/' + action + '/';


  //   console.log('LA URI ES ' + uri);
  //   // var xhr = new XMLHttpRequest({mozSystem: true});

  //   // xhr.onload = function onLoad(evt) {
  //   //   if (xhr.status === 200 || xhr.status === 0) {
  //   //     cb(null, xhr.response);
  //   //   } else {
  //   //     cb(xhr.status);
  //   //   }
  //   // };
  //   // xhr.open(type, uri, true);
  //   // xhr.onerror = function onError(e) {
  //   //   console.error('onerror en xhr ' + xhr.status);
  //   //   cb(e);
  //   // }
  //   // xhr.send(data);
  // };

  var Server = {
    request: function(target, action, type, data, cb) {
      // Send it to the server to store


      var dataXHR = new FormData();
      for (var key in data) {
        dataXHR.append(key, data[key]);
      }
      

      var uri = SERVER_URL + target;
      if (action) {
        uri += '/' + action + '/';
      }


      console.log('LA URI ES ' + uri);

      var xhr = new XMLHttpRequest({mozSystem: true});

      xhr.onload = function onLoad(evt) {
        if (xhr.status === 200 || xhr.status === 0) {
          cb(null, xhr.response);
        } else {
          cb(xhr.status);
        }
      };
      xhr.open(type, uri, true);
      xhr.onerror = function onError(e) {
        console.error('onerror en xhr ' + xhr.status);
        cb(e);
      }
      xhr.send(dataXHR);
    }

  };

  exports.Server = Server;
}(this));


