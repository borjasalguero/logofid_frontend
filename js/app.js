/* -*- Mode: js; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- /
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */

'use strict';

var debug = true;
var initialized = false;
// var subscribeButton;
// var unsubscribeButton;
// var channelText;


var itemName, itemButton, itemPhoto, itemAudio;

window.addEventListener('localized', function localized() {
  debug && console.log('We have l10n working!');
  if (initialized) {
    return;
  }
  initialized = true;

  itemName = document.getElementById('item-name');
  itemButton = document.getElementById('create-item-button');
  itemPhoto = document.getElementById('item-photo');
  itemAudio = document.getElementById('item-audio');

  itemButton.addEventListener(
    'click',
    function create() {
      if (!itemName.value || !itemName.value.length) {
        console.log('No name defined');
        return;
      }

      if (!itemPhoto.files[0]) {
        console.log('No file');
        return;
      }

      console.log('Nombre ' + itemName.value);

      console.log('FILE ' + JSON.stringify(itemPhoto.files[0]));
      console.log('FILE ' + itemPhoto.value);


      var user = {
        id: 'USERID'
      };

      var itemData = {
        name: itemName.value,
        audio: {
          fileName: itemAudio.files[0].name,
          domIdentifier: itemAudio.id
        },
        photo: {
          fileName: itemPhoto.files[0].name,
          domIdentifier: itemPhoto.id
        },
        isShareable: false
      };

      console.log('Queremos guardar ' + JSON.stringify(itemData) + ' para ' + JSON.stringify(user));

      Item.create(
        user,
        itemData,
        function(e, item) {
          if (e) {
            console.log('ERROR: ' + e.message);
            return;
          }
          console.log('El objeto ha sido creado en la BBDD !! ' + JSON.stringify(item));
        }
      );
    }
  );

  






  
  // var input_element = document.getElementById("files");
  // input_element.onchange = function(e) {

  //   console.log('We have one file to upload ' + e.target.files[0]);

  //   var file = e.target.files[0];

  //   var s3upload = new S3Upload({
  //     s3_object_name: file.name,
  //     file_dom_selector: 'files',
  //     s3_sign_put_url: 'http://morning-plains-7310.herokuapp.com/sign_s3',
  //     // s3_sign_put_url: 'http://localhost:5000/sign_s3',
  //     onProgress: function(percent, message) {
  //       console.log('Upload progress: ' + percent + '% ' + message);
  //     },
  //     onFinishS3Put: function(public_url) {
  //       console.log('Upload completed. Uploaded to: '+ public_url);
  //     },
  //     onError: function(status) {
  //       console.log('Upload error: ' + status);
  //     }
  //   });
  // };


  // Server.request(
  //   'item',
  //   'create',
  //   'POST',
  //   {
  //     propiedad_1: 'valor_1',
  //     propiedad_2: 'valor_2'
  //   },
  //   function(e, response) {
  //     if (!e) {
  //       console.log('Enviado con éxito ' + response);
  //       console.log('Enviado con éxito ' + JSON.parse(response).params['propiedad_1']);
  //       return;
  //     }
  //     console.log('Error en el envio');
  //   }
  // );

  
});



// Perform a request against the simplepushclient server
var doRequest = function doPost(type, endPoint, data, cb) {
  var uri = 'http://simplepushclient.eu01.aws.af.cm' + endPoint;
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
  xhr.send(data);
};
