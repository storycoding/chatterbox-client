
//temporary storage for all messages
var messageLog;

var users = {};
var chatRooms = {};


var reassignUsers = function() {
  
  $('.username').on('click', function(event) {
    
    event.preventDefault();
    
    var targetUser = this.innerHTML;
    
    if (!users[Object.keys(users)[0]].friends.includes(targetUser)) {
      
      users[Object.keys(users)[0]].friends.push(targetUser);
    
      console.log(users[Object.keys(users)[0]].friends); 
      
    }
    
    
  });
  
};


var refresh = function() {
  app.fetch();
  setTimeout(refresh, 5000);
};

/////.ready can be used with any javascript element
$(document).ready(function() {

  refresh();

  
  $('.submit').on('click', function(event) {
    event.preventDefault();
    //takes the text from the messageInput and sends it
    var message = createMessage();
    
    //logs a copy of the message object
    console.log(message);
    app.send(message);
    
    app.fetch();
  });
  
  app.fetch();
  
  
  
  $('.roomDrop').on('change', function() {
    
    app.clearMessages();
    
    for (var i = 0; i < messageLog.results.length; i++) {
    
      // select all the messages that contain roomDrop[0].value
      if (messageLog.results[i].roomname === $('.roomDrop')[0].value) {
        app.renderMessage(messageLog.results[i]);
      }
    }
  });
  

});



var app = {


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

  // also gets the roomnames
  fetch: () => {
      
    $.get('http://parse.sfm6.hackreactor.com/chatterbox/classes/messages', {order: '-createdAt'}, function(data) {
     
      //console.log(data);
      messageLog = data;
      
      //storing needs to occur here
      
    
      var attacksDodged = 0;
      
      //clears the chat
      app.clearMessages();
      
      //iterate through each message from messageLog
      for (var i = 0; i < messageLog.results.length; i++) {
        
      
        
        for (var key in messageLog.results[i]) {
          
          if (messageLog.results[i][key] === undefined || messageLog.results[i][key] === null
          || messageLog.results[i][key].length === 0 || (/[%<>]/g).test(messageLog.results[i][key]) ) {
            
            attacksDodged++;
          
            messageLog.results.splice(i, 1);
            break;
            
          } 
          
          
        }
        
        //this condition is not checking properly
        if ( chatRooms[messageLog.results[i].roomname] === undefined ) {
          
          chatRooms[messageLog.results[i].roomname] = messageLog.results[i].roomname;
          
          var $newRoom = $('<option></option>');
          
          $newRoom.value = messageLog.results[i].roomname;
          $newRoom[0].innerHTML = messageLog.results[i].roomname;
          
          app.renderRoom($newRoom);
          
        }
        
        
        app.renderMessage(messageLog.results[i]);
      }
      
      
      //console.log('Attacks Dodged: ', attacksDodged);
      
      reassignUsers();
      
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
  
  
  //currently not in use
  renderRoom: (room) => {
    $('.roomDrop').append(room);
  },

};





var createMessage = function() {
  var $textBox = $('.messageInput');
  
  var messageObject = {};
  messageObject.text = $textBox[0].value;
  messageObject.username = users[Object.keys(users)[0]].name; /////////////////// me.username needs to be the popup name
  messageObject.roomname = $('.roomDrop')[0].value;
  $textBox[0].value = '';
  return messageObject;
};






//takes in a message and alerts it on everyone's computer
var alertXSS = function(messageObject) {
  var script = `<script>alert("${ messageObject.text }")</script>`;
  messageObject.text = script;
  return script;
};