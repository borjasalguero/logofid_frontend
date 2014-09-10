(function(exports) {
  
  var _initialized = false;

  var form, nameField, audioFile, photoFile,
      audioButton, photoButton, photoBackground,
      cancelButton, createButton;

  var _photoURL = null;

  function _init() {
    if (_initialized) {
      return;
    }
    _initialized = true;

    nameField = document.getElementById('ie-name');
    form = document.getElementById('ie-form');
    photoButton = document.getElementById('ie-photo');
    photoFile = document.getElementById('ie-photo-file');
    photoBackground = document.getElementById('ie-photo-background');
    audioButton = document.getElementById('ie-audio-button');
    audioFile = document.getElementById('ie-audio-file');
    cancelButton = document.getElementById('ie-cancel-button');
    createButton = document.getElementById('ie-create-button');

    form.addEventListener(
      'submit',
      function(e) {
        e.stopPropagation();
        e.preventDefault();
      }
    );


    nameField.addEventListener(
      'focus',
      function(e) {
        e.target.placeholder = '';
        document.body.dataset.keyboardShown = true;
      }
    );

    nameField.addEventListener(
      'blur',
      function(e) {
        e.target.placeholder = 'Introduce nombre';
        document.body.dataset.keyboardShown = false;
      }
    );

    photoButton.addEventListener(
      'click',
      function(e) {
        photoFile.click();
      }
    );


    audioButton.addEventListener(
      'click',
      function(e) {
        audioFile.click();
      }
    );

    photoFile.onchange = function(e) {
      var file = e.target.files[0];
      AwsStorage.upload(
        'userXXX' + Date.now(),
        e.target.id,
        function() {
          console.log('onprogress');
        },
        function() {
          console.log('onerror');
        },
        function(public_url) {
          console.log('TENEMOS LA IMAGEN URL ' + public_url);

          _photoURL = public_url;

          var image = new Image();
          image.src    = public_url;              // url.createObjectURL(file);
          image.onload = function onload() {
            var w = this.width,
                h = this.height;

            var backgroundStyle = w > h ? 'bck-horizontal':'bck-vertical';
            
            photoBackground.style.backgroundImage = 'url(' + public_url + ')';
            photoButton.style.backgroundImage = 'url(' + public_url + ')';
            photoButton.className = backgroundStyle;
          }
        }
      );
    }

    audioFile.onchange = function(e) {
      audioButton.classList.add('enabled');
    }

    cancelButton.addEventListener(
      'click',
      function(e) {
        ItemEditView.hide();
      }
    );
    createButton.addEventListener(
      'click',
      function(e) {
        if (!nameField.value || !nameField.value.length) {
          alert('Dale un nombre al objeto!');
          return;
        }

        if (!photoFile.files[0]) {
          alert('Añade una foto a tu objeto!');
          return;
        }

        if (!audioFile.files[0]) {
          alert('Necesitamos tu voz para que puedas reconocer el objeto. ¡Grábate!');
          return;
        }

        // TODO Esto 
        var user = {
          id: 'USERID'
        };

        var itemData = {
          name: nameField.value,
          audio: {
            fileName: audioFile.files[0].name,
            domIdentifier: audioFile.id
          },
          photoURL: _photoURL,
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
            ItemEditView.hide();
            
          }
        );
      }
    );
  }

  var ItemEditView = {
    show: function() {
      console.log('Vamos');
      _init();
      document.getElementById('ie-name').value = '';
      photoButton.classList.add('edit');
      document.body.dataset.layout = 'item-edit';
      _photoURL = null;
    },
    hide: function() {
      document.body.dataset.layout = 'background';
    }

  }


  exports.ItemEditView = ItemEditView;


}(this))