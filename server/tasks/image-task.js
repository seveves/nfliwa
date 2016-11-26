var del = require('del');
var jimp = require('jimp');
var path = require('path');
var cloudinary = require('cloudinary');
var appConfig = require('../config/app.config');

cloudinary.config({ 
  cloud_name: appConfig.cloudinary.name,
  api_key: appConfig.cloudinary.key, 
  api_secret: appConfig.cloudinary.secret 
});

var ImageTask = function(socket) {
  this.socket = socket;
}

ImageTask.prototype.uploadImages = function(files, uploadOptions) {
  if (files && files.length) {
    let fileJobs = files.map(
      file => uploadSequence({
        originalImage: file.path,
        name: file.originalname,
        uploadOptions: uploadOptions }));

    return Promise.all(fileJobs);
  } else {
    return Promise.resolve();
  }
}

ImageTask.prototype.deleteImagesById = deleteImagesById;

function uploadSequence(args) {
  if (this.socket) {
    this.socket.emit('update', { task: 'start', image: args.name });  
  }

  return Promise
    .resolve(args)
    .then(resizeImage)
    .then(getBase64)
    .then(uploadImage)
    .then(removeTempFiles)
    .catch(rollback);
}

function getBase64(args) {
  if (this.socket) {
    this.socket.emit('update', { task: 'getBase64', image: args.name });
  }

  return new Promise((resolve, reject) => {
    jimp.read(args.resizedImage).then(image => {
      image.scale(0.01).getBase64(jimp.MIME_PNG, (err, base64) => {
        if (err) {
          reject({ task: 'getBase64', error: err, args: args});
        } else {
          args.base64 = base64;
          resolve(args);
        }
      });
    });
  });
}

function resizeImage(args) {
  if (this.socket) {
    this.socket.emit('update', { task: 'resizeImage', image: args.name });  
  }

  return new Promise((resolve, reject) => {
    jimp.read(args.originalImage)
      .then(image => {
        args.resizedImage = args.originalImage + "-resized.png"
        image.resize(800, jimp.AUTO)
            .quality(90)
            .write(args.resizedImage, err => {
              if (err) {
                reject({ task: 'resizeImage', error: err, args: args });
              } else {
                resolve(args);
              }
            });
      })
      .catch(err => reject({ task: 'resizeImage', error: err, args: args }));
  });
}

function uploadImage(args) {
  if (this.socket) {
    this.socket.emit('update', { task: 'uploadImage', image: args.name });  
  }

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      args.resizedImage,
      result => {
        if (result.error) {     
          reject({ task: 'uploadImage', error: new Error(result.error.message), args: args });
        } else {
          args.imageId = result.public_id;
          args.imageUrl = result.url;
          resolve(args);
        }
      },
      args.uploadOptions);
  });
}

function removeTempFiles(args) {
  if (this.socket) {
  this.socket.emit('update', { task: 'removeTempFiles', image: args.name });  
  }

  return new Promise((resolve, reject) => {
    del([args.originalImage, args.resizedImage]).then(paths => {
      resolve(args);
    }, reason => {
      reject({ task: 'removeTempFiles', error: reason, args: args });
    });
  });
}

function deleteImagesById(imageIds) {
  if (this.socket) {
    this.socket.emit('update', { task: 'deleteImagesById', args: imageIds });
  }

  return new Promise((resolve, reject) => {
    if (imageIds.length) {
      cloudinary.api.delete_resources(imageIds, result => {
        if (result.error) {
          reject({ task: 'deleteImagesById', error: new Error(result.error) });
        } else {
          resolve();
        }
      });
    } else {
      resolve();
    }
  });
}

function rollback(reason) {
  if (this.socket) {
    this.socket.emit('error', { reason: reason });  
  }

  switch(reason.task) {
    case 'removeTempFiles':
      console.log('Error while removing temp files', reason.error);
    case 'uploadImage':
      console.log('Error while uploading image', reason.error);
    case 'resizeImage':
      console.log('Error while resizing image', reason.error);
      break;
  }
}

module.exports = ImageTask;
