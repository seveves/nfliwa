function postsRouter(socketio) {
  let io = socketio;
  let multer  = require('multer');
  let path = require('path');
  let winston = require('winston');
  let router = require('express').Router();
  let upload = multer({
    dest: 'uploads/',
    fileFilter: (req, file, callback) => {
      let ext = path.extname(file.originalname).toLowerCase();
      if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
        return callback(new Error('Only images are allowed (jpg, png).'));
      }
      callback(null, true);
    },
    limits: {
      fileSize: 1024 * 1024,
      files: 10
    }
  });

  let ImageTask = require('../../tasks/image-task');
  let Post = require('../../models/post');

  io.of('/posts').on('connection', socket => {
    this.socket = socket;
    socket.on('disconnect', () => winston.debug('socket disconnected'));
  });

  // get all posts
  router.get('/posts', ensureAuthenticated, (req, res, next) => {

    Post.find((err, posts) => {
      if (err) {
        return next(err);
      }
      res.render('posts', { user: req.user, posts: posts, pageTitle: 'Posts' });
    });
  });

  // create a new post - view
  router.get('/posts/create', ensureAuthenticated, (req, res) => {
    res.render('post-create', { user: req.user, pageTitle: 'New Post' });
  });

  // create a new post - form post and upload
  router.post('/posts', ensureAuthenticated, upload.array('images'), (req, res, next) => {

    if(!validateCreateForm(req, res)) return;

    if (req.files && req.files.length) {
      let task = new ImageTask(this.socket);
      let uploadOptions = { folder: 'nf-images' };
      task.uploadImages(req.files, uploadOptions)
          .then(results => {
            let images = results.map(result => {
              return {
                imageUrl: result.imageUrl.slice(5), // remove the http:
                imageId: result.imageId,
                base64: result.base64 };
            });
            savePost(req, res, images);
          }, reason => next(reason));
    } else {
      savePost(req, res, []);
    }
  });

  // get a post by its id
  router.get('/posts/:id', ensureAuthenticated, (req, res, next) => {
    Post.findById(req.params.id, (err, post) => {
      if (err) {
        return next(err);
      }
      res.render('post-edit', { user: req.user, post: post, pageTitle: 'Post Edit' });
    });
  });

  // delete a post by its id
  router.delete('/posts/:id', ensureAuthenticated, (req, res, next) => {
    Post.findById(req.params.id, (err, post) => {
      if (err) {
        return next(err);
      }

      // delete images
      if (post.images && post.images.length) {
        let task = new ImageTask(this.socket);
        task.deleteImagesById(post.images.map(image => image.imageId))
          .catch(reason => {
            winston.error("Error while deleting images", reason);
          });
      }

      post.remove((error) => {
        if (error) {
          return next(error);
        }
        res.json(post);
      });
    });
  });

  // update a post by its id
  router.post('/posts/:id', ensureAuthenticated, upload.array('images'), (req, res, next) => {
    
    Post.findById(req.params.id, (err, post) => {
      if (err) {
        return next(err);
      }

      if(!validateUpdateForm(req, res, post)) return;      

      if (req.body.delImageIds) {
        let imageIds = [].concat(req.body.delImageIds);
        let task = new ImageTask(this.socket);
        task.deleteImagesById(imageIds)
          .catch(reason => {
            winston.error("Error while deleting images", reason);
          });
        let postImages = [].concat(post.images);
        let imagesLength = post.images.length;
        for(let i = imagesLength; i--;) {
          for(let imageId of imageIds) {
            if (postImages[i].imageId === imageId) {
              post.images.splice(i, 1);
            }
          }
        }
      }

      if (req.files && req.files.length) {
        let task = new ImageTask(this.socket);
        let uploadOptions = { folder: 'nf-images' };
        task.uploadImages(req.files, uploadOptions).then(results => {
          let images = results.map(result => {
            return {
              imageUrl: result.imageUrl.slice(5), // remove the http:
              imageId: result.imageId, 
              base64: result.base64 };
          });
          post.images = post.images.concat(images);
          updatePost(req, res, post);
        }, reason => next(reason));
      } else {
        updatePost(req, res, post);
      }
    });
  });

  function updatePost(req, res, post) {
    // update post properties
    post.title = req.body.title;
    post.body = req.body.body;

    post.save(err => {
      if (err) {
        return next(err);
      }

      res.redirect('/admin/posts?t=updated');
    });
  }

  function savePost(req, res, images) {
    let post = new Post({
      title: req.body.title,
      body: req.body.body,
      images: images
    });

    post.save(err => {
      if (err) {
        return next(err);
      }
      res.redirect('/admin/posts?t=created');
    });
  }

  function validateUpdateForm(req, res, post) {
    let alerts = [];
    let title = req.body.title;
    let body = req.body.body;

    if (isEmpty(title) || isBlank(title)) {
      alerts.push('Title cannot be empty or contain only whitespaces.');
    }

    if (isEmpty(body) || isBlank(body)) {
      alerts.push('Please add some text to the body of this post.');
    }

    if (alerts.length !== 0) {
      post.title = title;
      post.body = body;
      res.render('post-edit', { user: req.user, post: post, pageTitle: 'Post Edit', alerts: alerts });

      return false;
    }

    return true;   
  }

  function validateCreateForm(req, res) {
    let alerts = [];
    let title = req.body.title;
    let body = req.body.body;

    if (isEmpty(title) || isBlank(title)) {
      alerts.push('Title cannot be empty or contain only whitespaces.');
    }

    if (isEmpty(body) || isBlank(body)) {
      alerts.push('Please add some text to the body of this post.');
    }

    if (alerts.length !== 0) {
      res.render('post-create', { user: req.user, pageTitle: 'New Post', post: { title: title, body: body }, alerts: alerts });
      return false;
    }

    return true; 
  }

  function isEmpty(str) {
    return (!str || 0 === str.length);
  }

  function isBlank(str) {
    return (!str || /^\s*$/.test(str));
  }

  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    
    res.redirect('/admin/login');
  }

  return router;
}

module.exports = postsRouter;