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
    
    $('.submit').on('click', function() {
   
      var message = createMessage();
      console.log(message);
      //app.send(message);
    
    });  

  };


  assignButtons();

});

var messageLog;

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
      
    $.get('http://parse.sfm6.hackreactor.com/chatterbox/classes/messages', {order: '-createdAt'}, function(data) {
      //var parsedData = JSON.parse(data);
      //console.dir(parsedData);
      console.log(data);
      messageLog = data;
      
      var messageObjectArray = messageLog.results;
      
      
      var attacksDodged = 0;
      //iterate through each message from messageLog
      for (var i = messageObjectArray.length - 1; i >= 0; i--) {
        
        if (messageObjectArray[i] === undefined) {
          continue;
        }
        
        
        if (messageObjectArray[i].text === undefined) {
          continue;
        }
        //if (messageObjectArray[i].text.charAt(0) === '<') { // starts with script
        if ((/[-%[\]{}<>()*+?.,\\^$|#\s]/g).test(messageObjectArray[i].text)) {
          attacksDodged++;
          delete messageObjectArray[i];
          continue;
        }
            
        if (messageObjectArray[i].username === undefined) {
          continue;
        }
        //if (messageObjectArray[i].username.charAt(0) === '<') { // starts with script
        if ((/[-%[\]{}<>()*+?.,\\^$|#\s]/g).test(messageObjectArray[i].username)) {
          attacksDodged++;
          delete messageObjectArray[i];
        }
        app.renderMessage(messageObjectArray[i]);
      }
      
      
      console.log('Attacks Dodged: ', attacksDodged);
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

    var $colon = $('<span>: <span>');
    
    var $userMessageText = $('<span class="messageText"></span>');
    $userMessageText.text(message.text);
  
    // append username, colon, and message to .messageBox div
    $userMessage.append($userClass);
    $userMessage.append($colon);
    $userMessage.append($userMessageText);
    
    // append .messageBox div to #chats div
    $('#chats').append($userMessage);
  },

  renderRoom: () => {
    var userRoom = message.roomname;
    var room = $('<div><div>');
    room.text(userRoom);

    $('#roomSelect').append(room);
  },



  refresh: () => {
    //fetch() // defines messageLog
    
    app.fetch(); // establish a promise //fetched results might not be ready yet
    
    //more recent ones first / twitter style
    
    var messageObjectArray = messageLog.results;
    
    //iterate through each message from messageLog
    for (var i = messageObjectArray.length - 1; i >= 0; i--) {
      app.renderMessage(messageObjectArray[i]);
    }

  }

};

sendMessage: () => {
  
  
};

var createMessage = function() {
  var $textBox = $('.messageInput');
  
  var messageObject = {};
  messageObject.text = $textBox[0].value;
  messageObject.username = me.username; /////////////////// me.username needs to be the popup name
  messageObject.roomname = 'lobby'; /////////////////// update when rooms get created

  return messageObject;
};

// create a function that:
  //transform input from textbox into a message object
    //message.text = inputText
    //message.username = our username
    //message.roomname = current room // work on this

// when the send button is pushed
// make an AJAX send request

//WIP
var me = app.users.james;


var logAll = function () {
  for (var i = 0; i < stuff.results.length - 1; i++) {
    console.log(stuff.results[i].text);
  } 
};

/*
message.text = `<script>alert("${message.text}")</script>`
*/

//app.send("$(‘body’).append('This is ground patrol to major Tom, can you hear me major Tom')")
