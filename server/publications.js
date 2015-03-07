Meteor.publish('user', function(id){
	if(id && id!=null){
		return Meteor.users.find({ "status.online": true, _id:{$ne:id}});
	}
});

Meteor.publish('posts',function(userid){
	return Posts.find({});
});

Meteor.publish('getNames',function(id){
	return Posts.find({_id:id});
});

Meteor.publish('getPost',function(Uid){

    	return Posts.find({createdBy:Uid},{sort: {submitted: -1}});
   
});
Meteor.publish('getUserame',function(id){
    	return Posts.find({userId:id});
    });

/*Meteor.publish('likes',function(postid)){
	return Likes.find({post:postid});
};*/
Meteor.publish('getCalleeId',function(id){
		return Videochat.find({peerid:id});
	});

Meteor.publish('getNotification', function(caller){
	return Alertmechanism.find({callee:caller});
});

Meteor.publish('getmessages',function(receiver){
	return Privatemessages.find({priRoomId:receiver});
});

Meteor.publish('getMesssageNotification', function(sender){
	return Messagealert.find({receiver:sender});
});

Meteor.publish('getChats',function(id){
	if(id && id!==null)
		return Chat.find({privateRoom:id});
});

Meteor.publish('getScienceChats',function(id){
	if(id && id!==null)
		return Science.find();
});

Meteor.publish('getPoliticsChats',function(id){
	if(id && id!==null)
		return Politics.find();
});

Meteor.publish('getLoveChats',function(id){
	if(id && id!==null)
		return Love.find();
});



// Meteor.publish('userPresence', function() {
  // Setup some filter to find the users your user
  // cares about. It's unlikely that you want to publish the 
  // presences of _all_ the users in the system.

  // If for example we wanted to publish only logged in users we could apply:
  // filter = { userId: { $exists: true }};
//   var filter = {userId: { $exists: true }}; 

//   return Presences.find(filter, { fields: { state: true, userId: true }});
// });