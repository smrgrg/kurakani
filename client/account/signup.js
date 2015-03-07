Template.signup.events({
	'submit #signupForm' : function(e, template){
		e.preventDefault();
		var user={
			profile:{username: template.find('#userName').value,avatar:null},
			email: template.find('#userEmail').value,
			password: template.find('#userPassword').value
			

		};

		Accounts.createUser(user, function(error, result){
			if(error){
				$('#signupError').text(error.reason);
			}else{
				Router.go('/');
			}

		});
	}
});