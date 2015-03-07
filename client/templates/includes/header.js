Template.onlineUsers.helpers({
	'notification': function(){
		var caller = Meteor.userId();
		var callee = Session.get('clicked');
		Meteor.subscribe('getNotification',caller);
		var thape = Alertmechanism.find({callee:Meteor.userId()});
		return thape;
	}
});
