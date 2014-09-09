(function(exports) {

  'use strict';

  var Collection = {
    getAll: function(callback) {
      // Me da todas las listas a las que estoy suscrito y las que he creado.
    },
    create: function(name, isCollaborative, callback) {
      // Crea una lista. Si es colaborativa, todo el mundo puede modificarla.
      // El owner estará almacenado
    },
    delete: function(id, callback) {
      // Sólo el owner puede hacerlo
    },
    update: function(id, isCollaborative, callback) {
      // Actualizo nombre y estado
    },
    follow: function(id, callback) {
      // Sigo una lista dado su ID.
    },
    unfollow: function() {
      // Dejo de seguir una lista dado su ID.
    },
    getItems: function(id, uuid, callback) {
      // Assigna a un objeto un UUID
    },
    addItem: function() {
      // Añadir un item a una lista. Podré hacerlo si soy el owner y si la lista es
      // colaborativa en caso de no serlo.
    },
    removeItem: function() {
      // Eliminar un item a una lista. Podré hacerlo si soy el owner y si la lista es
      // colaborativa en caso de no serlo.
    }
  };

  exports.Collection = Collection;
}(this));
