function deleteTempFiles() {
  var url = "/admin/tempfiles";

  $.ajax({ 
    type: "DELETE", 
    url: url,
    complete: function() {
      setTimeout(function() {
        location.reload();
      }, 1000);
    }
  });
}

function deletePost(id) {
  var url = "/admin/posts/" + id;

  $.ajax({ 
    beforeSend: function (request) {
      return confirm('Delete?');
    },

    type: "DELETE", 
    url: url,
    complete: function() {
      location.reload();
    }
  });
}

function deleteStatic(id) {
  var url = "/admin/static/" + id;

  $.ajax({ 
    beforeSend: function (request) {
      return confirm('Delete?');
    },

    type: "DELETE", 
    url: url,
    complete: function() {
      location.reload();
    }
  });
}

function deleteEvent(id) {
  var url = "/admin/events/" + id;

  $.ajax({ 
    beforeSend: function (request) {
      return confirm('Delete?');
    },

    type: "DELETE", 
    url: url,
    complete: function() {
      location.reload();
    }
  });
}

window.onload = function() {
  var title = $('#title').val();  
  var body = $('#body').val();

  if(isEmpty(title) || isBlank(title)) {
    $('#title').addClass('warning');
  }

  if(isEmpty(body) || isBlank(body)) {
    $('#body').addClass('warning');
  }

  $('#title').blur(function() {
    var title = $(this).val();
    if(isEmpty(title) || isBlank(title)) {
      $(this).addClass('warning');
    }
  });

  $("#title").on('input', function() {
    var title = $(this).val();
    if (!isEmpty(title) && !isBlank(title)) {
      $(this).removeClass('warning');
    }    
  });

  $('#body').blur(function() {
    var body = $(this).val();    
    if(isEmpty(body) || isBlank(body)) {
      $(this).addClass('warning');
    }
  });

  $("#body").on('input', function() {
    var body = $(this).val();    
    if(!isEmpty(body) && !isBlank(body)) {
      $(this).removeClass('warning');
    }
  });

  var socket = io.connect('/posts');
  socket.on('update', function (data) {
    var overlay = document.getElementById('overlay-progress');
    var messages = document.getElementsByClassName('overlay-content')[0];
    var p = document.createElement('p');
    var message = '';

    switch (data.task) {
      case 'start':
        overlay.style.width = '100%';
        message = 'Processing "' + data.image + '" ...';
        break;
      case 'resizeImage':
        message = 'Resizing "' + data.image + '" ...';
        break;
      case 'getBase64':
        message = 'Calculating base64 of "' + data.image + '" ...';
        break;
      case 'uploadImage':
        message = 'Uploading "' + data.image + '" ...';
        break;
      case 'removeTempFiles':
        message = 'Cleaning "' + data.image + '" ...';
        break;
    }

    p.appendChild(document.createTextNode(message));
    messages.insertBefore(p, messages.firstChild);
  });
}

function isEmpty(str) {
  return (!str || 0 === str.length);
}

function isBlank(str) {
  return (!str || /^\s*$/.test(str));
}
