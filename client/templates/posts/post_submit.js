Template.postSubmit.events({
	'submit form': function(e){
		e.preventDefault();

		var post={
			statusText: $(e.target).find('[name=statusText]').val()
		};

		Meteor.call('postInsert', post, function(error, result){
			// display the error to the user and abort
			if(!error){
				$('form')[0].reset();
			}
		});

		//post._id = Posts.insert(post);
	}
})