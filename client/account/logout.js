Template.loggedIn.events({
	'click #logout':function(e, template){
		e.preventDefault();
		Meteor.logout(function(error, result){
			if(!error){
				Router.go('/');
			}
		})
	}
});