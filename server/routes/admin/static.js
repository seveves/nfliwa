function staticRouter() {
  let router = require('express').Router();
  let Static = require('../../models/static');

  // get all static
  router.get('/static', ensureAuthenticated, (req, res, next) => {
    Static.find((err, staticPages) => {
      if (err) {
        return next(err);
      }
      res.render('static', { user: req.user, staticPages, pageTitle: 'Static Pages' });
    });
  });

  // create a new Static Page - view
  router.get('/static/create', ensureAuthenticated, (req, res) => {
    res.render('static-create', { user: req.user, pageTitle: 'New Static Page' });
  });

  // create a new Static Page - form post
  router.post('/static', ensureAuthenticated, (req, res, next) => {
    if(!validateCreateForm(req, res)) return;
    saveStatic(req, res);
  });

  // get a Static Page by its id
  router.get('/static/:id', ensureAuthenticated, (req, res, next) => {
    Static.findById(req.params.id, (err, staticPage) => {
      if (err) return next(err);
      res.render('static-edit', { user: req.user, staticPage, pageTitle: 'Edit Static Page' });
    });
  });

  // delete a Static Page by its id
  router.delete('/static/:id', ensureAuthenticated, (req, res, next) => {
    Static.findById(req.params.id, (err, staticPage) => {
      if (err) return next(err);
      staticPage.remove(error => {
        if (error) return next(error);
        res.json(staticPage);
      });
    });
  });

  // update a Static Page by its id
  router.post('/static/:id', ensureAuthenticated, (req, res, next) => {
    Static.findById(req.params.id, (err, staticPage) => {
      if (err) return next(err);
      if(!validateUpdateForm(req, res, staticPage)) return;      
      updateStatic(req, res, staticPage);
    });
  });

  function updateStatic(req, res, staticPage) {
    staticPage.title = req.body.title;
    staticPage.url = makeUrl(staticPage.title),
    staticPage.body = req.body.body;
    staticPage.pageIndex = +req.body.pageIndex;

    staticPage.save(err => {
      if (err) return next(err);
      res.redirect('/admin/static?t=updated');
    });
  }

  function saveStatic(req, res) {
    let staticPage = new Static({
      title: req.body.title,
      body: req.body.body,
      url: makeUrl(req.body.title),
      pageIndex: +req.body.pageIndex,
    });

    staticPage.save(err => {
      if (err) return next(err);
      res.redirect('/admin/static?t=created');
    });
  }

  function validateUpdateForm(req, res, staticPage) {
    let alerts = [];
    let title = req.body.title;
    let body = req.body.body;
    let pageIndex = tryParseInt(req.body.pageIndex, null);

    if (isEmpty(title) || isBlank(title)) {
      alerts.push('Title cannot be empty or contain only whitespaces.');
    }

    if (pageIndex === null) {
      alerts.push('PageIndex must be a numeric value.');
    }

    if (isEmpty(body) || isBlank(body)) {
      alerts.push('Please add some text to the body of this static page.');
    }

    if (alerts.length !== 0) {
      staticPage.title = title;
      staticPage.body = body;
      staticPage.pageIndex = pageIndex;
      res.render('static-edit', {
        user: req.user,
        staticPage,
        pageTitle: 'Edit Static Page',
        alerts });

      return false;
    }

    return true;   
  }

  function validateCreateForm(req, res) {
    let alerts = [];
    let title = req.body.title;
    let body = req.body.body;
    let pageIndex = tryParseInt(req.body.pageIndex, null);

    if (isEmpty(title) || isBlank(title)) {
      alerts.push('Title cannot be empty or contain only whitespaces.');
    }

    if (pageIndex === null) {
      alerts.push('PageIndex must be a numeric value.');
    }

    if (isEmpty(body) || isBlank(body)) {
      alerts.push('Please add some text to the body of this Static.');
    }

    if (alerts.length !== 0) {
      res.render('static-create', {
        user: req.user,
        pageTitle: 'New Static Page',
        staticPage: { title, body, pageIndex },
        alerts });

      return false;
    }

    return true; 
  }

  function makeUrl(title) {
    return title.toLowerCase()
      .replace(/ä/g, 'ae')
      .replace(/ö/g, 'oe')
      .replace(/ü/g, 'ue')
      .replace(/[^a-z0-9]/gi, '-');
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

  function tryParseInt(str, defaultValue) {
    let retValue = defaultValue;
    if(str !== null) {
      if(str.length > 0) {
        if (!isNaN(str)) {
          retValue = parseInt(str);
        }
      }
    }
    return retValue;
  }

  return router;
}

module.exports = staticRouter;