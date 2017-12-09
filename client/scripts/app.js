// YOUR CODE HERE:
var message = {
  username: 'Mel Brooks',
  text: 'It\'s good to be the king',
  roomname: 'lobby'
};

var trollMaker = function(messageObject) {

  var script = `<script>alert("${`;

    script += messageObject.text;

    script += `}")</script>`;

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
    $.get('http://parse.sfm6.hackreactor.com/chatterbox/classes/messages');
  },

  clearMessages: () => {
    $('#chats').empty();
  },

  renderMessage: () => {
    var userText = message.text;
    var userMessage = $('<div><div>');
    userMessage.text(userText);


    $('#chats').append(userMessage);
  },

  renderRoom: () => {
    var userRoom = message.roomname;
    var room = $('<div><div>');
    room.text(userRoom);

    $('#roomSelect').append(room);
  },


};


var me = users.james;

  $('.username').on('click',function(){
    var targetUser = $('.username').innerHTML; //"nuno"
    me.friends.push(targetUser);
    targetUser.friends.push(me);
  });



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