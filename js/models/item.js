(function(exports) {

  'use strict';

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

      if (!itemData || !owner || !itemData.name || !itemData.photo) {
        callback(new Error('Item.get: Some params are not complete'));
        return;
      }

      var tmpData = {
        name: itemData.name,
        isShareable: itemData.isShareable
      };


      console.log('ESTOY LISTO!');


      Server.request(
        'item',
        'create',
        'POST',
        tmpData,
        function(e, partialItemTmp) {
          if (e) {
            callback(new Error('It was impossible to create the item'));
            return;
          }
          var partialItem = JSON.parse(partialItemTmp);

          // Update video file


          // TODO Enviar AUDIO y VIDEO
          // partialItem.audioURL = 'este es el audio URL';
          partialItem.photoURL = 'este es la IMAGEN URL';
          console.log('VAMOS MAMONA ' + JSON.stringify(partialItem));
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


