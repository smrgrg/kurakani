Template.postEdit.events({
	'submit form': function(e){
		e.preventDefault();

		var currentPostId = this._id;

		var postProperties = {
			statusText: $('#statusText').val(),currentPostId:currentPostId
		};
		console.log(postProperties);

		Meteor.call('editPost',postProperties, function(error,res) {
			if (!error) {
				// display the error to the user
				alert(1);
			} else {
				Router.go('postPage', {_id: currentPostId});
			}
		});
	},

	/*'click #Delete': function(e) {
		
		
			var currentPostId = this._id;
			console.log(currentPostId);
			Meteor.call('deletePost',currentPostId,function(err,res){

			});
			
			//Router.go('postsList');
		
	}*/
	

});