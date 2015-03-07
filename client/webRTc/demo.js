Template.demosameer.rendered=function(){

 /*function hasGetUserMedia() {
  return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

if (hasGetUserMedia()) {
  alert('good');
  // Good to go!
} else {
  alert('getUserMedia() is not supported in your browser');
}*/

/*var errorCallback = function(e) {
    console.log('Reeeejected!', e);
  };


  // Not showing vendor prefixes.
  navigator.getUserMedia({video: true, audio: true}, function(localMediaStream) {
    var video = document.querySelector('video');
    video.src = window.URL.createObjectURL(localMediaStream);

    // Note: onloadedmetadata doesn't fire in Chrome when using it with getUserMedia.
    // See crbug.com/110938.
    video.onloadedmetadata = function(e) {
      // Ready to go. Do some stuff.
    };
  }, errorCallback);*/
var connection = new RTCMultiConnection();
connection.maxParticipantsAllowed = 1; // initiator + 2 participants == 3

// easiest way to customize what you need!
connection.session = {
    audio: true,
    video: true
};

// on getting local or remote media stream
connection.onstream = function(e) {
    document.body.appendChild(e.mediaElement);
};

// setup signaling channel
connection.connect();

// open new session
document.querySelector('#openNewSessionButton').onclick = function() {
    connection.open();
};

$('.navbar').hide();

}
Template.onlineUsers.events({
  'click #personal-user #Video': function(eve,tmpl){

    //console.log(this._id);
    //Session.set('clicked',this._id); 
    var a = Math.random().toString(36).substring(7);

    var id = {peerid:a,caller:Meteor.userId(),callee:this._id};

    Meteor.call('insertPeerId', id, function(err, res){
      if(!err){
        window.open('/demosameer/'+a, 'newwindow', 'width=800, height=600');
      }
    });
    //console.log(a);
    
  }
});

Template.demosameer.events({
  'click #openNewSessionButton':function(){
  var url = location.href;
  var x = Session.get('clicked');
   var alertmechanism={
    caller:Meteor.userId(),
    callername:Meteor.user().username,
    callee:x,
    url: url,
    flag:0,
    status:false
   }
   Meteor.call('insertalert',alertmechanism,function(err,res){
     //console.log(res);
    if(!err){
     
    }
   });
    
  }
});



