(function(exports) {

    
  var AwsStorage = {
    upload: function(name, domIdentifier, onprogress, onerror, onfinished) {
      var s3upload = new S3Upload({
        s3_object_name: name,
        file_dom_selector: domIdentifier,
        s3_sign_put_url: 'http://morning-plains-7310.herokuapp.com/sign_s3',
        // s3_sign_put_url: 'http://localhost:5000/sign_s3',
        onProgress: function(percent, message) {
          console.log('Upload progress: ' + percent + '% ' + message);
          onprogress();
        },
        onFinishS3Put: function(public_url) {
          console.log('Upload completed. Uploaded to: '+ public_url);
          onfinished(public_url);
        },
        onError: function(status) {
          console.log('Upload error: ' + status);
          onerror(status);
        }
      });
    },
    get: function(objectID) {
      // Las

    }

  };

  exports.AwsStorage = AwsStorage;


}(this));