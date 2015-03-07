Template.login.events({
	'submit #loginForm': function(events, template){
		events.preventDefault();
		email = template.find('#userEmail').value,
		password = template.find('#userPassword').value;

		Meteor.loginWithPassword(email, password, function(error, result){
			if(!error){
				Router.go('/');
			}else{
				$('#logError').text(error.reason);
			}
		});
	}
});