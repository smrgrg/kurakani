Template.loggedIn.helpers({
	'counter':function(){
		var caller = Meteor.userId();
		var callee = Session.get('clicked');
		Meteor.subscribe('getNotification',caller);
		var count = Alertmechanism.find({callee:Meteor.userId(),flag:0}).count();
		  return count;
	},
	'notification': function(){
		var caller = Meteor.userId();
		var callee = Session.get('clicked');
		Meteor.subscribe('getNotification',caller);
		var noti = Alertmechanism.find({callee:Meteor.userId(),status:false}).fetch();
		$.each(noti,function(index,obj){
			if(obj.flag == 0)
				Session.set('adderId',obj.caller);
		});
		return noti;
	},
		'messagecounter':function(){
		var sender = Meteor.userId();
		var receiver = Session.get('getmessage');
		Meteor.subscribe('getMesssageNotification',sender);
		var count = Messagealert.find({receiver:Meteor.userId(),flag:0}).count();
		  return count;
	},
	'messagenotification': function(){
		var sender = Meteor.userId();
		var receiver = Session.get('getmessage');
		Meteor.subscribe('getMesssageNotification',sender);
		var noti = Messagealert.find({receiver:Meteor.userId(),status:false}).fetch();
		$.each(noti,function(index,obj){
			if(obj.flag == 0)
				Session.set('senderId',obj.sender);
		});
		console.log(noti);
		return noti;
	}

});

Template.loggedIn.events({
	'click #counter':function(e,t){
		Meteor.call('decreasecount',Session.get('adderId'),function(err,res){
			if(err){
				err.reason;
			}
		});
	},


	'click #messagecounter':function(e,t){
		Meteor.call('decreasemessagecount',Session.get('senderId'),function(err,res){
			if(err){
				err.reason;
			}
		});
	},
	'click #accept':function(e,t){
		Meteor.call('decreasenotificaton',Session.get('adderId'),function(err,res){
			if(err){
				err.reason;
			}
		});
	},

	'click #messageaccept':function(e,t){
		Meteor.call('decreasemessagenotificaton',Session.get('senderId'),function(err,res){
			if(err){
				err.reason;
			}
		});
	},
	'click #reject':function(e,t){

		Meteor.call('deletenotification',Session.get('adderId'),function(err,res){

		});
	}

	,
	'click #messagereject':function(e,t){

		Meteor.call('deletemessagenotification',Session.get('senderId'),function(err,res){

		});
	}
});