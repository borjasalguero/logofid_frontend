(function(exports) {
  
  var _initialized = false;
  function _init() {
    if (_initialized) {
      return;
    }
    _initialized = true;
    document.getElementById('ie-form').addEventListener(
      'submit',
      function(e) {
        e.stopPropagation();
        e.preventDefault();
      }
    );


    document.getElementById('ie-name').addEventListener(
      'focus',
      function(e) {
        e.target.placeholder = '';
        document.body.dataset.keyboardShown = true;
      }
    );

    document.getElementById('ie-name').addEventListener(
      'blur',
      function(e) {
        e.target.placeholder = 'Introduce nombre';
        document.body.dataset.keyboardShown = false;
      }
    );
  }

  var ItemEditView = {
    show: function() {
      console.log('Vamos');
      _init();
      document.getElementById('ie-name').value = '';

    }

  }


  exports.ItemEditView = ItemEditView;


}(this))