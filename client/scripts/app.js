// YOUR CODE HERE:

$(document).ready(function() {
  

  var assignButtons = () => {

    $('.username').on('click', function() {
      var targetUser = this.innerHTML; // "nuno"
      console.log(targetUser);

      targetUser = app.users[targetUser];
      me.friends.push(targetUser);
      targetUser.friends.push(me);
      
      console.log(targetUser);
    });  

  };



  assignButtons();

});

var stuff;

var message = {
  username: 'Mel Brooks',
  text: 'It\'s good to be the king',
  roomname: 'lobby' // can also pass my prank here
};



var trollMaker = function(messageObject) {

  var script = `<script>alert("${ messageObject.text }")</script>`;

  messageObject.text = script;

  return script;
};

/*
message.text = `<script>alert("${message.text}")</script>`
*/

var app = {

  users: {

    nuno: {
      friends: []
    },

    james: {
      friends: []
    }
  },

  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',

  init: () => {

  },

  send: (message) => {

    $.ajax({
      url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },

  fetch: () => {
    $.get('http://parse.sfm6.hackreactor.com/chatterbox/classes/messages', function(data) {
      //var parsedData = JSON.parse(data);
      //console.dir(parsedData);
      console.log(data);
      stuff = data;
      alert('message loaded successfully');
    });
    
  },

  clearMessages: () => {
    $('#chats').empty();
  },

  renderMessage: (message) => {
    //var userText = message.text;
    var $userMessage = $('<div class="messageBox"><div>');
    
    var $userClass = $('<span class="username"><span>');
    $userClass.text(message.username);

    console.log($userClass.text);
    
    //userMessage.text(userText);


    $('#chats').append(userMessage);
  },

  renderRoom: () => {
    var userRoom = message.roomname;
    var room = $('<div><div>');
    room.text(userRoom);

    $('#roomSelect').append(room);
  },


};

var me = app.users.james;


var logAll = function () {
  for(var i = 0; i < stuff.results.length-1; i++) {
    console.log(stuff.results[i].text);
  } 
}

/* 

app.send("$(‘body’).append('This is ground patrol to major Tom, can you hear me major Tom')")







*/



/*

$.ajax({
  // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      data: JSON.stringify(message), // message, test is asking for message to be object
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });

*/