function eventsRouter() {
  let moment = require('moment');
  let router = require('express').Router();
  let Event = require('../../models/event');

  // get all events
  router.get('/events', ensureAuthenticated, (req, res, next) => {
    Event.find((err, events) => {
      if (err) {
        return next(err);
      }
      res.render('events', { user: req.user, events: events, pageTitle: 'Events' });
    });
  });

  // create a new event - view
  router.get('/events/create', ensureAuthenticated, (req, res) => {
    res.render('event-create', { user: req.user, pageTitle: 'New Event' });
  });

  // create a new event - form post
  router.post('/events', ensureAuthenticated, (req, res, next) => {
    if(!validateCreateForm(req, res)) return;
    saveEvent(req, res);
  });

  // get an event by its id
  router.get('/events/:id', ensureAuthenticated, (req, res, next) => {
    Event.findById(req.params.id, (err, event) => {
      if (err) return next(err);

      // prepare event date for date-localetime input field
      event.eventDateString = moment(event.eventDate).utc().format("YYYY-MM-DDTHH:mm");
      res.render('event-edit', { user: req.user, event: event, pageTitle: 'Event Edit' });
    });
  });

  // delete an event by its id
  router.delete('/events/:id', ensureAuthenticated, (req, res, next) => {
    Event.findById(req.params.id, (err, event) => {
      if (err) return next(err);

      event.remove(error => {
        if (error) return next(error);

        res.json(event);
      });
    });
  });

  // update an event by its id
  router.post('/events/:id', ensureAuthenticated, (req, res, next) => {
    
    Event.findById(req.params.id, (err, event) => {
      if (err) return next(err);
      if(!validateUpdateForm(req, res, event)) return;      

      updateEvent(req, res, event);
    });
  });

  function updateEvent(req, res, event) {
    event.title = req.body.title;
    event.body = req.body.body;
    event.location = req.body.location;
    event.lat = req.body.lat;
    event.long = req.body.long;
    event.eventDate = new Date(req.body.eventDate);

    event.save(err => {
      if (err) return next(err);

      res.redirect('/admin/events?t=updated');
    });
  }

  function saveEvent(req, res) {
    let event = new Event({
      title: req.body.title,
      body: req.body.body,
      location: req.body.location,
      lat: req.body.lat,
      long: req.body.long,
      eventDate: new Date(req.body.eventDate)
    });

    event.save(err => {
      if (err) return next(err);

      res.redirect('/admin/events?t=created');
    });
  }

  function validateUpdateForm(req, res, event) {
    let alerts = [];
    let title = req.body.title;
    let body = req.body.body;
    let lat = req.body.lat;
    let long = req.body.long;
    let location = req.body.location;
    let eventDate = req.body.eventDate;

    if (isEmpty(title) || isBlank(title)) {
      alerts.push('Title cannot be empty or contain only whitespaces.');
    }

    if (isEmpty(lat) || isBlank(lat)) {
      alerts.push('Latitude cannot be empty or contain only whitespaces.');
    }

    if (isEmpty(long) || isBlank(long)) {
      alerts.push('Longitude cannot be empty or contain only whitespaces.');
    }

    if (isEmpty(location) || isBlank(location)) {
      alerts.push('Please set the location of this event');
    }

    if (!moment(eventDate,'YYYY-MM-DDTHH:mm').isValid()) {
      alerts.push('Please enter a date in this format: YYYY-MM-DDTHH:mm');
    }

    if (isEmpty(eventDate) || isBlank(eventDate)) {
      alerts.push('Please set the date of this event');
    }

    if (isEmpty(body) || isBlank(body)) {
      alerts.push('Please add some text to the body of this event.');
    }

    if (alerts.length !== 0) {
      event.title = title;
      event.body = body;
      event.location = location;
      event.eventDateString = eventDate;
      res.render('event-edit', {
        user: req.user,
        event: event,
        pageTitle: 'Event Edit',
        alerts: alerts });

      return false;
    }

    return true;   
  }

  function validateCreateForm(req, res) {
    let alerts = [];
    let title = req.body.title;
    let body = req.body.body;
    let location = req.body.location;
    let lat = req.body.lat;
    let long = req.body.long;
    let eventDateString = req.body.eventDate;

    if (isEmpty(title) || isBlank(title)) {
      alerts.push('Title cannot be empty or contain only whitespaces.');
    }

    if (isEmpty(lat) || isBlank(lat)) {
      alerts.push('Latitude cannot be empty or contain only whitespaces.');
    }

    if (isEmpty(long) || isBlank(long)) {
      alerts.push('Longitude cannot be empty or contain only whitespaces.');
    }

    if (isEmpty(location) || isBlank(location)) {
      alerts.push('Please set the location of this event');
    }

    if (isEmpty(eventDateString) || isBlank(eventDateString)) {
      alerts.push('Please set the date of this event');
    }

    if (isEmpty(body) || isBlank(body)) {
      alerts.push('Please add some text to the body of this event.');
    }

    if (alerts.length !== 0) {
      res.render('event-create', {
        user: req.user,
        pageTitle: 'New Event',
        event: {
          title: title,
          body: body,
          location: location,
          eventDateString: eventDateString },
        alerts: alerts });

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

module.exports = eventsRouter;