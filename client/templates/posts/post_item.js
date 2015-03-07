
/*$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip({
        placement : 'bottom'
    });
});*/
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});
Template.postItem.helpers({
	ownPost: function() {
		return this.userId === Meteor.userId();
	},
	editing:function(){
			if(Session.get('isEditing').postId==this._id)
			{
				return Session.get('isEditing');
			}
			
			else{
				return null;
			}
		}
		
	
});
Template.postItem.events({
	'click #Delete': function(e) {
		
		
			var currentPostId = this._id;
			console.log(currentPostId);
			Meteor.call('deletePost',currentPostId,function(err,res){
				if(!err){
					$('media-body').remove();
				}
			});
			
			//Router.go('postsList');
		
	},
	'click #editPost':function(e,t){
		e.preventDefault();
		Session.set('isEditing',{postId:this._id,status:true});

	},
	'click #EditPost' :function(e,t){
		e.preventDefault();
		var currentPostId = this._id;

		var postProperties = {
			statusText: $('#editPosts').val(),currentPostId:currentPostId
		};
		console.log(postProperties);

		Meteor.call('editPost',postProperties, function(error,res) {
			if (!error) {
				// display the error to the user
				//$('#editform').hide();
				//delete Session.keys['isEditing'];
				Session.set('isEditing',null);
			} 
		});
		
	},
	'click #like':function(e,t){
		
		e.preventDefault();
		/*x=this.liker;
		$('#like').hide();
			$('#unlike').show();*/
		var currentPostId=this._id;
		/*var likes={
			id:this._id,
			from:Meteor.user().username,

		};
		x.push(likes);*/
		Meteor.call('insertLike',this._id,function(error,res){

			if(!err){
				alert(1);
			

		}
			
		});
	},
	'click #unlike':function(e,t){

		 //users.splice(users.indexOf(this.toString()),1);
		//e.preventDefault();
		$('#like').show();
			$('#unlike').hide();
		
		//console.log(like.toString());
		/*like.splice(like.indexOf(like.toString()),1);
		console.log(like.length);
		var a=like.length;*/
		id=this._id;
		console.log(id);
		Meteor.call('decreaseLike',id,like,function(err,res){
		if(!err){
			
			}
	
		});
	}
});

