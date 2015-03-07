Template.onlineUsers.helpers({
	'online': function(){

		Meteor.subscribe('user', Meteor.userId());
		//alert(1);
		var names = Meteor.users.find({ "status.online": true, _id:{$ne:Meteor.userId()}});
		console.log(names);
		return names;
		
		
	}


});




Template.dashboard.rendered = function(){
	Deps.autorun(function(){
		Meteor.subscribe("posts", Meteor.userId());
		Meteor.subscribe("likes");
	})
};

Template.dashboard.posts = function(){
	return Posts.find({},{sort: {date:-1}});
};

Template.home.events({
	'keyup .posttext': function(eve,tmpl){
		if(eve.which===13){
			var posttext = tmpl.find('.posttext').value;
			var options = {text:posttext, parent:null};
			Meteor.call('addPost',options);
			$('.posttext').val("").select().focus();  
		}
	}
});

// Template.onlineUsers.helpers({
// 	'online': function(){

// 		return Presences.find({ state: { currentRoomId: Session.get('currentRoomId') }});

		//Meteor.publish('user', Meteor.userId());
		
		// return Meteor.users.find();
		
		
// 	}
// });

Template.chatRooms.events({
	'click #Science': function(){
		window.open('/science','newwindow');
		var name = {name: Meteor.user().profile.username, newUser:true};

		Meteor.call('insertScienceChats',name,function(err,res){
		 	if(!err)
		 		$('.chat_window').scrollTo(10000000000);
		});
	},
	'click #Politics': function(){
		window.open('/politics','newwindow');
		var name = {name: Meteor.user().profile.username, newUser:true};

		Meteor.call('insertPoliticsChats',name,function(err,res){
		 		
		});
	},
	'click #Love': function(){
		window.open('/love','newwindow');
		var name = {name: Meteor.user().profile.username, newUser:true};

		Meteor.call('insertLoveChats',name,function(err,res){
		 		
		});
	}
});


