(function(exports) {

  'use strict';

  function _uploadToS3(name, domIdentifier, callback) {
    var s3upload = new S3Upload({
      s3_object_name: name,
      file_dom_selector: domIdentifier,
      s3_sign_put_url: 'http://morning-plains-7310.herokuapp.com/sign_s3',
      // s3_sign_put_url: 'http://localhost:5000/sign_s3',
      onProgress: function(percent, message) {
        console.log('Upload progress: ' + percent + '% ' + message);
      },
      onFinishS3Put: function(public_url) {
        console.log('Upload completed. Uploaded to: '+ public_url);
        callback(public_url);
      },
      onError: function(status) {
        console.log('Upload error: ' + status);
      }
    });
  }



  var Item = {
    get: function(user, filter, callback) {

      // filter {
      //   uuid: 'XXXX',
      //   itemID: 'YYYY'
      // }

      if (typeof callback !== 'function') {
        console.error('Item.get: ERROR callback is not defined');
        return;
      }

      if (!filter.uuid && !filter.uuid) {
        // TODO Y si consideramos esto como un getAll?
        console.error('Item.get: We can not find an item without a filter');
        return;
      }


      Server.request(
        'item',
        'get',
        'GET',
        filter,
        function(item) {
          if (!item) {
            callback(new Error('Item.get: There is no ITEM given the filter'));
            return;
          }
          console.log('EL ITEM RECUPERADO ES ' + JSON.parse(item));
          callback(null, item);
        }
      );
    },
    create: function(owner, itemData, callback) {

      if (!itemData || !owner || !itemData.name || !itemData.photoURL) {
        callback(new Error('Item.get: Some params are not complete'));
        return;
      }

      var tmpData = {
        name: itemData.name,
        isShareable: itemData.isShareable
      };


      Server.request(
        'item',
        'create',
        'POST',
        tmpData,
        function(e, partialItemTmp) {
          if (e) {
            callback(new Error('It was impossible to create the item ' + e));
            return;
          }
          var partialItem = JSON.parse(partialItemTmp);
          

          partialItem.photoURL = itemData.photoURL;
          // Update video file
          _uploadToS3(
            'audio' + partialItem._id,
            itemData.audio.domIdentifier,
            function(audio_url) {
              partialItem.audioURL = audio_url;
              Server.request(
                'item',
                'update',
                'POST',
                partialItem,
                function(e, finalItem) {
                  if (e) {
                    callback(new Error('It was impossible to create the item'));
                    return;
                  }
                  callback(null, JSON.parse(finalItem));
                }
              );
            }
          );


          // _uploadToS3(
          //   'photo' + partialItem._id,
          //   itemData.photo.domIdentifier,
          //   function(photo_url) {
          //     partialItem.photoURL = photo_url;
          //     _uploadToS3(
          //       'audio' + partialItem._id,
          //       itemData.audio.domIdentifier,
          //       function(audio_url) {
          //         partialItem.audioURL = audio_url;
          //         Server.request(
          //           'item',
          //           'update',
          //           'POST',
          //           partialItem,
          //           function(e, finalItem) {
          //             if (e) {
          //               callback(new Error('It was impossible to create the item'));
          //               return;
          //             }
          //             callback(null, JSON.parse(finalItem));
          //           }
          //         );
          //       }
          //     );
          //   }
          // );


          // var s3upload = new S3Upload({
          //   s3_object_name: 'photo' + partialItem._id,
          //   file_dom_selector: itemData.photo.domIdentifier,
          //   s3_sign_put_url: 'http://morning-plains-7310.herokuapp.com/sign_s3',
          //   // s3_sign_put_url: 'http://localhost:5000/sign_s3',
          //   onProgress: function(percent, message) {
          //     console.log('Upload progress: ' + percent + '% ' + message);
          //   },
          //   onFinishS3Put: function(public_url) {
          //     console.log('Upload completed. Uploaded to: '+ public_url);
          //     // TODO Enviar AUDIO y VIDEO
          //     // partialItem.audioURL = 'este es el audio URL';
          //     partialItem.photoURL = public_url;
          //     Server.request(
          //       'item',
          //       'update',
          //       'POST',
          //       partialItem,
          //       function(e, finalItem) {
          //         if (e) {
          //           callback(new Error('It was impossible to create the item'));
          //           return;
          //         }
          //         callback(null, JSON.parse(finalItem));
          //       }
          //     );
          //   },
          //   onError: function(status) {
          //     console.log('Upload error: ' + status);
          //   }
          // });
        }
      );
    },
    getAll: function(callback) {
      // Dame todos los objetos dado un usuario
    },
    delete: function(id, callback) {
      // Borro un objeto dado su ObjectID. Además elimino allá dónde esté,
      // buscando entre las colecciones
    },
    update: function(id, name, audioURL, imageURL, callback) {
      // Actualizo el objeto dado ObjectID y demás parámetros
      // En el callback la actualización se ejecutó correctamente
    },
    assignUUID: function(id, uuid, callback) {
      // Assigna a un objeto un UUID
    },
    deleteUUID: function(id, callback) {
      // Elimina el UUID asignado a un objeto
    }
  };

  exports.Item = Item;
}(this));


